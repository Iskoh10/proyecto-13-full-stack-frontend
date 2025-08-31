const getAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;

  const total = ratings.reduce((acc, rating) => acc + (rating.value || 0), 0);
  return (total / ratings.length).toFixed(1);
};

export default getAverageRating;
