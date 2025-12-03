import React, { useEffect } from "react";
import { store } from "../store/store";
import contactReducer, { removeContact, editContact, searchterm} from "../auth/contactSlice";
import firebaseService from "../firebase/firebaseService";
import {useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import { fetchContactsAsync } from '../auth/contactSlice';

function Contacts(){
    // const [contacts, setContacts] = useState([]);
    const [check, setCheck] = useState(false)
    const [info, setInfo] = useState([])
    const dispatch = useDispatch()
    const contacts = useSelector(state => state.contacts)
    const searchterm = useSelector(state => state.searchterm)
    const status = useSelector(state => state.status)

    const deleteContact = async (id) => {
        const cnfirm = await firebaseService.deleteContact(id)

        if(cnfirm){
            dispatch(removeContact(id))
        }
    }

    useEffect(() => {
        dispatch(fetchContactsAsync());
    }, [])

    if(status === 'loading'){
        return <div className="text-white left-20">Loading...</div>
    }
    const filteredContacts = contacts.filter((contact) => 
        contact.name.toLowerCase().startsWith(searchterm.toLowerCase())
    );


    return (
        <div>
        {filteredContacts.length > 0 ? (
            <ul className="h-screen w-screen m-2 list-none flex flex-col items-center">
            {filteredContacts.map((contact) => (
                <li className="h-15 w-1/2 m-2 flex justify-around items-center bg-[#FFEAAE] rounded-lg"
                key={contact.id}>
                    <div className="h-9/10 w-1/4 m-4">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div className="h-9/10 w-1/2 flex flex-col">
                        <p className="font-bold">{contact.name}</p>
                        <p className="text-[14px]">{contact.email}</p>
                    </div>
                    <div className="h-9/10 w-1/4 p-4 flex flex-row">
                        <div className="mr-3" onClick={() => {
                            setCheck(true);
                            setInfo({ id: contact.id, name: contact.name, email: contact.email });
                            }}
                            >
                            <i class="fa-solid fa-user-pen"></i>
                        </div>
                        <div onClick={() => deleteContact(contact.id)}>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
        ) : (
            <div className="flex justify-center items-center">
                 <div className="flex m-6 justify-center items-center">
                    <img src="/image/nocontacts.png" alt="img" className="h-15 m-4"/>
                    <p className="text-2xl text-white">No contacts found</p>
                </div>
            </div>
        )}

        {check && info && <ModalEdit info={info} closeModal={() => {
            setCheck(false);
            setInfo(null);
        }} />}
        </div>
    )
}

export default Contacts;