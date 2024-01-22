import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Tutor from "../models/tutorModel.js";
import Category from "../models/categoryModel.js";
import Course from "../models/courseModel.js";
import Plan from "../models/plansModel.js";

const loadUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  .populate({
    path: 'subscription.mode', // Update the path to include 'mode'
    model: 'Plan',
    select: 'subscriptionMode' // Assuming this is the field you want to populate in the 'mode' field
  })
  .select('email firstName secondName _id isBlocked subscription phone');



  if (users) {
    res.status(201).json({ users });
  }
});

const loadTutors = asyncHandler(async (req, res) => {
  const tutors = await Tutor.find(
    {},
    "email userName _id isBlocked specification"
  );
  if (tutors) {
    res.status(201).json({ tutors });
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { userId, isBlocked } = req.body;
  const user = await User.updateOne(
    { _id: userId },
    { $set: { isBlocked: isBlocked } }
  );
});

const blockTutor = asyncHandler(async (req, res) => {
  const { userId, isBlocked } = req.body;
  const user = await Tutor.updateOne(
    { _id: userId },
    { $set: { isBlocked: isBlocked } }
  );
});

const loadCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({});
  if (category) {
    res.status(200).json({ category });
  } else {
    res.status(400).json("no category found");
  }
});

const addCategory = asyncHandler(async (req, res) => {
  const { categoryName, subCategories } = req.body; // Assuming categoryName is sent as part of the form data
  const imagePath = req.file.filename;

  
  const checkIdentical = await Category.findOne({ categoryName: categoryName });
  if (!checkIdentical) {
    const category = await Category.create({
      categoryName: categoryName,
      subCategories: subCategories,
      image: imagePath,
    });
    if (!category) {
      res.status(400).json(`category can't be inserted`);
    } else {
      res.status(200).json("category added successfully");
    }
  } else {
    res.status(400).json("category already exist");
  }
});
const addCourse = asyncHandler(async (req, res) => {});

const validateCourse = asyncHandler(async (req, res) => {
  const { course } = req.body;

  if (matches) {
    res.status(200).json("category found");
  } else {
    res.status(200).json("not category found");
  }
});

const loadCourses = asyncHandler(async (req, res) => {
  // const courses=await Course.find({})
  const courses = await Course.aggregate([
    {
      $lookup: {
        from: "categories", // The name of the Category collection
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    { $unwind: "$categoryInfo" },
    {
      $lookup: {
        from: "tutors", // The name of the Category collection
        localField: "tutor",
        foreignField: "_id",
        as: "tutorInfo",
      },
    },
    { $unwind: "$tutorInfo" },
    {
      $project: {
        _id: 1,
        course: 1,
        subCategory: 1,
        videos: 1,
        isActive: 1,
        "categoryInfo.categoryName": 1,
        "tutorInfo.userName": 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        categoryName: { $first: "$categoryInfo.categoryName" }, // Group the categoryInfo back into an array
        course: { $first: "$course" },
        subCategory: { $first: "$subCategory" },
        videos: { $first: "$videos" },
        isActive: { $first: "$isActive" },
        tutor: { $first: "$tutorInfo.userName" },
      },
    },
  ]);

  if (courses) {
    res.status(200).json({ courses });
  } else {
    res.status(200).json("no course found");
  }
});

const blockCourse = asyncHandler(async (req, res) => {
  const { courseId, isActive } = req.body;
  const blockCourse = await Course.findOneAndUpdate(
    { _id: courseId },
    { isActive: isActive }
  );

  if (blockCourse) {
    res.status(200).json("successfull");
  } else {
    res.status(400).json(`can't update`);
  }
});

const editCategory = asyncHandler(async (req, res) => {
  const { _id, categoryName, subCategories, image } = req.body;
  let imagePath = req?.file?.filename;
  imagePath = imagePath ? imagePath : `${image}`;
  const category = await Category.updateOne(
    { _id: _id },
    {
      categoryName: categoryName,
      subCategories: subCategories,
      image: imagePath,
    }
  );
  if (category) {
    res.status(200).json("edited successfully");
  } else {
    res.status(500).json("server error");
  }
});

const blockCategory = asyncHandler(async (req, res) => {
  const { categoryId, isBlocked } = req.body;
 
  const category = await Category.updateOne(
    { _id: categoryId },
    { active: isBlocked }
  );
  if (category) {
    res.status(200).json("successfull");
  } else {
    res.status(500).json("server error");
  }
});
const loadSubscribers=asyncHandler(async (req, res) => {
  const subscribers = await User.aggregate([
    {
      $match: {
        subscription: { $exists: true, $ne: null }
      }
    },
    {
      $lookup: {
        from: 'plans', // assuming your plans collection is named 'plans'
        localField: 'subscription.mode',
        foreignField: '_id',
        as: 'subscriptionPlan'
      }
    },
    {
      $unwind: '$subscriptionPlan' // unwind the array created by the lookup
    },
    {$project:{
      _id:1,
      firstName:1,
      "subscriptionPlan.subscriptionMode":1,
      subscription:1
    }},
    {
      $group:{
        _id:'$_id',
        firstName:{$first:'$firstName'},
        endDate:{$first:'$subscription.endDate'},
        mode:{$first:"$subscriptionPlan.subscriptionMode"}
      }
    }
  ]);


  const plans=await Plan.find({})
  res.status(200).json({subscribers,plans})
})

const addPlan=asyncHandler(async (req, res) => {
  const {type,price,duration,specifications}=req.body
  
  const checkPlans = await Plan.findOne({subscriptionMode: { $regex: new RegExp(type, 'i') }});

  if(!checkPlans){
    const plan =await Plan.create({
      subscriptionMode: type,
      price,
      duration,
      benifits:specifications
    })
    res.status(200).json('successfull')
  }else{
    res.status(409).json('plan already exist')
  }

  
})
const loadDashboardDetails=asyncHandler(async (req, res) => {

  const users=await User.aggregate([
    {
      $lookup:{
        from:'marklists',
        localField:'_id',
        foreignField:'studentId',
        as:"studentMarks"
      }
    },
    {$unwind: { path: '$studentMarks', preserveNullAndEmptyArrays: true }},
    {$project:{
      _id:1,
      firstName:1,
      subscription:1,
      isBlocked:1,
      "studentMarks.quiz":1
    }},
    {$group:{
      _id:"$_id",
      name:{$first:"$firstName"},
     subscription:{$first:"$subscription"} ,
     isBlocked:{$first:'$isBlocked'},
     quizzes: { $push: "$studentMarks.quiz" }
    }}

  ])
  
  const tutors = await Tutor.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: 'tutor',
        as: 'courseDetails'
      }
    },
    { $unwind: { path: '$courseDetails', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        specification: 1,
        isBlocked: 1,
        userName:1,
        'courseDetails.rating': 1,
        'courseDetails.videos': 1
      }
    },
    {
      $group: {
        _id: '$_id',
        specification: { $first: '$specification' },
        isBlocked: { $first: '$isBlocked' },
        name: { $first: '$userName' },
        courseRating: { $push: '$courseDetails.rating' },
        courseVideos: { $push: '$courseDetails.videos' }
      }
    }
  ]);
  

  const totalTutors = await Tutor.count({})

  if(users&&tutors){
    res.status(200).json({users,tutors,totalTutors})
  }else{
    res.status(500).json('not found')
  }

})

