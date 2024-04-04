import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
    currentUser : false,
}

const testSlice = createSlice({
    name : 'test',
    initialState,
    reducers : {
    },
    extraReducers : (builder) => {
        builder.addCase(getUser.fulfilled , (state , action)=>{
            state.currentUser = action.payload;
        });

        builder.addCase(getUser.rejected , (state,action)=>{
            state.currentUser = action.payload;
        })
    }
});

export const {currentUser} = testSlice.actions;

export const getUser = createAsyncThunk('getUser' , async()=>{
    const res = await axios.get("/api/user" , {
        withCredentials : true
    }).catch(err => {return "error"});

    const data = await res.data;
    console.log(data);
    return data;
});

export default testSlice.reducer;