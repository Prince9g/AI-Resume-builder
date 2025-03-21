import { createSlice } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
    },
    reducers:{
        //actions
        setAuthUser:(state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
          }
    }
})

export const {setAuthUser, setAuthResume, logoutUser} = authSlice.actions;
export default authSlice.reducer;