/* eslint-disable default-case */
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { changeRegisterStatus, loginUser } from '../reduxslice/userslice';
import {loginAdmin } from '../reduxslice/adminslice';

const initialState = {
  "username":"admin",
  "password":"admin"
}
export default function Login({setStatus, setusername}) {
// Below user and error are used internally by Login.js to display the UI
  const [user, setuser] = useState(initialState)
  const [error, setError] = useState()
  // routes
  let navigate = useNavigate()

  // dispatch us used to call the actions
  let dispatch = useDispatch()
  // is used to get the current state from the store
  let statusU = useSelector((state)=> state.userreducer.loginstatus)
  let statusA = useSelector((state)=> state.adminreducer.loginstatus)
  
  

  useEffect(()=>{
		// dispatch(changeRegisterStatus())
		if(statusU === 'success'){
			//console.log('1',status)
			navigate('/')
		}
		else if(statusU === 'failure'){
			//console.log('2',status)
			setError('Invalid Credentials')
		}
			
  },[navigate, statusU])

  useEffect(()=>{
	// dispatch(changeRegisterStatus())
	if(statusA === 'success'){
		//console.log('1',status)
		navigate('/updatemovie')
	}
	else if(statusA === 'failure'){
		//console.log('2',status)
		setError('Invalid Credentials')
	}
		
},[navigate, statusA])
  
 
  const handleSubmit = (event)=>{
    event.preventDefault();
	const logintype = document.querySelector(`select[name="logintype"]`).value
	
	if (logintype==='User')
	{dispatch(loginUser(user))}
	else if (logintype==='Admin')
	{dispatch(loginAdmin(user)) }

    }
    
  return (
    <div className="container">
		
		<h1>Login</h1>
		<select name="logintype">
			<option value="Admin">Admin</option>
			<option value="User">User</option>
			
		</select>
	
    	<p style={{color:'red'}}>{error && error}</p>
		<form>
		<div className="mb-3">
			<label htmlFor="formGroupExampleInput2" className="form-label">User Name
				</label> <input type="text" className="form-control"
				name="username" value={user.username} onChange={(event)=>setuser({...user, [event.target.name]:event.target.value})}
				id="formGroupExampleInput2" placeholder="Username"/>
		</div>
		<div className="mb-3">
			<label htmlFor="formGroupExampleInput2" className="form-label">Password
				</label> <input type="password" className="form-control"
				name="password" value={user.password} onChange={(event)=>setuser({...user,[event.target.name]:event.target.value})}
				id="formGroupExampleInput2" placeholder="Password"/>
		</div>
		<button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
		</form>
	</div>
  )
}