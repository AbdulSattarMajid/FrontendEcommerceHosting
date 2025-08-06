const StarRating = ({ rating, size = 4, color = "text-yellow-400" }) => {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  // Full stars
  for (let i = 0; i < full; i++) {
    stars.push(
      <svg
        key={`full-${i}`}
        className={`w-${size} h-${size} ${color}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46 1.287 3.967c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.967-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18L9.05 2.927z" />
      </svg>
    );
  }

  // Half star
  if (hasHalf) {
    stars.push(
      <svg
        key="half"
        className={`w-${size} h-${size} ${color}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="lightgray" />
          </linearGradient>
        </defs>
        <path
          fill="url(#halfGradient)"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46 1.287 3.967c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.967-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18L9.05 2.927z"
        />
      </svg>
    );
  }

  // Empty stars
  for (let i = 0; i < empty; i++) {
    stars.push(
      <svg
        key={`empty-${i}`}
        className={`w-${size} h-${size} text-gray-300`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46 1.287 3.967c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.967-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18L9.05 2.927z" />
      </svg>
    );
  }

  return <div className="flex items-center space-x-0.5">{stars}</div>;
};

export default StarRating;
