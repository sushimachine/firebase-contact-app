import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addContact, editContact, searchterm } from "../auth/contactSlice";
import Modal from "./modal";


function contactForm() {

    const [input, setInput] = useState("");
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [search, useSearch] = useState("")

    

    return (
        <>
        <div className="bg-black flex flex-col items-center">
            <div className="h-4 w-1/2 m-2 p-5 rounded-lg bg-white flex justify-center items-center top-4 border-r-4">
                <img src="../public/image/firebaselogo.webp" alt="logo" className="h-fit w-4 m-1.5 object-fill"/>
                <p className="text-black font-bold ">Firebase Contact app</p>
            </div>

            <div className="h-7 w-51/100 flex justify-between">   
                <div className="h-full w-19/20 ml-2.5 flex">
                    <div className="h-full w-7 text-white flex justify-center items-center">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input 
                    className="h-full w-full p-1 border-none outline-none text-white"
                    type="text"
                    placeholder="Search Contacts"
                    onChange={(e) => {setInput(e.target.value); dispatch(searchterm(e.target.value))}}
                    />
                </div>                                                                                                                                                             
                <div className="h-full min-w-1/20 border-r-8 flex justify-center items-center bg-white"
                onClick={() => setVisible(true)}
>
                    <i className="fa-solid fa-plus"></i>
                </div>
            </div>
        </div>
        {visible && 
            <div className="h-full w-full flex justify-center mt-2">
                <Modal closeModal={()=>setVisible(false)}/>
            </div>
            }
        </>
    )
}

export default contactForm