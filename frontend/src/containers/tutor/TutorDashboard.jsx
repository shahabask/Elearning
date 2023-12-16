import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Chart from 'chart.js/auto';
import {axiosInstance} from "../utils/tutorAxios";

function TutorDashboard() {

  const [userData,setUserData]=useState([])
  const [myData,setMyData]=useState({})
  const [isLoaded,setIsLoaded]=useState(false)
  const chartRef = useRef(null);

  const chartInstance = useRef(null);
  useEffect(() => {
    fetchDashboardDetails()
    // Get the context of the canvas element for the first chart (Doughnut Chart)
    const ctx = chartRef.current.getContext('2d');
// const noOfUsers={}
    const dataForm = ["course", "quiz", "videos"];
    const courseCount = myData?.course;
    const quizCount=myData?.quiz;
    const videosCount=myData?.videos;
    const data = {
      labels: dataForm,
      datasets: [
        {
          label: "No of items",
          data: [courseCount, quizCount, videosCount],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "doughnut",
      data: data,
    };

    // Destroy existing Chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new Chart instance for the first chart
    chartInstance.current = new Chart(ctx, config);

    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    
    };
  
  }, [isLoaded]);

  const fetchDashboardDetails=async()=>{
    try {
      const response= await axiosInstance.get('/loadTutorDashboard')
      setUserData(response.data.topUsers)
      setIsLoaded(true)
      const count={course:response.data.courseCount, quiz:response.data.quizCount, videos:response.data.videoCount}
      setMyData(count)
      // console.log('response',count)
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <>
    <div style={{ minHeight: "100vh", backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
      <div className="container" style={{ paddingTop: "7rem" }}>
        {/* Header Row */}
        <div className="row ">
          <div className="col">
            <div className=" d-flex justify-content-between align-items-center">
              <div className="link-container">
                <Link
                  to="/live"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Row */}
        <div className="row mt-3">
          <div className="container flex grid grid-cols-1 sm:grid-cols-2">
            {/* First Column with Doughnut Chart */}
            <div className=" flex justify-center " style={{ height: '400px' }}>
              <canvas ref={chartRef}></canvas>
            </div>

            <div >
          
  <div className="container mx-auto mt-8 ">
    <h2 className="text-2xl font-semibold mb-4">Top Students</h2>
    <div className="overflow-x-auto sm:mb-5">
    <table className=" bg-white border border-gray-300 rounded-md overflow-x">
      <thead className="bg-pink-500">
        <tr>
          <th className="py-2 px-4 border-b">Rank</th>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">quizzes solved</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((item, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b">{index + 1}</td>
            <td className="py-2 px-4 border-b">{item.firstName}</td>
            <td className="py-2 px-4 border-b">{item.totalQuizzesSolved}</td>
          </tr>
        ))}
      </tbody>
    </table></div>
  </div>
  </div>
        
          </div>
          {/* You can add more columns for additional cards */}
        </div>
      </div>
      <div style={{height:'30px'}}></div>
    </div>
  </>
  )
}

export default TutorDashboard