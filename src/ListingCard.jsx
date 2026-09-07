function ListingCard({ title, description, price, type, emoji }) {
  function handleDetails() {
    alert(
      `${title}\n\n${description}\nPrice: ₹${price}\nType: ${type}`
    )
  }

  return (
    <div className="listing-card">
      <div className="listing-image">{emoji}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <strong>₹{price}</strong>

      <span>{type}</span>

      <button className="details-button" onClick={handleDetails}>
        View Details
      </button>
    </div>
  )
}

export default ListingCard