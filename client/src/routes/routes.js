import React from 'react'
import Home from '../components/Home';
import Products from '../admin/products';
import Details from '../components/Details';
import {Routes,Route} from 'react-router-dom'
import Navb from '../components/navbar'
import Productlist from '../admin/productlist';
export default function Rout() {
  return (
    <>
    <Navb/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/:name" element={<Details/>}/>
    <Route path="/admin" element={<Products/>}/>
    <Route path="/productlist" element={<Productlist/>}/>
    </Routes>
    </>
  );
}
