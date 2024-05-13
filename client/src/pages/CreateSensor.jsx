import { useState } from 'react'
import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios';
import "./css/CreateSensor.css"

function CreateSensor() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isSuccess, setIsSuccess] = useState(false); // State variable for success message

  //axios implementation
  const onSubmit = async (data) => {
    try {
      // Send form data to backend API
      await axios.post('http://localhost:5000/v1/sensor/', {
        sensor_id: data.sensor_id,    
        value: data.value,
      });
      setIsSuccess(true); // Set success state to true
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  return (
    <>
      {isSubmitting && <div>Loading...</div>}
      <div className="container_c">
      {isSuccess && <div className='success'>Sensor successfully created!</div>} 
        <form className='form' method='POST' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="sensor_id">Sensor ID</label>
          <input placeholder='Enter your Sensor ID' {...register("sensor_id", { required: { value: true, message: "This field is required" } })} type='text' />
          {errors.sensor_id && <span className='red'>{errors.sensor_id.message}</span>}

          <label htmlFor="value">Value</label>
          <input placeholder='Enter your Sensor Value' {...register("value", { required: { value: true, message: "This field is required" } })} type='text' />
          {errors.value && <span className='red'>{errors.value.message}</span>}

          <input disabled={isSubmitting} type="submit" value="Submit" />
        </form>
      </div>
    </>
  )
}

export default CreateSensor
