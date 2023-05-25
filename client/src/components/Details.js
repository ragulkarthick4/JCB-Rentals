import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const Details = () => {
  const location=useLocation()
  const { id } = location.state;
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin");
      const jsonData = await response.json();
      setData(jsonData.data);
      console.log("value")
      console.log(jsonData);
    } catch (error) {
      console.log('Error:', error);
    }
  };
  useEffect(()=>{
    getData();
  },[]);
  const Selecteditem=data.find(item=>item._id===id);
  return (
    <div>
      <h1>Details Page</h1>
      {
        Selecteditem &&(
          <div>
          <img src={`data:image/png;base64,${Selecteditem.image}`} 
          alt="Item"
          style={{maxWidth:'200px',maxHeight:'200px'}} /> 
          <p>Name: {Selecteditem.name}</p>
          <p>Model: {Selecteditem.model}</p>
          <p>Year: {Selecteditem.year}</p>
          <p>Location: {Selecteditem.place}</p>
          </div>
        )
      }
    </div>
  );
};

export default Details;
