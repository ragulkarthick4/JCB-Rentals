import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../css/home.css';
import SearchBar from './searchbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [data, setData] = useState([]);
  const [val, setVal] = useState(null);
  const navigate=useNavigate();
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin");
      const jsonData = await response.json();
      setData(jsonData.data);
      console.log(jsonData);
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const handleItemClick = (id,name) => {
    navigate(`/${name}`,{state:{id}});
  };

  const handleSearch = (selectedOption) => {
    console.log(selectedOption);
    setVal(selectedOption.value);
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredData = (val==="all location" || !val) ? data : data.filter((item) => item.place === val);
  return (
    <div>
      <div className="search-container">
        <div className="left-content">{val && <p>Showing results for {val}</p>}</div>
        <div className="right-content">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <Container>
        <Row>
          {filteredData.length === 0 ? (
            <Col>
              <p>No results found.</p>
            </Col>
          ) :(
            filteredData.map((item, index) => (
              <Col key={item._id || index} md={3} sm={6} xs={12} className="image-column">
                <Card className="card">
    
                    <Card.Img 
                    variant="top" 
                    src={`data:image/png;base64,${item.image}`} 
                    alt={item.name}
                    onClick={() => handleItemClick(item._id || index,item.name)}
                    style={{ cursor: 'pointer' }}
                    />
          
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.model} &nbsp; {item.year}
                    </Card.Text>
                    <Card.Text>{item.place}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}
