


import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import {axiosInstance} from '../../utils/tutorAxios'
import socket from '../../utils/socket';
function TutorLiveRoom() {
 
  const navigate=useNavigate()

  const { roomId,id } = useParams();

    const handleEndLive=async(id)=>{

        const response=await axiosInstance.patch('/updateLiveStatus',{id,status:'Ended'})
        
        navigate('/tutor/liveClasses')
        socket.emit('end_live')
    }
 
  let role_str ='Host' ||'Cohost';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      :  ZegoUIKitPrebuilt.Cohost
     

  

  // Generate Kit Token for authentication
  const appID = 793445047;
  const serverSecret = '345211026ca45fcff6e39ab9d88191e1';
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomId,
    Date.now().toString(),
    'shahabas'
  );

  // Start the call only for the audience
  let startMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (role === ZegoUIKitPrebuilt.Host) {
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        // sharedLinks,
      });
    }
  };

  return (
    <div className="room-page h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-purple-100 text-black">
    {/* <div className="mb-8 text-3xl font-bold">Live Streaming Room</div> */}
    {/* Add a stylish container for the live streaming */}
    {role === ZegoUIKitPrebuilt.Host && (
      <div
        className="w-full rounded-lg shadow-lg" style={{height:'90vh'}}
        ref={startMeeting}
      />
    )}
    <button onClick={()=>handleEndLive(id)}> End Live</button>
    </div>
  );
}

export default TutorLiveRoom
 