import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";
import generateTutorToken from "../utils/generateTutorToken.js";
import sendresetmail from "../utils/nodeMailer.js";
import jwt from "jsonwebtoken";
import Category from "../models/categoryModel.js";
import Course from "../models/courseModel.js";
import Quizzes from "../models/quizModel.js";
import QuestionBank from "../models/questionBankModel.js";
import Live from "../models/liveModel.js";
import mongoose from "mongoose";
import MarkList from "../models/markListModel.js";
import Assignments from "../models/assignmentModel.js";
// import Assignment from '../../frontend/src/containers/user/profile/Assignment.jsx';
const tutorAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const tutor = await Tutor.findOne({ email: email });

  if (tutor && (await tutor.matchPassword(password))) {
    if (!tutor.isBlocked) {
      const tutorToken = await generateTutorToken(res, tutor._id);
      res.status(201).json({
        tutorToken,
      });
    } else {
      res.status(400).json(`access denied`);
    }
  } else {
    res.status(400).json("Invalid email or password");
    // throw new Error('invalid username or password')
  }
});

const registerTutor = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const tutorExists = await Tutor.findOne({ email: email });
  if (tutorExists) {
    res.status(400).json("tutor already exists");
    // throw new Error('tutor already exists')
  }

  const tutor = await Tutor.create({
    userName: userName,
    email: email,
    password: password,
  });

  if (tutor) {
    const token = await generateTutorToken(res, tutor._id);

    res.status(201).json({
      token: token,
    });
  } else {
    res.status(400).json("invalid tutor data");

    throw new Error("invalid tutor data");
  }
});

const tutorDetails = asyncHandler(async (req, res) => {
  const token = req.query.token;
  try {
    const user = await jwt.verify(token, '1234');

    const isBlocked = await Tutor.findOne({ _id: user.tutorId }).select(
      "isBlocked"
    );

    if (isBlocked) {
      res.status(200).json({ isBlocked: true });
    } else {
      res.status(200).json({ isBlocked: false });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});

const logoutTutor = asyncHandler(async (req, res) => {
  res.cookie("tutorJwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Tutor Logged Out" });
});

const tutorForgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await Tutor.findOne({ email });
  const token1 = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiration = new Date(Date.now() + 1 * 120 * 1000);
  if (user) {
    user.otp = token1;
    user.otpExpiration = otpExpiration;
    await user.save();
    sendresetmail(user.userName, email, user.otp);

    res.status(200).json({ message: "its working" });
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

const tutorConfirmOtp = asyncHandler(async (req, res) => {
  const { state, otp } = req.body;

  const user = await Tutor.findOne({ email: state });
  if (user.otp == otp) {
    res.status(200).json("Successfull");
  } else {
    res.status(400).json("Incorrect otp");
  }
});

const tutorResetPassword = asyncHandler(async (req, res) => {
  const { state, password } = req.body;

  const user = await Tutor.findOne({ email: state });
  if (user) {
    user.password = password;
    await user.save();
    res.status(200).json("success");
  }
});

const tutorOtpLoginVerifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Tutor.findOne({ email });
  const token1 = Math.floor(100000 + Math.random() * 900000).toString();
  if (user) {
    user.otp = token1;
    await user.save();
    sendresetmail(user.userName, email, user.otp);
    res.status(200).json("succesfull");
  } else {
    res.status(400).json("Invalid Email");
  }
});

const tutorOtpLogin = asyncHandler(async (req, res) => {
  const { state, otp } = req.body;
  const user = await Tutor.findOne({ email: state });
  if (user.otp == otp) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(400).json("Incorrect Otp");
  }
});
const loadCourseData = asyncHandler(async (req, res) => {
  const tutorSpecifications = req.user.specification;
  // tutorSpecifications.push('ui designing')

  if (tutorSpecifications.length == 0) {
    res.status(400).json("update profile");
  } else {
    const category = await Category.aggregate([
      {
        $match: {
          subCategories: {
            $in: tutorSpecifications,
          },
        },
      },
      {
        $project: {
          categoryName: 1,
          active: 1,

          subCategories: {
            $filter: {
              input: "$subCategories",
              as: "subCategory",
              cond: {
                $in: ["$$subCategory", tutorSpecifications],
              },
            },
          },
        },
      },
    ]);

    res.status(200).json([...category]);
  }
  res.status(200).json("success");
});

