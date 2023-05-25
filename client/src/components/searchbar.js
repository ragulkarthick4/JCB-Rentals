import React, { useState } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/esm/Button';
import '../css/sbar.css';

const SearchBar = ({onSearch}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const optionValues = ['all location','krishnagiri','dharmapuri','salem','tirupatur'];
  const options = optionValues.map((value) => ({ value, label: value.charAt(0).toUpperCase() + value.slice(1) }));
  
  const handleChange = (selected) => {
    setSelectedOption(selected);
  };
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(selectedOption);
    }
  };
  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        className="select-field"
      />
      <Button className='btn' onClick={handleSearchClick} variant="primary">Search</Button>{' '}
    </div>
  );
};

export default SearchBar;
