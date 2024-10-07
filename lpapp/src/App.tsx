import React from 'react';
import './App.css';
import { MainNavbar } from './components';
import { Route, Routes } from 'react-router-dom';
import {StorePage} from './pages';
import FAQ from './pages/FAQ';
import { Store } from './pages/store/Store';
import SpiritStoreCreate from './pages/SpiritStoreCreate';
import SpencerStoreCreate from './pages/SpencerStoreCreate';



function App() {
  return (
    <div>
      <header>
        <MainNavbar />
        <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/stores' element={<StorePage/>} />
         <Route path='/stores/:store_number' element={<Store/>} />
         <Route path='/stores/spirit/create' element={<SpiritStoreCreate/>} />
         <Route path='/stores/spencer/create' element={<SpencerStoreCreate/>} />
         <Route path='/rm' element={<Contact/>} />
         <Route path='/faq' element={<FAQ/>} />
       </Routes>
      </header>
    </div>
  );
}

const Home = () => {
  return (
    <div>
        <h1>Home</h1>
    </div>
  )
}

const About = () => {
  return (
    <div>
        <h1>About</h1>
    </div>
  )
}

const Contact = () => {
  return (
    <div>
        <h1>Contact</h1>
    </div>
  )
}

export default App;
