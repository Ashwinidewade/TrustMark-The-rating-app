// StoreList.tsx
import React, { useState, useEffect } from 'react';
import './StoreList.css';

interface StoreListProps {
  searchQuery?: string;
  minRating?: number;
  maxRating?: number;
  nameFilter?: string;       // ✅ Added
  addressFilter?: string;    // ✅ Added
}

const StoreList: React.FC<StoreListProps> = ({
  searchQuery = '',
  minRating = 0,
  maxRating = 5,
  nameFilter = '',
  addressFilter = '',
}) => {
  const [stores, setStores] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        // Replace with real API call
        const data = [
          { id: 1, name: 'Store 1', address: 'City A', rating: 4.5 },
          { id: 2, name: 'Store 2', address: 'City B', rating: 4.0 },
        ];

        // Simple filtering
        const filtered = data.filter((store) => {
          const matchesName = store.name
            .toLowerCase()
            .includes(nameFilter.toLowerCase());
          const matchesAddress = store.address
            .toLowerCase()
            .includes(addressFilter.toLowerCase());
          return matchesName && matchesAddress;
        });

        setStores(filtered);
        setTotal(filtered.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStores();
  }, [searchQuery, minRating, maxRating, nameFilter, addressFilter, page, limit]);

  return (
    <div className="store-list">
      <h2>Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            {store.name} - {store.address} - {store.rating}⭐
          </li>
        ))}
      </ul>
      <p>Total Stores: {total}</p>
    </div>
  );
};

export default StoreList;
