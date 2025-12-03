import { configureStore } from "@reduxjs/toolkit";
import  contactReducer  from "../auth/contactSlice";

export const store = configureStore({
    reducer : contactReducer
})