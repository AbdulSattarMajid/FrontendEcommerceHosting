const StarRating = ({ rating }) => {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < full; i++) {
    stars.push(
      <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46 1.287 3.967c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.967-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18L9.05 2.927z" />
      </svg>
    );
  }

  if (half) {
    stars.push(
      <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 15.27L16.18 18l-1.64-5.02L18 9.24l-5.19-.38L10 4v11.27z" />
      </svg>
    );
  }

  const empty = 5 - stars.length;
  for (let i = 0; i < empty; i++) {
    stars.push(
      <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 15.27L16.18 18l-1.64-5.02L18 9.24l-5.19-.38L10 4 7.19 8.86 2 9.24l3.46 3.74L3.82 18z" />
      </svg>
    );
  }

  return <div className="flex items-center space-x-0.5">{stars}</div>;
};

export default StarRating;