const addCourse = asyncHandler(async (req, res) => {
  const { course, category, subCategory, description } = req.body;
  const imagePath = req.file.filename;

  const categoryDetails = await Category.findOne({ categoryName: category });

  const categoryId = categoryDetails._id;

  const tutorId = req.user._id;

  const createCourse = await Course.create({
    course: course,
    category: categoryId,
    tutor: tutorId,
    subCategory: subCategory,
    description: description,
    image: imagePath,
  });
  if (createCourse) {
    res.status(200).json("course successfully created");
  } else {
    res.status(400).json(`couldn't create course`);
  }
});

const loadCourses = asyncHandler(async (req, res) => {
  const tutorId = req.user._id;
  const myCourses = await Course.aggregate([
    { $match: { tutor: tutorId } },
    {
      $lookup: {
        from: "categories", // The name of the Category collection
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $unwind: "$categoryInfo", // Unwind the categoryInfo array
    },
    {
      $project: {
        _id: 1, // Include the Course _id if needed
        course: 1,
        subCategory: 1,
        videos: 1,
        description: 1,
        image: 1,
        "categoryInfo.categoryName": 1,
      },
    },
    {
      $group: {
        _id: "$_id", // Group by Course _id
        categoryName: { $first: "$categoryInfo.categoryName" }, // Group the categoryInfo back into an array
        course: { $first: "$course" },
        description: { $first: "$description" },
        subCategory: { $first: "$subCategory" },
        image: { $first: "$image" },
        videos: { $first: "$videos" },
      },
    },
  ]);

  if (myCourses.length > 0) {
    res.status(200).json(myCourses);
  } else {
    res.status(200).json("no course found");
  }
});

const editCourse = asyncHandler(async (req, res) => {
  const { id, course, description, image, deletedVideoUrls } = req.body;
  let imagePath = req?.file?.path;
  imagePath = imagePath ? imagePath : `backend\\public\\images\\${image}`;

  const updateCourse = await await Course.updateOne(
    { _id: id },
    {
      $set: {
        course: course,
        description: description,
        image: imagePath,
      },
      $pull: {
        videos: { videoUrl: { $in: deletedVideoUrls } },
      },
    }
  );
  if (updateCourse) {
    res.status(200).json("edited successfully");
  } else {
    res.status(500).json(`couldn't update`);
  }
});

const profileData = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const myProfile = await Tutor.findOne({ _id: userId });
  let subCategories = await Category.aggregate([
    {
      $project: {
        _id: 0,
        subCategories: 1,
      },
    },
    {
      $unwind: "$subCategories",
    },
    {
      $group: {
        _id: null,
        subCategories: { $addToSet: "$subCategories" },
      },
    },
    {
      $project: {
        _id: 0,
        subCategories: 1,
      },
    },
  ]);
  subCategories = subCategories[0]?.subCategories?.filter((subCategory) => {
    return !myProfile?.specification?.includes(subCategory);
  });

  if (myProfile) {
    res.status(200).json({ myProfile, subCategories });
  } else {
    res.status(500).json(`can't find`);
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { userName, city, state, country, skill, description, degree, image } =
    req.body;
  let imagePath = req?.file?.path;

  imagePath = imagePath ? imagePath : `backend\\public\\images\\${image}`;
  const updateTutor = await Tutor.updateOne(
    { _id: userId },
    {
      userName,
      address: { city: city, state, country },
      specification: skill,
      description,
      image: imagePath,
      degree,
    }
  );

  if (updateTutor) {
    res.status(200).json("updated");
  } else {
  }
});

const addVideo = asyncHandler(async (req, res) => {
  const { id, title, description } = req.body;
  const videoUrl = req.files[0].filename;

  console.log(videoUrl);

  const videoData = { title, description, videoUrl };
  const updateResult = await Course.updateOne(
    { _id: id },
    { $push: { videos: videoData } }
  );
  console.log(updateResult);
  if (updateResult) {
    res.status(200).json("video added");
  } else {
    res.status(500);
  }
});

const loadQuizDetails = asyncHandler(async (req, res) => {
  const quizzes = await Quizzes.find({});
  const subCategories = await Category.aggregate([
    {
      $unwind: "$subCategories",
    },
    { $group: { _id: null, allSubCategories: { $push: "$subCategories" } } },
    { $project: { _id: 0, allSubCategories: 1 } },
  ]);
  const questions = await QuestionBank.find({});

  res.status(200).json({ quizzes, subCategories, questions });
});

