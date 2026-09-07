function ListingCard({ title, description, price, type, emoji }) {
  return (
    <div className="listing-card">
      <div className="listing-image">{emoji}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <strong>₹{price}</strong>

      <span>{type}</span>
    </div>
  )
}

export default ListingCard