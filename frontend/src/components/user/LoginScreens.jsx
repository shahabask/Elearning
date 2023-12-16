import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import axiosInstance from "../../containers/utils/axios"

function LoginScreens() {

  // useEffect(async()=>{
  //   const user=await axiosInstance.get('/userDetails')
  // },[])
  return (
    <>
    <Outlet/>
    </>
  )
}

export default LoginScreens