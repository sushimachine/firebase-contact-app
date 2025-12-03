import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseService from "../firebase/firebaseService";

export const fetchContactsAsync = createAsyncThunk(
  'contact/fetchContacts', 
  
  
  async () => {
    
    const contacts = await firebaseService.getContacts();
    
    return contacts;
  }
);
const initialState = {
    contacts : [],
    searchterm : "",
    status : 'idle',
    error : null
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers : {
         addContact : (state, action) => {
            const contact = {
                id: action.payload.id, 
                name : action.payload.name,
                email : action.payload.email,
            }

            state.contacts.push(contact)
         },
         removeContact : (state, action) => {
            state.contacts = state.contacts.filter((contact) => contact.id !== action.payload)
         },
         editContact : (state, action) => {
            state.contacts = state.contacts.map((contact) => contact.id === action.payload.id ? {...contact, name : action.payload.name, email : action.payload.email} : contact)
         },
        searchterm : (state, action) => {
            state.searchterm = action.payload
         }
    },

    extraReducers : (builder) => {
        builder
            .addCase(fetchContactsAsync.pending, (state)  => {
                state.status = 'loading'
            })

            .addCase(fetchContactsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.contacts = action.payload
            })
            .addCase(fetchContactsAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.msg
            })
    }
})

export const {addContact, removeContact, editContact, searchterm} = contactSlice.actions
export default contactSlice.reducer