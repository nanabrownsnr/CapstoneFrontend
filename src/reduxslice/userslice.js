import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const initialState = {
    loginstatus:'',
    username:sessionStorage.getItem('username') || '',
    registerstatus:'failure',
    isUserLoggedIn:false,
    user:{'username':'','email':'', password:''}
}


export const loginUser = createAsyncThunk('login/User',async(user)=>{

    let response = await fetch(`http://localhost:9000/users/${user.username}`)
    let fetchuser = await response.json()
    if(fetchuser && fetchuser[0].password === user.password)
        return Promise.resolve(fetchuser[0].username)
    return Promise.reject('error')
})

export const fetchUserByUsername = createAsyncThunk('fetch/User',async(username)=>{
    let response = await fetch(`http://localhost:9000/users/${username}`)
    return  response.json()

})

export const registerUser = createAsyncThunk('register/user', async(user)=>{
   let response =  await fetch(`http://localhost:9000/users`,{
        method:'POST',
        body: JSON.stringify(user),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    let data = await response.json();
    if(data !== null || data !== undefined)
        return Promise.resolve('success')
    return Promise.reject('failure')
})

const userslice = createSlice({
    name:'userslice',
    initialState,
    reducers:{
        
        logoutUser:(state, action)=>{
            sessionStorage.removeItem('username')
            state.loginstatus = 'failure'
            state.username=''

            
        },
        changeRegisterStatus:(state)=>{
            state.registerstatus='failure';
        }
    },
    extraReducers(builder){
        builder
        .addCase(loginUser.fulfilled,(state, action)=>{

            state.loginstatus = 'success';
            state.username = action.payload
            state.isUserLoggedIn= true
         
            sessionStorage.setItem('username', state.username)
        })
        .addCase(loginUser.rejected,(state, action)=>{
            state.loginstatus = 'failure';
            state.username = ''

            state.isUserLoggedIn= false
        })
        .addCase(registerUser.fulfilled,(state, action)=>{
            state.registerstatus = 'success';
        })
        .addCase(registerUser.rejected,(state, action)=>{
            state.registerstatus = 'failure';
        })
        .addCase(fetchUserByUsername.fulfilled, (state, action)=>{
            state.user = action.payload[0]
        })
    }
})

export let {logoutUser, changeRegisterStatus} = userslice.actions

export default userslice.reducer;