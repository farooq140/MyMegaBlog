import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from "./store/authSlice"
import './App.css'
import {Header,Footer }from './components'

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{ setLoading(false) })
  },[])
  // const client = new Client();
  // client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
  // client.setEndpoint('http://localhost:8000/v1');
  // console.log(client,"okkkki");

  
  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
       <main>
        {/* TODO:  <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
