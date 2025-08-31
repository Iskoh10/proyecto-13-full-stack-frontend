import { useState } from 'react';
import updateProductRating from '../service/updateProductRating';

const useRatings = (setProducts, showToast, user) => {
  const [ratings, setRatings] = useState({});

  const handleRatingChange = async (productId, value) => {
    try {
      await updateProductRating(productId, value, user._id);

      setRatings((prev) => ({
        ...prev,
        [productId]: value
      }));

      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod._id === productId
            ? {
                ...prod,
                ratings: [
                  ...prod.ratings.filter(
                    (r) => String(r.userId) !== String(user._id)
                  ),
                  { userId: user._id, value }
                ]
              }
            : prod
        )
      );
    } catch (error) {
      showToast({
        title: 'No se pudo actualizar la valoración',
        description: error.message || 'Inténtalo de nuevo más tarde.',
        status: 'error'
      });
    }
  };
  return { ratings, setRatings, handleRatingChange };
};

export default useRatings;
