import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import '../css/plist.css'
const API_URL = "http://localhost:5000/admin";
const DELETE_URL = "http://localhost:5000/admin/delete/product";

export default function ProductList() {
  const navigate=useNavigate();
  const location = useLocation();
  const { state } = location;
  const { productDetails } = state;
  const [updatedProductDetails, setUpdatedProductDetails] = useState(productDetails);
  const styles = {
    tableHeader: {
      border: '1px solid black',
      padding: '8px',
      textAlign: 'center'
    },
    tableCell: {
      border: '1px solid black',
      padding: '8px',
    },
    image: {
      width: '50px',
      maxHeight: '50px',
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setUpdatedProductDetails(jsonData);
    } catch (error) {
      console.log('Error fetching product data', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${DELETE_URL}/${productId}`, {
        method: "delete"
      });

      if (response.ok) {
        console.log("Successfully deleted");
        fetchData();
      } else {
        console.log("Error deleting product");
      }
    } catch (error) {
      console.log('Error deleting product', error);
    }
  };

  const handleUpdate=(product)=>{
    navigate('/admin',{state:{productDetails:product}});
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <header>
        <h1>Car Details</h1>
      </header>
      <div className='body'>
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Image</th>
              <th style={styles.tableHeader}>Model</th>
              <th style={styles.tableHeader}>Year</th>
              <th style={styles.tableHeader}>Location</th>
              <th style={styles.tableHeader}>Update</th>
              <th style={styles.tableHeader}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {updatedProductDetails.data.map(({ _id, name, image, model, year, place }) => (
              <tr key={_id}>
                <td style={styles.tableCell}>{name}</td>
                <td style={styles.tableCell}><img style={styles.image} alt="" src={`data:image/png;base64,${image}`}></img></td>
                <td style={styles.tableCell}>{model}</td>
                <td style={styles.tableCell}>{year}</td>
                <td style={styles.tableCell}>{place}</td>
                <td style={styles.tableCell}><Button variant="success" type="button" onClick={()=>handleUpdate({_id,name,image:`data:image/png;base64,${image}`,model,year,place})}>Update</Button></td>
                <td style={styles.tableCell}><Button variant="danger" type="button" onClick={() => deleteProduct(_id)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


