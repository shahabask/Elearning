
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useEffect, useState } from 'react';

function SubCategory() {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 3; // Number of courses per page
 const [category,setCategory]=useState([])
const [subCategoryCourses,setSubCategoryCourses]=useState([])
 const { categoryId } = useParams();
  const handleSubcategoryClick = (subcategory) => {

    setSelectedSubcategory(subcategory);
    // setCurrentPage(1);
  };

  // const handleLoadMore = () => {
  //   setCurrentPage(currentPage + 1);
  // };
useEffect(()=>{
    fetchCategoryDetails()
   setSelectedSubcategory(category[0]?.subCategory)

},[])
const fetchCategoryDetails=async()=>{
    try {
        const response=await axiosInstance.get(`https://www.skillsync.website/api/categoryDetails/${categoryId}`)
       
      const modifiedCategory=response?.data?.map((item) => {
        if (item.courseImage) {
          item.courseImage = `https://www.skillsync.website/images/${item.courseImage}`;
        }
        if(item.image){
          item.image = `https://www.skillsync.website/images${item.image}`;

        }
        return item;
      })
        setCategory([...modifiedCategory])
      
    } catch (error) {
   
      toast.error(error?.response?.data ||error.error)  
    }
        
}




useEffect(()=>{
   
 
    const coursesDetails=category.filter((category)=>{
      if(category.subCategory===selectedSubcategory){
     
        return category
      }
     
    })

    if(coursesDetails.length==0){
      setSubCategoryCourses([])
    }else{

      setSubCategoryCourses([...coursesDetails])
      
    }
},[selectedSubcategory])

const [isHovered, setIsHovered] = useState(false);

const handleMouseEnter = () => {
  setIsHovered(true);
};

const handleMouseLeave = () => {
  setIsHovered(false);
};
  return (

<div style={{backgroundColor:'#FDF8EE'}}>
  <div style={{height:'100px'}}></div>

  {/* Page Content */}
  <div className="px-4 px-lg-5">
    {/* Heading Row */}
    <div className='flex justify-center'>
    <div className="text-white my-4 py-1 text-xl text-center w-full bg-slate-200" style={{height:'60px' ,borderRadius:'7px' }}>
      <div className="h-50">
        <h1 className="m-0">{category[0]?.categoryName}</h1>
      </div>
    </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center my-5">
    <div className="lg:col-span-1 flex justify-center items-center">
  <div className="relative group">
    <img
      className="rounded max-h-48 mb-4 transform transition-transform duration-300 group-hover:scale-110"
      src={category[0]?.image}
      alt="..."
      style={{ width: '200px' }}
    />
    {/* <div className="hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 group-hover:flex justify-center items-center">
      <p className="text-white text-lg font-semibold">Hover Effect</p>
    </div> */}
  </div>
</div>

  <div className="lg:col-span-1">
    <h3 className="font-light">SUBCATEGORIES:</h3>
    <div>
      {category[0]?.subCategories?.map((subcategory, index) => (
        <button type="button" onClick={() => handleSubcategoryClick(subcategory)}
         key={index} className="text-white bg-gradient-to-r from-slate-500 to-gray-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"> 
         {subcategory}</button>
 
      ))}
    </div>
  </div>
</div>


    {/* Call to Action */}
    <div className='flex justify-center'>
    <div className=" text-white my-4 py-1 text-xl text-center w-full bg-slate-200" style={{height:'60px' ,borderRadius:'7px'}}>
      <div className="h-50">
        <h1 className="m-0">Courses</h1>
      </div>
    </div>
    </div>
    {/* Content Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex justify-center items-center">
  {subCategoryCourses.length > 0
    ? subCategoryCourses.map((course, index) => (

      <div
      key={index}
      className={`relative group duration-500 cursor-pointer group overflow-hidden relative text-gray-50 h-72 w-56 rounded-2xl hover:duration-700 duration-700 ${
        isHovered ? 'group-hover:-bottom-0' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-56 h-72 bg-lime-400 text-gray-800">
        <div className="flex flex-row justify-between">
          <svg
            className="fill-current stroke-current w-8 h-8 p-2 hover:bg-lime-200 rounded-full m-1"
            height="100"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 100 100"
            width="100"
            x="0"
            xmlns="http://www.w3.org/2000/svg"
            y="0"
          >
            <path
              className=""
              d="M15.8,32.9V15.8m0,0H32.9m-17.1,0L37.2,37.2m47-4.3V15.8m0,0H67.1m17.1,0L62.8,37.2m-47,29.9V84.2m0,0H32.9m-17.1,0L37.2,62.8m47,21.4L62.8,62.8M84.2,84.2V67.1m0,17.1H67.1"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="8"
            ></path>
          </svg>
          <svg
            className="fill-current stroke-current w-8 h-8 p-2 m-1 hover:bg-lime-200 rounded-full"
            height="100"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 100 100"
            width="100"
            x="0"
            xmlns="http://www.w3.org/2000/svg"
            y="0"
          >
            <path
              className="svg-stroke-primary"
              d="M50,17.4h0M50,50h0m0,32.6h0M50,22a4.7,4.7,0,1,1,4.7-4.6A4.7,4.7,0,0,1,50,22Zm0,32.7A4.7,4.7,0,1,1,54.7,50,4.7,4.7,0,0,1,50,54.7Zm0,32.6a4.7,4.7,0,1,1,4.7-4.7A4.7,4.7,0,0,1,50,87.3Z"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="8"
            ></path>
          </svg>
        </div>
      </div>
      <div
        className={`absolute bg-gray-50 ${isHovered ? '-bottom-0' : '-bottom-24'} w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500`}
      >
        {/* <span className="text-lime-400 font-bold text-xs">TAILWIND</span> */}
        <span className="text-gray-800 font-bold text-3xl">{course.course}</span>
        {/* <p className="text-neutral-800">{course.courseDescription}</p> */}
        <Link
          to={`/playlist/${course.courseId}`}
          className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 mt-4"
        >
          watch videos
        </Link>
      </div>
    </div>
      ))
    : (
      <div className="flex justify-center items-center h-48 animate-pulse">
        <div className="bg-gray-200 rounded-lg p-4 text-center">
          <p className="text-gray-500 text-lg">
            No courses in {selectedSubcategory} category
          </p>
          <div className="mt-4">
            <div className="h-3 w-24 bg-gradient-to-r from-slate-500 to-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )}
</div>

  </div>
</div>

  )

}

export default SubCategory;