const loadSalesReport=asyncHandler(async (req, res) => {
    
  const monthlySales = await User.aggregate([
    {
      $match: {
        // Add any additional filters for user selection if needed
      },
    },
    {
      $lookup: {
        from: 'plans', // Assuming your plans collection is named 'plans'
        localField: 'subscription.mode',
        foreignField: '_id',
        as: 'subscriptionDetails',
      },
    },
    {
      $unwind: '$subscriptionDetails',
    },
    {
      $project: {
        month: { $month: '$subscription.startDate' }, // Extract month from the subscription start date
        price: '$subscriptionDetails.price',
        subscriptionMode: '$subscriptionDetails.subscriptionMode',
        // Add any other fields you want to include in the result
      },
    },
    {
      $group: {
        _id: { month: '$month' },
        totalSales: { $sum: '$price' },
        // Add any other fields you want to include in the result
      },
    },
    {
      $sort: {
        '_id.month': 1,
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the final result
        month: '$_id.month',
        totalSales: 1,
      },
    },
  ]);
  
  // Ensure all months are in the result, even if there are no sales
  const allMonths = Array.from({ length: 12 }, (_, index) => ({
    month: index + 1,
    totalSales: 0,
  }));
  
  const finalResult = allMonths.map((monthData) => {
    const matchingMonth = monthlySales.find(
      (salesData) => salesData.month === monthData.month
    );
    return matchingMonth || monthData;
  });
  
  
  const subscriptionCounts = await User.aggregate([
    {
      $match: {
        // Add any additional filters for user selection if needed
      },
    },
    {
      $lookup: {
        from: 'plans', // Assuming your plans collection is named 'plans'
        localField: 'subscription.mode',
        foreignField: '_id',
        as: 'subscriptionDetails',
      },
    },
    {
      $unwind: '$subscriptionDetails',
    },
    {
      $group: {
        _id: '$subscriptionDetails.subscriptionMode',
        count: { $sum: 1 },
      },
    },
  ]);
  
  
  const userCount = await User.countDocuments({});

  if(monthlySales){
    res.status(200).json({finalResult,subscriptionCounts,userCount})
  }else{
     res.status(500).json('not working')
  }
  
})

export {
  loadUsers,
  loadTutors,
  blockUser,
  blockTutor,
  loadCategory,
  addCategory,
  addCourse,
  validateCourse,
  loadCourses,
  blockCourse,
  editCategory,
  blockCategory ,
  addPlan,
  loadSubscribers,
  loadDashboardDetails,
  loadSalesReport
};
