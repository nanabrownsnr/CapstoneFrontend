import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const initialState = {
    loginstatus:'',
    username:sessionStorage.getItem('username') || '',
    registerstatus:'failure',
    isAdminLoggedIn:false,
    admin:{'username':'','email':'', password:''}
}

export const loginAdmin = createAsyncThunk('login/Admin',async(admin)=>{
    let response = await fetch(`http://localhost:9000/admins/${admin.username}`)
    let fetchadmin = await response.json()
    if(fetchadmin && fetchadmin[0].password === admin.password)
        return Promise.resolve(fetchadmin[0].username)
    return Promise.reject('error')
})

export const fetchAdminByUsername = createAsyncThunk('fetch/Admin',async(username)=>{
    let response = await fetch(`http://localhost:9000/admins/${username}`)
    return  response.json()

})


const adminslice = createSlice({
    name:'adminslice',
    initialState,
    reducers:{
        logoutUser:(state, action)=>{
            sessionStorage.removeItem('username')
            state.loginstatus = 'failure'
            state.username=''
            state.isAdminLoggedIn= false
        },
        changeRegisterStatus:(state)=>{
            state.registerstatus='failure';
        }
    },
    extraReducers(builder){
        builder
        .addCase(loginAdmin.fulfilled,(state, action)=>{
            state.loginstatus = 'success';
            state.username = action.payload
            state.isAdminLoggedIn = true
            sessionStorage.setItem('username', state.username)
        })
        .addCase(loginAdmin.rejected,(state, action)=>{
            state.loginstatus = 'failure';
            state.username = ''
            state.isAdminLoggedIn= false
        })
        .addCase(fetchAdminByUsername.fulfilled, (state, action)=>{
            state.user = action.payload[0]
        })
    }
})

export let {logoutUser, changeRegisterStatus} = adminslice.actions

export default adminslice.reducer;