const loadQuestions = asyncHandler(async (req, res) => {
  const questions = await QuestionBank.find({});
  const subCategories = await Category.aggregate([
    {
      $unwind: "$subCategories",
    },
    { $group: { _id: null, allSubCategories: { $push: "$subCategories" } } },
    { $project: { _id: 0, allSubCategories: 1 } },
  ]);

  res.status(200).json({ subCategories, questions });
});

const addQuestion = asyncHandler(async (req, res) => {
  const { question, options, correctAnswer, selectedSubcategory } = req.body;

  const addQuestion = await QuestionBank.create({
    question: question,
    subCategory: selectedSubcategory,
    option1: options[0],
    option2: options[1],
    option3: options[2],
    option4: options[3],
    answer: correctAnswer,
  });

  if (addQuestion) {
    res.status(200).json("successfull");
  } else {
    res.status(500).json(`can't insert`);
  }
});

const updateQuestion = asyncHandler(async (req, res) => {
  const { question, options, correctAnswer, selectedSubcategory } = req.body;
  const { questionId } = req.params;
  const updateQuestion = await QuestionBank.updateOne(
    { _id: questionId },
    {
      question: question,
      subCategory: selectedSubcategory,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      answer: correctAnswer,
    }
  );

  if (updateQuestion) {
    res.status(200).json("success");
  } else {
    res.status(500).json(`can't update`);
  }
});

const addQuizzes = asyncHandler(async (req, res) => {
  const { quizName, selectedSubcategory, selectedQuestions } = req.body;
  const tutorId = req.user._id;
  const date = new Date();
  const lastDate = new Date(date);
  lastDate.setDate(date.getDate() + 7);
  const questions = selectedQuestions.map((questionId) => ({
    question: questionId,
  }));
  const time = questions.length;
  const addQuiz = await Quizzes.create({
    name: quizName,
    subCategory: selectedSubcategory,
    questions,
    time,
    lastDate,
    tutor: tutorId,
  });

  if (addQuiz) {
    res.status(200).json("successfull");
  } else {
    res.status(400).json("failed to create");
  }
});

const createLive = asyncHandler(async (req, res) => {
  const { startTime, endTime, subject, name, description, roomId } = req.body;
  const Id = req.user._id;
  const addLive = await Live.create({
    startingTime: startTime,
    endingTime: endTime,
    roomId,
    subCategory: subject,
    name,
    description,
    tutor: Id,
  });

  if (addLive) {
    res.status(200).json("successfully added");
  } else {
    res.status(400).json(`can't create live`);
  }
});

const tutorLiveDetails = asyncHandler(async (req, res) => {
  const { status } = req.params;
  const Id = req.user._id;
  const lives = await Live.find({ tutor: Id, status: status });
  const subCategories = await Tutor.find({ _id: Id }, { specification: 1 });
  if (lives) {
    res.status(200).json({ lives, subCategories });
  } else {
    res.status(400).json(`lives not found`);
  }
});

const deleteLive = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteLive = await Live.findByIdAndDelete(id);
  if (deleteLive) {
    res.status(200).json("delete successfull");
  } else {
    res.status(400).json(`can't delete`);
  }
});

const updateLiveStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;

  const updateStatus = await Live.updateOne({ _id: id }, { status: status });

  if (updateStatus) {
    res.status(200).json("successfull");
  } else {
    res.status(400);
  }
});

const deleteAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id,'id')
  const deleteAssignment = await Assignments.deleteOne({ _id: id });
  console.log(deleteAssignment, "deleteAssignment");
  if (deleteAssignment) {
    res.status(200).json("successfully deleted");
  } else {
    res.status(500).json(`can't delete`);
  }
});

