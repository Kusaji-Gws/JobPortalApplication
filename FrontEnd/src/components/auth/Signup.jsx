import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const Signup = () => {
    const [input,setInput]=useState({
        fullname:"",
        email:"",
        phonenumber:"",
        password:"",
        role:"",
        file:""
    });
    const navigate=useNavigate();
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    const changeFileHandler=(e)=>{
        setInput({...input,file:e.target.files?.[0]});
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("fullname",input.fullname)
        formData.append("email",input.email);
        formData.append("phonenumber",input.phonenumber);
        formData.append("password",input.password);
        formData.append("role",input.role);
        if(input.file){
            formData.append("file",input.file);
        }
        try{
            const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true,
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);



        }
    }
    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border-gray-200 rounded-md p-4 my-14 '>
                    <h1 className='font-bold text-xl mb-5 '>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter Full Name"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="Email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Email"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phonenumber}
                            name="phonenumber"
                            onChange={changeEventHandler}
                            placeholder="Enter phone no.."
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="Password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="123456789"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center justify-between gap-5 my-2'>
                            <div className="flex items-center space-x-2">
                                <Input 
                                type='radio'
                                name='role'
                                value='student'
                                checked={input.role==='student'}
                                onChange={changeEventHandler}
                                className='cursor-pointer'
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                            <Input 
                                type='radio'
                                name='role'
                                value='recruiter'
                                checked={input.role==='recruiter'}
                                onChange={changeEventHandler}
                                className='cursor-pointer'
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                            <div className='flex items-center gap-2'>
                                <Label>Profile</Label>
                                <Input
                                    accept='image/*'
                                    type='file'
                                    onChange={changeFileHandler}
                                    className='cursor-pointer'
                                />
                            </div>

                    </div>
                    <Button type="submit" className='w-full my-4 text-white bg-black'>Submit</Button>
                    <span>Already have an account? <Link to='/login' className='text-blue-700'>Login</Link> </span>
                </form>
            </div>
        </>
    )
}

export default Signup