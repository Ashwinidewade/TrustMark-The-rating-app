import React, { useState } from 'react';
import { storesService } from '../../../services/stores.service';
import StoreList from '../../stores/StoreList/StoreList';
import './UserDashboard.css';

const UserDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [addressFilter, setAddressFilter] = useState('');

  return (
    <div className="dashboard">
      <h1>Welcome to Store Ratings</h1>
      
      <div className="search-filters">
        <div className="filter-item">
          <label htmlFor="search" className="form-label">Search by Name</label>
          <input
            type="text"
            id="search"
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stores..."
          />
        </div>
        
        <div className="filter-item">
          <label htmlFor="address" className="form-label">Filter by Address</label>
          <input
            type="text"
            id="address"
            className="form-input"
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            placeholder="Filter by address..."
          />
        </div>
      </div>
      
      <StoreList 
        nameFilter={searchTerm} 
        addressFilter={addressFilter} 
      />
    </div>
  );
};

export default UserDashboard;


