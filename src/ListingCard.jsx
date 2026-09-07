function ListingCard({ title, description, price, type, emoji, onViewDetails }) {
  return (
    <div className="listing-card">
      <div className="listing-image">{emoji}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <strong>₹{price}</strong>

      <span>{type}</span>

      <button
        className="details-button"
        onClick={() =>
          onViewDetails({ title, description, price, type, emoji })
        }
      >
        View Details
      </button>
    </div>
  )
}

export default ListingCard