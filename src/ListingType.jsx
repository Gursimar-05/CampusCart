function ListingType({ selectedType, setSelectedType }) {
  return (
    <div className="listing-type">
      <button
        className={selectedType === 'ALL' ? 'active' : ''}
        onClick={() => setSelectedType('ALL')}
      >
        All
      </button>

      <button
        className={selectedType === 'BUY' ? 'active' : ''}
        onClick={() => setSelectedType('BUY')}
      >
        Buy
      </button>

      <button
        className={selectedType === 'RENT' ? 'active' : ''}
        onClick={() => setSelectedType('RENT')}
      >
        Rent
      </button>
    </div>
  )
}

export default ListingType