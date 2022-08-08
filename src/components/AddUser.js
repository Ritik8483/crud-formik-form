import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { addNewUser, editUserId, getAllUser, updateUser } from '../slices/UserSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Formik,Form,Field,ErrorMessage } from 'formik';
import * as yup from "yup";

const AddUser = () => {
  const navigate=useNavigate();
  const disptach=useDispatch();
  const {id} =useParams();
  const [inputValues,setInputValues]=useState({
    name:'',
    phone:''
  });
  // const {name,phone}=inputValues;
  // const inputEvent=(event)=>{
  //   const name=event.target.name;
  //   const value=event.target.value;
  //   setInputValues((lastValues)=>{
  //     return{
  //       ...lastValues,
  //       [name]:value
  //     }
  //   })
  // }
  

  useEffect(()=>{
    disptach(editUserId(id));
  },[]);

  const editData=useSelector((state)=>state.userReducer.userId);

  useEffect(()=>{
    if(id && editData){
      setInputValues({...editData})
    }
    else{
      setInputValues('')
    }
  },[editData]);

  // const submitForm=(e)=>{
  //   e.preventDefault();
  //   if(inputValues.name==='' || inputValues.phone===''){
  //     alert('please enter name and phone number');
  //   }
  //   else if(inputValues.name===editData.name && inputValues.phone===editData.phone ){
  //     alert('creadentails are same');
  //   }
  //   else if(id && editData){
  //     disptach(updateUser({inputValues:inputValues,id:id}));
  //       disptach(getAllUser());  
  //     setTimeout(() => {
  //     toast.success('User edited successfully') 
  //       navigate('/');
  //     }, 200);
  //   }
  //   else{
  //     disptach(addNewUser(inputValues));
  //     disptach(getAllUser()); 
      
  //   setTimeout(() => {
  //     toast.success('User added successfully') 
  //     navigate('/');
  //   }, 200);
  //   }
  // }

  const formikInitialValues={
    name:  editData.name || "",
    phone: editData.phone || "" 
  }
  const handleSubmit=(values)=>{
    console.log('values',values);
    if(id && editData){
      disptach(updateUser({inputValues:values,id:id}));
        // disptach(getAllUser());  
      setTimeout(() => {
      toast.success('User edited successfully') 
        navigate('/');
      }, 200);
    }
    else{
      disptach(addNewUser(values));
      // disptach(getAllUser()); 
      
    setTimeout(() => {
      toast.success('User added successfully') 
      navigate('/');
    }, 200);
    }
  }

  const validation=yup.object().shape({
    name:yup.string().min(5,'Must be 5 characters or more').required('Name is required'),
    phone:yup.string().min(10,'Must be 10 characters').required('Phone number is Required'),
  })

  return (
    <div>
        {/* <div className='d-flex flex-column gap-3 justify-content-center align-items-center min-vh-100 bg-light'>
            <form className='d-flex flex-column gap-3 justify-content-center align-items-center w-50' onSubmit={submitForm}>
              {id ? <h2>Edit User {id}</h2> : <h2>Add User</h2>}
              <TextField type='text' name='name' value={name || ''} onChange={inputEvent} className='w-50' id="outlined-basic" label="Name" variant="outlined" />
              <TextField type='number' name='phone' value={phone || ''} onChange={inputEvent} className='w-50' id="outlined-basic" label="Phone number" variant="outlined" />
              <Button type='submit' className='w-50' variant="contained">Submit user</Button>
              <Button className='w-50' variant="outlined" onClick={()=>navigate('/')}>Homepage</Button>
            </form>
        </div> */}
        <Formik enableReinitialize='true' placeholder="true" initialValues={formikInitialValues} onSubmit={handleSubmit} validationSchema={validation} >
          <Form>
            <div className='d-flex flex-column gap-3 h-100 w-100 justify-content-center align-items-center min-vh-100 bg-light'>
              <Field placeholder='Enter your name' name='name' className='w-50' type='text' />
              <p><ErrorMessage name='name' /></p>

              <Field placeholder='Enter your phone number' name='phone' className='w-50' type='number' />
              <p><ErrorMessage name='phone' /></p>

              <Button type='submit' className='w-50' variant="contained">Submit user</Button>
              <Button className='w-50' variant="outlined" onClick={()=>navigate('/')}>Homepage</Button>
            </div>
          </Form>
        </Formik>
    </div>
  )
}

export default AddUser