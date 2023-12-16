

import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../utils/tutorAxios';
import { Scrollbars } from 'react-custom-scrollbars';

const AssignmentHistory = () => {
   
    const [deleted,setDeleted]=useState(false)
    const [assignmentHistory,setAssignmentHistory]=useState([])
    // const assignmentHistory1=[{
    //     name:'assignment 1',
    //     constraints:['this is assignment 1','this is assignment 1','this is assignment 1'],
    //     endDate:'1-10-2023',
    //     subject:'physics'
    //   },
   
    //   {
    //     name:'assignment 1',
    //     constraints:['this is assignment 1','this is assignment 1','this is assignment 1'],
    //     endDate:'1-10-2023',
    //     subject:'physics'
    //   },
    //   {
    //     name:'assignment 1',
    //     constraints:['this is assignment 1','this is assignment 1','this is assignment 1'],
    //     endDate:'1-10-2023',
    //     subject:'physics'
    //   },
    //   {
    //     name:'assignment 1',
    //     constraints:['this is assignment 1','this is assignment 1','this is assignment 1'],
    //     endDate:'1-10-2023',
    //     subject:'physics'
    //   }
    // ]


    useEffect(()=>{
        fetchAssignmentHistory()
    })

    const fetchAssignmentHistory=async()=>{
        try {
            const status='ended'
            const response =await axiosInstance.get(`/loadassignments/${status}`)
      
            setAssignmentHistory(response.data.assignment)  
        } catch (error) {
            console.log('error',error)
        }
    }
   const  handleDeleteAssignmentClick=async(id)=>{
    try {
        const response =await axiosInstance.delete(`/deleteAssignment/${id}`)
       toast.success('successfully deleted') 
        setDeleted(!deleted)
    } catch (error) {
        toast.error('failed to delete')
    }
   }
  return (
    <div style={{minHeight:'81vh'}}>
      <h2 className="text-2xl font-bold mb-4 px-5 text-center">Assignment History</h2>

      <div className="flex flex-wrap justify-center gap-4 px-5">
       {assignmentHistory.length!=0? assignmentHistory?.map((historyItem, index) => (
          <div
            className="bg-purple-200 rounded-md overflow-hidden shadow-md w-64 max-w-xs cursor-pointer transition-transform duration-300 hover:scale-105"
            key={index}
          >
            <Scrollbars style={{ height: 220 }}>
              <div className="px-6 py-4 h-auto">
                <div className="font-bold text-xl mb-2">{historyItem?.name}</div>
                <p className="text-gray-600 text-sm mb-2">
                Constraints:
                <ul className="list-disc ml-6">
                  {historyItem?.constraints.map((constraint, constraintIndex) => (
                      <li key={constraintIndex}>{constraint}</li>
                      ))}
                </ul>
              </p>
                      <p className="text-gray-600 text-sm mb-2">Subject: {historyItem?.subject}</p>
                <p className="text-gray-600 text-sm mb-2">End Date: {historyItem?.endDate}</p>
              </div>
            </Scrollbars>
            <div className="flex justify-end px-6 pb-4">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-full flex items-center hover:bg-red-600 transition-colors"
                onClick={() => handleDeleteAssignmentClick(historyItem?._id)}
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        )) : <div style={{paddingTop:'100px', fontSize:'28px',}}> <h1 >No History</h1></div>
        }
      </div>
    </div>
  );
};

export default AssignmentHistory;
