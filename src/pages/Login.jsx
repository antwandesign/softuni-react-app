import LoginForm from "../components/Auth/LoginForm"

import {useEffect} from "react"
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms.js";
import {useNavigate } from "react-router-dom"


export default function LoginPage() {

  let navigate = useNavigate()

  const user = useRecoilValue(userState)
  useEffect(()=>{
    if(user.jwt){
      navigate("/")
    }
  },[user])
 
  return (
    <LoginForm/>
  )
}
