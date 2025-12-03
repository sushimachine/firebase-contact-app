import React from "react";
import { useForm } from "react-hook-form";
import contactreducer, {editContact } from "../auth/contactSlice";
import firebaseService from "../firebase/firebaseService";
import { useDispatch } from "react-redux";

function ModalEdit({info, closeModal}){
    const {register, handleSubmit, reset} = useForm();
    const dispatch = useDispatch();
    const editC = async (data) => {
        try{
            if(!data){
                console.log("please fill the field")                
            }

            const update = await firebaseService.updateContact(info.id, {
                name : data.name,
                email : data.email
            });
            if(update){
                dispatch(editContact({id : info.id, ...data}))
            }
            reset();
            closeModal();
        }
        catch (error) {
            console.log("Error while updating contact:", error);
        }

    }
    return (
            <form onSubmit={handleSubmit(editC)} className="h-[250px] w-1/2 top-20 m-4 gap-3 fixed inset-0 z-[9999] bg-white space-y-1 flex flex-col">
                <div className="m-4 flex flex-col top-4">
                    <label htmlFor="username">Name</label>
                    <input type="text" 
                    id="username"
                    className="border-2 px-2 py-1"
                    defaultValue={info.name}
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
                    defaultValue={info.email}
                    {...register("email", {
                        required : true, 
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                </div>
                 <button type="submit" className="h-[51px] w-[100px] bg-amber-400 border-2 bottom-2 right-2 rounded-lg absolute">
                    Update Conatcts
                 </button>
            </form>
    )
}

export default ModalEdit