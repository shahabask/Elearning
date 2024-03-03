import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// Function to get URL parameters
export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

function RoomPage() {

  const { roomId } = useParams();
  useEffect(()=>{
    startMeeting()
  },[])

  const role = ZegoUIKitPrebuilt.Audience;

  
  // let sharedLinks = [];
  // if (role === ZegoUIKitPrebuilt.Audience || role === ZegoUIKitPrebuilt.Audience) {
  //   sharedLinks.push({
  //     name: 'Join as co-host',
  //     url:
  //       window.location.protocol +
  //       '//' +
  //       window.location.host +
  //       window.location.pathname +
  //       '?roomId=' +
  //       roomId +
  //       '&role=Cohost',
  //   });
  // }
  // sharedLinks.push({
  //   name: 'Join as audience',
  //   url:
  //     window.location.protocol +
  //     '//' +
  //     window.location.host +
  //     window.location.pathname +
  //     '?roomId=' +
  //     roomId +
  //     '&role=Audience',
  // });

  // Generate Kit Token for authentication
  const appID = 1795365148;
  const serverSecret = '56de0e4dac7e86851b37e9584ffee39a';
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomId,
    Date.now().toString(),
    'shahabas'
  );

  let startMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (role === ZegoUIKitPrebuilt.Audience) {
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
       
      });
      const { layout } = zp;
    
    // Modify layout
    layout.setStyle({
     outerWidth:'500px'
       
    });

    }
  };

  return (
    <div className="room-page flex flex-col items-center justify-center bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 text-black">

    <div className="md:w-full s:w-3/6 h-screen rounded-lg shadow-lg overflow-hidden" ref={startMeeting} />
  
  </div>
  
  );
}

export default RoomPage;