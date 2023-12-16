
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveAs } from 'file-saver'
import Chart from "chart.js/auto";
import React from "react";
import { axiosInstance } from "../utils/adminAxios";

function SalesReport() {

   

  // <> <div style={{height:'72px'}}></div><p>this is salesReport</p></>

   const [monthlySales,setMonthlySales]=useState([])
  //  const [salesCount,setSalesCount]=useState([])
   const [userCount,setUserCount]=useState('')
   const [basicCount,setBasicCount]=useState(0)
   const [mediumCount,setMediumCount]=useState(0)
   const [premiumCount,setPremiumCount]=useState(0)
   const [isLoaded,setIsLoaded]=useState(false)

   const fetchData=async()=>{
    try {
        const response=await axiosInstance.get('/loadsalesreport')
         setMonthlySales(response.data.finalResult)  

        response.data?.subscriptionCounts.forEach(({ _id, count }) => {
          // Set counts based on subscription mode
          switch (_id) {
            case 'Basic':
              setBasicCount(count);
              break;
            case 'Medium':
              setMediumCount(count);
              break;
            case 'Premium':
              setPremiumCount(count);
              break;
            // Add more cases if needed for other subscription modes
            default:
              break;
          }
        });
        // setSalesCount(response?.data?.subscriptionCounts)
        setUserCount(response?.data?.userCount)
        
    } catch (error) {
        console.log(error)
    }
}
    useEffect(() => {
    
        fetchData();
      }, []);
   
      const style = {
        margin: "10px", 
        padding: "20px", 
        height: "150px",
        backgroundColor: "#233956", // Change background color
        borderRadius: "8px", // Add rounded corners
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a shadow
        color: "white", // Text color
        textAlign: "center", // Center text
      };
    
      
      const chartRef = React.createRef();
    
      const labels = monthlySales?.map(item => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[item.month - 1] || "Unknown Month";
      });
       
      const data = monthlySales?.map(item => item?.totalSales || 0);
      
      const transformedData = {
        labels:labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
    
      // Chart.js options
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    
      React.useEffect(() => {
        const ctx = chartRef.current.getContext("2d");
        let myChart = new Chart(ctx, {
          type: "bar",
          data: transformedData,
          options: options,
        });
    
        return () => {
          if (myChart) {
            myChart.destroy();
          }
        };
      }, [monthlySales]);


      const downloadSalesReport = () => {
        // Check if monthlySales is defined and has data
        if (!monthlySales || monthlySales.length === 0) {
          console.error("No data available for download.");
          return;
        }
      
        // Convert data to CSV format
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      
        // Create a header row for the table
        const headerRow = "Month,Total Sales";
      
        // Create rows for each month's data
        const dataRows = monthlySales.map(item => `${monthNames[item.month - 1] || "Unknown Month"},${item.totalSales || 0}`);
      
        // Combine header and data rows
        const csvContent = `${headerRow}\n${dataRows.join("\n")}`;
      
        // Create a Blob from the CSV content
        const blob = new Blob([csvContent], { type: "text/csv" });
      
        // Use file-saver to save the Blob as a file
        saveAs(blob, 'sales_report.csv');
      };
      
      
      
      
      
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row className="justify-content-md-center">
        <Col xs lg="2" style={style}>
          <Link to="/admin/listUsers" style={{ textDecoration: "none" }}>
            <h4 className="text-center" style={{ color: "white" }}>
              Total Users
            </h4>
            <h4 style={{ color: "white" }}>Count : {userCount}</h4>
            {/* <h4 style={{color:'white'}}>Blocked : {totalBlockUsers}</h4> */}
          </Link>
        </Col>
        <Col xs lg="2" style={style}>
          <Link to="/admin/listUsers" style={{ textDecoration: "none" }}>
            <h4 className="text-center" style={{ color: "white" }}>
           Basic Subscribers
            </h4>
            <h4 style={{ color: "white" }}>count:{basicCount}</h4>
            {/* <h4 style={{color:'white'}}>Blocked : {totalBlockUsers}</h4> */}
          </Link>
        </Col>
        <Col xs lg="2" style={style}>
          <Link to="/admin/listUsers" style={{ textDecoration: "none" }}>
            <h4 className="text-center" style={{ color: "white" }}>
             Medium Subscribers
            </h4>
            <h4 style={{ color: "white" }}>count:{mediumCount}</h4>
            {/* <h4 style={{ color: "white" }}>Blocked : {1}</h4> */}
          </Link>
        </Col>
        <Col xs lg="2" style={style}>
          <Link to="/admin/listSellers" style={{ textDecoration: "none" }}>
            <h4 className="text-center" style={{ color: "white" }}>
             Premium Subscribers
            </h4>
            <h4 style={{ color: "white" }}>count:{premiumCount}</h4>
            {/* <h4 style={{ color: "white" }}>Blocked : {1}</h4> */}
          </Link>
        </Col>
      
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <button onClick={downloadSalesReport} className="btn btn-primary">
          Download Sales Report
        </button>
      </div>
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
  }}
>
  <canvas
    ref={chartRef}
    style={{
      maxWidth: "100%", // Set the maximum width to ensure responsiveness
      height: "auto",   // Automatically adjust the height to maintain aspect ratio
    }}
  ></canvas>
</div>
    </Container>
  );
}



export default SalesReport