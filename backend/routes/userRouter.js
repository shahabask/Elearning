import express from 'express'
import {authUser,registerUser,logoutUser,verifyEmail,confirmOtp,resetPassword,otpLoginVerifyEmail,otpLogin,
    courseCategoryListing,loadCategoryDetails,loadProfile,updateProfile,courseDetails,loadPlans,loadUpgradePlan,checkout,
    confirmPayment,loadSubsriptionDetails,loadQuizzes,loadLiveDetails,loadQuizDetails,addQuizResult,loadVideos,
    loadMarkSheet,submitAssignment,rateCourse,loadCourseReviews,loadAssignmentData ,loadWatchHistory,deleteHistory
  ,addToHistory} from '../controllers/userController.js'
import  authcheck  from '../middleware/userMiddleware.js'


import multer from 'multer';
import path from 'path'
const storage = multer.diskStorage({
destination: (req, file, cb) => {
  console.log('jkfof',file)

  cb(null, 'public/images');
  console.log('ojew')
},
filename: (req, file, cb) => {
 
  cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
   console.log('abcd',file.fieldname + "_" + Date.now() + path.extname(file.originalname))
},
});

const upload = multer({ storage: storage });

const storageForPDF = multer.diskStorage({
  destination: (req, file, cb) => {
   
    cb(null, 'backend/public/pdf');
    // console.log(' file comming')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    
  },
});

const uploadPDF = multer({ storage: storageForPDF });


const router=express.Router()

router.post('/auth',authUser)
router.post('/register',registerUser)
router.post('/logout',logoutUser)
router.put('/forgotPassword',verifyEmail)
router.post('/verifyOtp',confirmOtp)
router.post('/resetPassword',resetPassword)
router.post('/otpLoginVerifyEmail',otpLoginVerifyEmail)
router.post('/otpLogin',otpLogin)
router.get('/courseCategoryList',courseCategoryListing)
router.get('/categoryDetails/:categoryId',loadCategoryDetails)
router.get('/loadProfile',authcheck,loadProfile)
router.post('/updateProfile',authcheck,upload.single('image'),updateProfile)
router.get('/loadCourseDetails/:courseId',authcheck,courseDetails)
router.get('/loadPlans',authcheck,loadPlans)
router.get('/loadUpgradePlan/:currentPlan',authcheck,loadUpgradePlan)
router.post('/create-checkout',authcheck,checkout)
router.post('/confirmPayment',confirmPayment)
router.get('/getUserDetails',authcheck,loadSubsriptionDetails)
router.get('/loadQuizzes',authcheck,loadQuizzes)
router.get('/getLiveDetails',loadLiveDetails)
router.get('/quizDetails/:quizId',loadQuizDetails)
router.post('/addQuizResult',authcheck,addQuizResult)
router.get('/loadMarkSheet',authcheck,loadMarkSheet)
router.get('/loadVideoDetails/:courseId',loadVideos)
router.post('/submitassignment',uploadPDF.single('selectedFile'),authcheck,submitAssignment)
router.get('/loadAssignmentsData',authcheck,loadAssignmentData)
router.post('/rateCourse',authcheck,rateCourse)
router.get('/loadCourseReviews/:courseId',loadCourseReviews)
router.get('/loadWatchHistory',authcheck,loadWatchHistory)
router.delete('/deleteHistory/:items/:videoUrl',authcheck,deleteHistory)
router.post("/addToWatchHistory",authcheck,addToHistory)
export default  router