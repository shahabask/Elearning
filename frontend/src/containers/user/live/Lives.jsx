import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import socket from "../../utils/socket";



function Lives() {
  const [liveSessions, setLiveSessions] = useState([]);
  //  const [liveUpdated,setLiveUpdated]=useState(false)
  
  const navigate = useNavigate();



useEffect(()=>{
  fetchLiveDetails()
  socket.on('track_live',()=>{
    fetchLiveDetails()
            // setLiveUpdated(!liveUpdated)
          })

         
},[socket])
  
  const fetchLiveDetails = async () => {
    try {
      
      const response = await axiosInstance.get("/getLiveDetails");
      setLiveSessions(response.data.lives);
     
      
    } catch (error) {
      console.log("error",error);
    }
  };
  const handleJoinClick = (roomId) => {
    navigate(`/userRoom/${roomId}`);
  };

  const formatToAMPM = (dateTimeString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedTime = new Date(dateTimeString).toLocaleTimeString(
      "en-US",
      options
    );
    return formattedTime;
  };

  const formatToDate = (dateTimeString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateTimeString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const renderNoLiveScheduled = () => (
    <div className="flex items-center justify-center" style={{minHeight:'60vh'}}>
      <div className="text-center">
        <p className="text-2xl font-semibold text-gray-600 mb-10 pb-5">
          No live sessions scheduled.
        </p>
        {/* Your additional styling and components for the theme */}
      </div>
    </div>
  );
  return (
    <>
      <div style={{ height: "72px" }}></div>
      <div className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 p-8" style={{minHeight:'69vh'}}>
      {liveSessions.length === 0 ? (
        renderNoLiveScheduled()
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
         {liveSessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col bg-orange-50 rounded-3xl p-6"
            >
              <h2 className="text-lg font-medium tracking-tighter text-black mb-2">
                {session.name}
              </h2>
              <p className="flex-grow text-sm text-black-100 mb-4">
                {session.description}
              </p>

              <div style={{ color: "black", textDecoration: "bold" }}>
                <span
                  className="fw-bold text-purple-900"
                  style={{ color: "purple" }}
                >
                  Time:
                </span>{" "}
                {formatToAMPM(session?.startingTime)} -{" "}
                {formatToAMPM(session?.endingTime)}
              </div>
              <div style={{ color: "black" }}>
                <span
                  className="fw-bold text-purple-800"
                  style={{ color: "purple" }}
                >
                  Date:
                </span>{" "}
                {formatToDate(session?.startingTime)}
              </div>
              <div style={{ borderRadius: "5px", color: "black" }}>
                <span className="fw-bold" style={{ color: "purple" }}>
                  Status :
                  <span
                    style={{
                      color:
                        session?.status === "Not started" ? "black" : "green",
                    }}
                  >
                    {session?.status}
                  </span>
                </span>
              </div>
              {session.status === "On-going" ? (
                <button
                  className="mt-4 w-full bg-black text-white duration-200 border-2 border-white rounded-full py-2 hover:bg-transparent hover:border-white hover:text-white focus:outline-none focus-visible:outline-white"
                  onClick={() => handleJoinClick(session.roomId)}
                >
                  Join
                </button>
              ) : session.status === "ended" ? (
                <div style={{ height: "45px" }}></div>
              ) : ''}
            </div>
          ))}
        </div>)}
      </div>
    </>
  );
}

export default Lives;
