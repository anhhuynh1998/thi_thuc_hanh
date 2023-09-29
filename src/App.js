
import './App.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes } from 'react-router-dom';
import TourList from './conponents/tour/TourList';
import Navbar from './conponents/layout/Navbar';
import TourDetail from './conponents/tour/TourDetail';
import CreateTourForm from './conponents/tour/CreateTour';
import EditTour from './conponents/tour/editTour';


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/' element={<TourList />} />
    <Route path='/tour/list' element={<TourList />} />
    <Route path='/tour/detail/:tourId' element={<TourDetail />} />
    <Route path='/tour/create' element={<CreateTourForm />} />
    {/* <Route path='/tour/edit' element={<CreateTourForm />} /> */}
    <Route path='/tour/edit/:tourId' element={<EditTour />} />
    

    </Routes>
    </>
  );
}

export default App;