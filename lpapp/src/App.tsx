import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MainNavbar } from './components';
import { Route, Routes } from 'react-router-dom';
import {StorePage} from './pages';
import FAQ from './pages/FAQ';



function App() {
  return (
    <div>
      <header>
        <MainNavbar />
        <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/stores' element={<StorePage/>} />
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
