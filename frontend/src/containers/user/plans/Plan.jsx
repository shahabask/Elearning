import React, { useEffect, useState } from 'react';
import './plan.css'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import {loadStripe} from '@stripe/stripe-js';
import { FaArrowCircleUp } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import { Scrollbars } from 'react-custom-scrollbars';

function PlanCard({ subscriptionMode, duration, price, benifits,userInfo,backgroundColor }) {

  const makePayment=async(subscriptionMode)=>{
    const stripe=await loadStripe('pk_test_51O9tFFSDsPPMBnLnKyvyumurLHFVUHzGUpmbkXp9jHCv0VgSXfHSUHhHuigLLml4DL18sxaWg3GhJNPsb7yaeQ3S00Z3qxkuvG');
       const isUpgrading=false
    const response=await axiosInstance.post('/create-checkout',{subscriptionMode,isUpgrading})
    
    const session=response.data.id
    
    const result= stripe.redirectToCheckout({
      sessionId:session
    })
  }
  return (
    <>
      
    <div className="columns" style={{ minHeight: '500px' }}>
    
      <ul className="price">
        <li className="header" style={{ backgroundColor }}>
          {subscriptionMode}
        </li>
        <li className="grey text-purple" style={{color:'purple',fontFamily:'sans-serif',fontSize:'30',fontWeight:'bolder'}}>₹ {price}</li>
        {/* <li style={{ maxHeight: '235px', overflow: 'auto' }}> */}
        <Scrollbars style={{ height: '220px' }}>
          <ul>
            {benifits.map((feature, index) => (
              <li key={index}>
                <span style={{ marginLeft: '8px' }}>{feature}</span>
              </li>
            ))}
          </ul>
          </Scrollbars>
        {/* </li> */}
        <li className="grey">
          {userInfo ? (
            <button className="button" onClick={()=>makePayment(subscriptionMode)}>Subscribe</button>
          ) : (
            <a href="/login" className="button">
              Sign In
            </a>
          )}
        </li>
      </ul>
    
    </div>
    </>
  );
  
}

function PlanContainer() {


const [subscription,setSubscription]=useState([])
const [isSubscriptionActive,setSubscriptionActive]=useState(false)
const [currentPlan,setCurrentPlan]=useState('')
const [endDate,setEndDate]=useState(null)
  const {userInfo}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  useEffect(()=>{
     
    fetchPlans()
  // console.log(currentPlan,'currentPlan')
  },[])
 const [plans,setPlans]=useState([])
  const fetchPlans=async()=>{
  const response =await axiosInstance.get('/loadPlans')
   setPlans([...response.data.plans])
     setSubscription([response.data.subscription[0]])
    //  console.log(response.data.subscription[0].mode)
     setCurrentPlan(response.data.subscription[0].mode)
     const endDateISO = Date.parse(response.data.subscription[0].subscription.endDate);
     console.log(endDateISO,'endDate')
     const endDate = new Date(endDateISO);

     // Format endDate as "day/month/year"
     const formattedEndDate = endDate.toLocaleDateString('en-GB');
     setEndDate(formattedEndDate)
     if(endDate> Date.now()){
        setSubscriptionActive(true)
        
     }
     
  }
 
  const upgradeButtonSpring = useSpring({
    from: { transform: 'scale(1)', opacity: 1 },
    to: async (next) => {
      await next({ transform: 'scale(1.1)', opacity: 0.9 });
      await next({ transform: 'scale(1)', opacity: 1 });
    },
    config: { tension: 300, friction: 10 },
  });
  
  const handleUpgradeClick=()=>{

    navigate(`/upgradePlan/${currentPlan}`)
  }

  return (
    
    <div className="plan-container lg:flex " style={{ backgroundColor: 'rgba(224, 176, 255, 0.2)',minHeight:'100vh'}} >
     <div style={{height:'72px'}}></div>
      {isSubscriptionActive ? (
      <div className="plan-container">
       <div className="flex justify-center items-center h-full">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <p className="text-4xl text-purple-600 font-semibold mb-2">Premium Subscription</p>
          <p className="text-lg text-gray-600">
            Your Subscription Details
          </p>
        </div>
        <ul className="list-inside list-disc text-lg text-gray-700 mb-4">
  {subscription[0]?.benifits?.map((benefit, index) => (
    <li key={index} className="mb-3 flex items-start">
      <svg className="w-5 h-5 mr-2 text-purple-600 mt-1">
        {/* You can replace the below line with a suitable icon component or SVG */}
        <circle cx="5" cy="5" r="4" fill="currentColor" />
      </svg>
      <span className="font-medium">{benefit}</span>
    </li>
  ))}
</ul>
        <p className="text-gray-600 mb-2">
          Purchased Mode: <span className="font-semibold text-purple-600">{subscription[0].mode}</span>
        </p>
        <p className="text-gray-600 mb-4">
          End Date: <span className="font-semibold text-purple-600">{endDate}</span>
        </p>
        <Link to='/courses' style={{ textDecoration: 'none' }} className="block w-full text-center bg-gray-600 text-white py-3 rounded-md hover:bg-purple-700">
          Go to Watch Video
        </Link>
    {subscription[0].mode=='Premium' ?'':  <animated.button
          style={upgradeButtonSpring}
          className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition-all duration-300 focus:outline-none"
          onClick={() => handleUpgradeClick()}
        >
          <FaArrowCircleUp className="mr-2" />
          Upgrade Plan
        </animated.button>} 
      </div>
    </div>
    </div>
      ) : (
        plans.map((plan, index) => (
          <PlanCard key={index} {...plan} userInfo={userInfo} />
        ))
   
      )}
    
  

  </div>
  );
}

export default PlanContainer;
