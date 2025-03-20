import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        resume:[],
    },
    reducers:{
        //actions
        setAuthUser:(state, action) => {
            state.user = action.payload;
        },
        setAuthResume:(state, action) => {
            state.resume = action.payload;
        }
    }
})

export const {setAuthUser, setAuthResume} = authSlice.actions;
export default authSlice.reducer;