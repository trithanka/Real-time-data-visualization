import { Route,Routes } from 'react-router-dom'
import React from 'react'
import ViewSensor from '../src/pages/ViewSensor'
import CreateSensor from '../src/pages/CreateSensor'
import Navbar from './components/Navbar'
import LineG from "../src/pages/Line"
import DeleteSensor from './pages/DeleteSensor'


const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<ViewSensor/>} />
      <Route path="/create" element={<CreateSensor/>} />
      <Route path="/line" element={<LineG/>} />
      <Route path="/delete" element={<DeleteSensor/>} />
    </Routes>
    </>
  )
}

export default App

