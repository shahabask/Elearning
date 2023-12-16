import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/adminAxios'
import AddPlanModal from './modal/AddPlanModal'
import PlanCard from './cards/PlanCard'
import EditPlan from './modal/EditPlan'

function Subscription() {

    const columns = [
        {field: '_id',headerName: 'User Id',width: 160,}, 
        { field: 'firstName', headerName: 'Name', width: 130},
        {field:'mode',headerName:'Plan',width:130},
        {
          field: 'endDate',
          headerName: 'EndDate',
          width: 180,
          renderCell: (params) => {
            const endDateString = params.row.endDate; // Assuming endDate is a string in ISO 8601 format
            const endDateObject = new Date(endDateString);
      
            const formattedEndDate = endDateObject.toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
      
            return <div>{formattedEndDate}</div>;
          },
        },
        // { field: 'subCategory', headerName: 'Subcategory', width: 130},
        // { field: 'categoryName', headerName: 'Category', width: 130},
        // { field: 'tutor', headerName: 'Tutor', width: 130},
        // {
        //   headerName: 'Videos',
        //   field: 'videos', // The field itself doesn't matter here
        //   width: 130,
        //   valueGetter: (params) => params.row.videos.length, // Get the length of the 'videos' array
        // },
        // { field: 'isActive', headerName: 'Active', width: 130 ,renderCell: (params) => (
        //   <div className={`pill ${params.row.isActive ? 'active': 'inactive' }`}>
        //   {params.row.isActive ? 'Active' : 'Inactive'}
        // </div>
        // ),},
        // {
        //   field: 'action',
        //   headerName: 'Action',
        //   width: 100,  
        //   renderCell: (params) => {  return(
            
        //     <button className={`custom-button${params.row.isActive ?'-active': '-inactive'}`} onClick={(e) => handleBlockClick(e,params.row._id,params.row.isActive)}>
        //       {params.row.isActive ?<FaLock size={18} /> :  <FaUnlock size={18} /> }
        //     </button >
        //   )},
        // }
        
      ]
    const [rows,setRows]=useState([])
    const [plans,setPlans]=useState([])
      useEffect(()=>{
        fetchSubscribers()
      },[])
    const   fetchSubscribers=async()=>{
         const response= await axiosInstance.get('/loadSubscribers')
  
         setRows([...response.data.subscribers])
         setPlans([...response.data.plans])
    
    }
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isEditPlanModalOpen, setEditPlanModalOpen] = useState(false);
    const [isAddPlanModalOpen, setAddPlanModalOpen] = useState(false);

    const closeEditPlanModal=()=>{
      setEditPlanModalOpen(false)
    }
    const openEditPlanModal = (plan) => {
      setSelectedPlan(plan);
      setEditPlanModalOpen(true);
    };
    const openAddPlanModal = () => {
      setAddPlanModalOpen(true);
    };
  
    const closeAddPlanModal = () => {
      setAddPlanModalOpen(false);
    };
  return (
    <div className=" mx-auto py-6 px-4" style={{ minHeight: "90vh", backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
    <div className="flex justify-between">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={openAddPlanModal}
      >
        Add Plans
      </button>
    </div>
    <div className="text-2xl font-bold mb-4">Subscribers</div>
    <div className="bg-white rounded shadow-lg">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        checkboxSelection
      />
    </div>
    


    <div className=' lg:flex'>
    {plans.map((plan, index) => (
  <PlanCard plan={plan} onEditClick={openEditPlanModal} key={index} />
))}
      
    </div>
    <AddPlanModal isOpen={isAddPlanModalOpen} onRequestClose={closeAddPlanModal} />
  
  
    <EditPlan isOpen={isEditPlanModalOpen} onRequestClose={closeEditPlanModal} plan={selectedPlan} />
  </div>
  
  )
}

export default Subscription