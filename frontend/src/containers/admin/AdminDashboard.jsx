import '../admin/AdminDashboard.css';
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import {axiosInstance} from '../utils/adminAxios'
import DataTable from './tables/DataTables';
function AdminDashboard() {
  const chartRef = useRef(null);

  const chartInstance = useRef(null);
  const [noOfUsers,setNoOfUsers]=useState({})
  const [tutorData,setTutorData]=useState([])
  const [isDataArrived,setIsDataArrived]=useState(false)
  const [isLoaded,setIsLoaded]=useState(false)
  useEffect(() => {
    fetchDashboardDetails()
    // Get the context of the canvas element for the first chart (Doughnut Chart)
    const ctx = chartRef.current.getContext('2d');

    const dataForm = ["user", "tutor", "subscribsers"];
    const userCount = noOfUsers.user;
    const tutorCount=noOfUsers.tutor;
    const subscribsers=noOfUsers.subscribers;
    const data = {
      labels: dataForm,
      datasets: [
        {
          label: "No of users",
          data: [userCount, tutorCount, subscribsers],
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
      // if (pieChartInstance.current) {
      //   pieChartInstance.current.destroy();
      // }
    };
    
  }, [isLoaded]);

  const fetchDashboardDetails=async()=>{
try {
  const response=await axiosInstance.get('/loadDashboardDetails')
  const users = response.data.users;
  setIsLoaded(true)
const subscribersCount = users.filter(user => user.subscription !== null && user.subscription !== undefined).length;

const result = {
  user: users.length,
  tutor: response.data.totalTutors,
  subscribers: subscribersCount
};
  setNoOfUsers(result)
  const tutors=response.data.tutors

  const tutorsWithCounts = tutors.map((tutor) => ({
    name: tutor.name,
    videoCount: tutor.courseVideos.reduce((acc, videos) => acc + videos.length, 0),
  }));
  
  const top3Tutors = tutorsWithCounts
    .sort((a, b) => b.videoCount - a.videoCount)
    .slice(0, 3);
    setTutorData(top3Tutors)
    setIsDataArrived(!isDataArrived)
} catch (error) {
  console.log(error)
}
  }


  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: 'rgba(224, 176, 255, 0.2)' }}>
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
            
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Top Tutors</h2>
      <div className="overflow-x-auto sm:mb-5" >
      <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-pink-500">
          <tr>
            <th className="py-2 px-4 border-b">Rank</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Total Videos</th>
          </tr>
        </thead>
        <tbody>
          {tutorData.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.videoCount}</td>
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
  );
}

export default AdminDashboard;