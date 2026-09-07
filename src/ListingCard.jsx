function ListingCard({
  title,
  description,
  price,
  type,
  category,
  image,
  seller,
  location,
  onViewDetails
}) {
  return (
    <div className="listing-card">

      <div className="listing-image-container">
        <img
          src={image}
          alt={title}
          className="listing-image"
        />

        <span className="category-badge">
          {category}
        </span>
      </div>

      <div className="listing-content">

        <h3>{title}</h3>

        <p className="listing-description">
          {description}
        </p>

        <div className="listing-price-row">
          <strong>₹{price}</strong>

          <span className={`type-badge ${type.toLowerCase()}`}>
            {type}
          </span>
        </div>

        <div className="seller-info">
          <span>👤 {seller}</span>
          <span>📍 {location}</span>
        </div>

        <button
          className="details-button"
          onClick={() =>
            onViewDetails({
              title,
              description,
              price,
              type,
              category,
              image,
              seller,
              location
            })
          }
        >
          View Details →
        </button>

      </div>
    </div>
  )
}

export default ListingCard