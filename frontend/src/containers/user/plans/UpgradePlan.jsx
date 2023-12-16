

import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import axiosInstance from '../../utils/axios'
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';

function PlanCard({ subscriptionMode, duration, price, benifits,userInfo,backgroundColor }) {
   
    const makePayment=async(subscriptionMode)=>{
      const stripe=await loadStripe('pk_test_51O9tFFSDsPPMBnLnKyvyumurLHFVUHzGUpmbkXp9jHCv0VgSXfHSUHhHuigLLml4DL18sxaWg3GhJNPsb7yaeQ3S00Z3qxkuvG');
   const isUpgrading=true
      const response=await axiosInstance.post('/create-checkout',{subscriptionMode,isUpgrading})
      
      const session=response.data.id
      
      const result= stripe.redirectToCheckout({
        sessionId:session
        // originalPrice:response.data.originalPrice,
        // discountPercentage:response.data.discountPercentage,
        // discountedPrice:response.data.discountedPrice
      })
    }
    return (
      <>
      <div style={{height:'72px'}}></div>
      <div className="columns" >
        <ul className="price" style={{ }}>
          <li className="header" style={{ backgroundColor }}>
            {subscriptionMode}
          </li>
         
          <li className="bg-gray-100 text-purple" style={{color:'purple',fontFamily:'sans-serif',fontSize:'20',fontWeight:'bolder'}}>₹ {price} </li>
         
          <li style={{ maxHeight: '235px', overflow: 'auto' }}>
            <ul>
            {subscriptionMode==='Premium' ?<span className='' style={{color:'purple'}}> Discount:20% </span>:''}
              {benifits?.map((feature, index) => (
                <li key={index}>
                  <span style={{ marginLeft: '8px' }}>{feature}</span>
                </li>
              ))}
            </ul>
          </li>
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

function UpgradePlan() {

  const {currentPlan}=useParams()
    const [plans,setPlans]=useState([])
    const {userInfo}=useSelector((state)=>state?.auth)
    useEffect(()=>{
       
      fetchPlans()
  
    },[])
   
    const fetchPlans=async()=>{
      // console.log('working',currentPlan)
        const response =await axiosInstance.get(`/loadUpgradePlan/${currentPlan}`)
         setPlans([...response.data.plans])
      //  console.log(response.data.plans,'plans') 
           
        }
  return (
    <div className="plan-container " style={{ backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
{/* <div className="plan-container"> */}
<div style={{height:'72px'}}></div>
<div className='flex item-center justify-center' style={{minHeight:'90vh'}}>
{
 
        plans.map((plan, index) => (
          <PlanCard key={index} {...plan} userInfo={userInfo} />
        ))
      }
   
      </div>
    {/* </div> */}
    </div>
  )
}

export default UpgradePlan