import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { storesService } from '../../../services/stores.service';
import { ratingsService } from '../../../services/ratings.service';
import RatingStars from '../../common/RatingStars/RatingStars';
import './StoreOwnerDashboard.css';

interface StoreRating {
  id: number;
  rating: number;
  comment: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
}

const StoreOwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [store, setStore] = useState<any>(null);
  const [ratings, setRatings] = useState<StoreRating[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoreData();
  }, [user]);

  const loadStoreData = async () => {
    try {
      // For simplicity, assuming a store owner has only one store
      const stores = await storesService.getStores();
      const userStore = stores.stores.find((s: any) => s.owner.id === user?.id);
      
      if (userStore) {
        setStore(userStore);
        setAverageRating(userStore.avgRating || 0);
        
        const storeRatings = await storesService.getStoreRatings(userStore.id);
        setRatings(storeRatings);
      }
    } catch (error) {
      console.error('Failed to load store data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!store) {
    return <div>No store found for this account.</div>;
  }

  return (
    <div className="dashboard">
      <h1>Store Owner Dashboard</h1>
      
      <div className="store-header">
        <h2>{store.name}</h2>
        <div className="store-info">
          <p>{store.address}</p>
          <p>{store.email}</p>
        </div>
        
        <div className="store-rating">
          <RatingStars rating={averageRating} size="large" />
          <span className="rating-text">({ratings.length} ratings)</span>
        </div>
      </div>
      
      <div className="ratings-section">
        <h3>Recent Ratings</h3>
        
        {ratings.length === 0 ? (
          <p>No ratings yet.</p>
        ) : (
          <div className="ratings-list">
            {ratings.map((rating: any) => (
              <div key={rating.id} className="rating-item">
                <div className="rating-header">
                  <RatingStars rating={rating.rating} size="small" />
                  <span className="rating-user">{rating.user.name}</span>
                  <span className="rating-date">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {rating.comment && (
                  <p className="rating-comment">{rating.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;


