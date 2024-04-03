import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router";
axios.defaults.withCredentials = true;

const initialState = {
    currentUser : false,
    error : null ,
    loading : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess : (state , action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure : (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getUser.fulfilled , (state , action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(getUser.pending , (state , action)=>{
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getUser.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const {signInStart , signInSuccess , signInFailure} = userSlice.actions;

export const getUser = createAsyncThunk('getUser' , async()=>{
    const res = await axios.get('/api/user' , {
        withCredentials : true
    }).catch(err => {return "error"});

    const data = await res.data;
    console.log(data);
    return data;
});

export default userSlice.reducer;