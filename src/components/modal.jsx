import React from "react";
import { useForm } from "react-hook-form";
import contactreducer, {addContact } from "../auth/contactSlice";
import firebaseService from "../firebase/firebaseService";
import { useDispatch } from "react-redux";

function Modal({closeModal}){
    const {register, handleSubmit, reset} = useForm();
    const dispatch = useDispatch();
    const add = async (data) => {
        try{
            if(!data){
                console.log("the given fields are required to be filled")
                return;
            }
            else{
                const contactData = {
                name: data.name,
                email: data.email 
            };
                const userid = await firebaseService.createContact(contactData)
                if(userid){
                    dispatch(addContact({id :  userid, ...data}))
                }

                reset()
                closeModal()
            }
        }
        catch{
            console.log("the data needs to be filled")
        }
        }
    return (
            <form onSubmit={handleSubmit(add)} className="h-[250px] w-1/2 top-20 m-4 gap-3 fixed inset-0 z-[9999] bg-white space-y-1 flex flex-col">
                <div className="m-4 flex flex-col top-4">
                    <label htmlFor="username">Name</label>
                    <input type="text" 
                    id="username"
                    className="border-2 px-2 py-1"
                    {...register("name", {
                        required : true, 
                    }
                    )}
                    />
                </div>

                <div className="m-4 flex flex-col">
                    <label htmlFor="emailid">Email</label>
                    <input type="email" id="emailid"
                    className="border-2 px-2 py-1" 
                    {...register("email", {
                        required : true, 
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                </div>
                 <button type="submit" className="h-[31px] w-[100px] bg-amber-400 border-2 bottom-2 right-2 rounded-lg absolute">
                    Add
                 </button>
            </form>
    )
}

export default Modal