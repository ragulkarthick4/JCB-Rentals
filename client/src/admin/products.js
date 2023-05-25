import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Products() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [place, setPlace] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.productDetails) {
      const { name, image, model, year, place } = location.state.productDetails;
      setName(name);
      setImage(image);
      setModel(model);
      setYear(year);
      setPlace(place);
      setImagePreview(image);
    }
  }, [location.state]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const getImageNameFromURL = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  async function submit(e) {
    e.preventDefault();
    try {
      console.log(name);
      console.log(image);
      alert('Submitted Successfully');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('model', model);
      formData.append('year', year);
      formData.append('place', place);

      let url = 'http://localhost:5000/admin/admin';
      let method = 'POST';

      if (location.state && location.state.productDetails) {
        const { _id } = location.state.productDetails;
        url = `http://localhost:5000/admin/update/product/${_id}`;
        method = 'PUT';
      }

      await fetch(url, {
        body:formData,
        method:method
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data === 'done') {
            navigate('/')
          }
        });
    } catch (e) {
      console.log(e);
    }
  }


  const getData = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin');
      const jsonData = await response.json();

      let productDetails = jsonData;
      if (location.state && location.state.productDetails) {
        const { id } = location.state.productDetails;
        productDetails = productDetails.map((product) =>
          product.id === id ? location.state.productDetails : product
        );
      }
      navigate('/productlist', { state: { productDetails: productDetails } });
    } catch (error) {
      console.log('Error:', error);
    }
  };


  return (
    <div>
      <Container>
        <Button variant="primary" type="button" onClick={getData}>
          Show Details
        </Button>
        <Row className="vh-100 d-flex align-items-center justify-content-center">
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Car name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Innova"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label> &nbsp;
                {imagePreview && (
                  <img src={imagePreview} alt="Selected" style={{ width: '100px', height: 'auto' }} />
                )}
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Car model</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="2.4 GX MT 7STR"
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="2023"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  value={place}
                  onChange={(e) => {
                    setPlace(e.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="primary" type="button" onClick={submit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
