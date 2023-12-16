import { useEffect, useState } from "react";
import Category from "./Category";
import CourseCard from "./Course";
import axiosInstance from "../../utils/axios";

function CourseCategoryPage() {
  const [coursesData, setCoursesData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const [uniqueSubCategories, setUniqueSubCategories] = useState([]);
  const itemsPerPage = 3;
  const [categoriesData, setCategoriesData] = useState([]);
  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("AZ");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/courseCategoryList");
      setCoursesData(response.data.courses);
      console.log(response.data.courses,'courses')
      setCategoriesData(response.data.categories);
      setUniqueSubCategories([
        ...new Set(
          response?.data?.courses?.map((course) => course.subCategory)
        ),
      ]);
    } catch (error) {
      console.log("error", error);
    }
  };
  // Filter courses based on search term and selected subCategory
  const filteredCourses = coursesData.filter((course) => {
    const searchTermMatch = course.course
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const subCategoryMatch = selectedSubCategory
      ? course.subCategory==selectedSubCategory
      : true;
      // console.log(selectedSubCategory,'selectedsub')
      // // console.log(course.subCategories,'cate')
      // console.log(subCategoryMatch,'match') 
    return searchTermMatch && subCategoryMatch;
  });

  // Pagination logic
  const indexOfLastCourse = currentCoursePage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const handleLoadMoreCourses = () => {
    const totalCourses = filteredCourses.length;
    let nextPage =
      (currentCoursePage % Math.ceil(totalCourses / itemsPerPage)) + 1;

    // If nextPage is 1, it means we are starting a new cycle, so reset to show the first set of courses
    if (nextPage === 1) {
      setCurrentCoursePage(1);
    } else {
      setCurrentCoursePage(nextPage);
    }
  };

 

  const handleSort = () => {
    const newSortOrder = sortOrder === "AZ" ? "ZA" : "AZ";
    setSortOrder(newSortOrder);

    const sortedCourses = [...filteredCourses].sort((a, b) => {
      if (newSortOrder === "AZ") {
        return a.course.localeCompare(b.course);
      } else {
        return b.course.localeCompare(a.course);
      }
    });

    setCoursesData(sortedCourses);
  };


  const handleLoadMoreCategories = () => {
    setCurrentCategoryPage(
      (currentCategoryPage % Math.ceil(categoriesData.length / itemsPerPage)) +
        1
    );
  };

  const indexOfLastCategory = currentCategoryPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = categoriesData.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  return (
    <div
      className="main-component pt-16"
      style={{ backgroundColor: "rgba(224, 176, 255, 0.2)" }}
    >
      <div className="text-center my-4">
        <h1 className="text-3xl font-semibold mb-4">Top Courses</h1>

        <div className="flex items-center justify-center space-x-4 mb-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by course name"
              className="p-2 border rounded w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="absolute top-0 right-0 px-3 py-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white rounded-r"
              onClick={() => {
                // Add functionality for search button click here
              }}
            >
              Search
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              className="p-2 border rounded"
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              value={selectedSubCategory}
            >
              <option value="">All</option>
              {uniqueSubCategories.map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
            <div className="absolute top-0 right-0 px-3 py-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white rounded-r">
              {/* Add an icon here, e.g., a filter icon */}
              {/* You can use an external icon library or an SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white rounded"
              onClick={handleSort}
            >
              {sortOrder === "ZA" ? "Sort A-Z" : "Sort Z-A"}
            </button>
          </div>

        </div>

        {/* Courses Display */}
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
  {currentCourses.length === 0 ? (
    <div style={{height:'400px'}} className="justify-content-center">
    <p className="text-black mt-5 pt-5" style={{fontSize:'26px'}}>No results found.</p></div>
  ) : (
    currentCourses.map((course) => (
      <CourseCard className="m-8 p-5" key={course?._id} {...course} />
    ))
  )}
</div>

        {/* Load More Button */}
        {filteredCourses.length > itemsPerPage && (
          <button
            className="text-white shadow bg-gradient-to-r from-purple-700 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleLoadMoreCourses}
          >
            Load More Courses
          </button>
        )}
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl font-semibold mb-4">Categories</h1>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {currentCategories.map((category) => (
            <Category key={category?._id} {...category} />
          ))}
        </div>
        {categoriesData.length > itemsPerPage && (
          <button
            className="text-white shadow bg-gradient-to-r from-purple-700 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleLoadMoreCategories}
          >
            Load More Categories
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseCategoryPage;
