import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice";
import testReducer from "./user/testSlice";

export const store = configureStore({
    reducer : {
        user : userReducer,
        theme : themeReducer,
        test : testReducer
    },
})