const loadTutorDashboard = asyncHandler(async (req, res) => {
  const tutorId = req.user._id;

  const quizzes = await Quizzes.find({ tutor: tutorId });
  const quizCount = quizzes.length;
  const course = await Course.aggregate([
    { $match: { tutor: new mongoose.Types.ObjectId(tutorId) } },
    {
      $project: {
        _id: 1,
        videos: 1,
      },
    },
  ]);
  const videoCount = course.reduce((acc, course) => {
    if (course.videos) {
      return acc + course.videos.length;
    } else {
      return acc;
    }
  }, 0);

  const courseCount = course.length;
  const topUsers = await MarkList.aggregate([
    {
      $group: {
        _id: "$studentId",
        totalQuizzesSolved: { $sum: { $size: "$quiz" } },
      },
    },
    {
      $lookup: {
        from: "users", // Assuming your users collection is named "users"
        localField: "_id",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails", // Unwind to get a flat result
    },
    {
      $project: {
        _id: 1,
        totalQuizzesSolved: 1,
        firstName: "$userDetails.firstName",
      },
    },
    {
      $sort: { totalQuizzesSolved: -1 },
    },
    {
      $limit: 3,
    },
  ]);

  if (quizzes) {
    res.status(200).json({ quizCount, courseCount, videoCount, topUsers });
  }
});

const loadAssignment = asyncHandler(async (req, res) => {
  const { status } = req.params;
  let assignment = await Assignments.find({ status: status });
  const subjects = await Tutor.findOne({ _id: req.user._id }).select(
    "specification"
  );
  // console.log(assignment, "assignment");
  if (assignment) {
    res.status(200).json({ assignment, subjects });
  } else {
    res.status(400).json(`not found`);
  }
});

const addAssignment = asyncHandler(async (req, res) => {
  const { name, startDate, endDate, totalMark, constraints, subject } =req.body;
  // console.log('re',req.body)
  const tutorId=req.user._id
  const addAssignment = await Assignments.create({
    name: name,
    constraints,
    startingDate: startDate,
    endingDate: endDate,
    outOf: totalMark,
    tutorId:tutorId,
    subject: subject,
  }); 

  if (addAssignment) {
    res.status(200).json("successfully inserted");
  } else {
    res.status(400).json(`can't insert`);
  }
});

const loadAssignmentData= asyncHandler(async (req, res) => {

  const tutorId=req.user._id

  const assignments = await MarkList.aggregate([
    {
      $unwind: "$assignment"
    },
    {
      $lookup: {
        from: "assignments",
        localField: "assignment.assignmentId",
        foreignField: "_id",
        as: "assignmentDetails"
      }
    },
    {
      $unwind: "$assignmentDetails"
    },
    {
      $match: {
        "assignment.checked": false,
        "assignmentDetails.tutorId": new mongoose.Types.ObjectId(tutorId)
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "studentId",
        foreignField: "_id",
        as: "userDetails"
      }
    },
    {
      $unwind: "$userDetails"
    },
    {
      $match: {
        "assignment.checked": false
      }
    },
    {
      $group: {
        _id: "$studentId",
        assignments: {
          $push: {
            assignmentId: "$assignment.assignmentId",
            MarkScored: "$assignment.MarkScored",
            checked: "$assignment.checked",
            pdf: "$assignment.pdf",
            tutorId: "$assignmentDetails.tutorId",
            name:"$assignmentDetails.name",
            constraints:'$assignmentDetails.constraints',
            totalMark:'$assignmentDetails.outOf'
          }
        },
        studentFirstName: { $first: "$userDetails.firstName" }
      }
    }
  ]);
  
 
  res.status(200).json({ assignments });
  

  res.status(200).json({assignments})
  
})

const evalutedAssignment=asyncHandler(async (req, res) => {
  const {selectedStudent,selectedAssignment,mark}=req.body
  console.log('selectedAssignment',selectedAssignment,'selectedStudent',selectedStudent)
  const updateAssignment=await MarkList.findOneAndUpdate(
    {
      studentId: selectedStudent,
      'assignment.assignmentId': selectedAssignment
    },
    {
      $set: {
        'assignment.$.MarkScored': mark,
        'assignment.$.checked': true
      }
    },
    )

  //  console.log(updateAssignment)

    if(updateAssignment){
     
      res.status(200).json(`successfull`)
    }else{
      res.status(500).json(`failed`)
    }
})
export {
  tutorAuth,
  registerTutor,
  logoutTutor,
  tutorForgotPassword,
  tutorResetPassword,
  tutorConfirmOtp,
  tutorOtpLoginVerifyEmail,
  tutorOtpLogin,
  tutorDetails,
  loadCourseData,
  addCourse,
  loadCourses,
  editCourse,
  profileData,
  updateProfile,
  addVideo,
  loadQuizDetails,
  loadQuestions,
  addQuestion,
  updateQuestion,
  addQuizzes,
  createLive,
  tutorLiveDetails,
  deleteLive,
  updateLiveStatus,
  loadAssignment,
  addAssignment,
  deleteAssignment,
  loadTutorDashboard,
  loadAssignmentData,
  evalutedAssignment
};
