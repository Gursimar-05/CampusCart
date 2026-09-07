import { useState } from 'react'

function ListingType() {
  const [type, setType] = useState('Buy')

  return (
    <div className="listing-type">
      <button
        className={type === 'Buy' ? 'active' : ''}
        onClick={() => setType('Buy')}
      >
        Buy
      </button>

      <button
        className={type === 'Rent' ? 'active' : ''}
        onClick={() => setType('Rent')}
      >
        Rent
      </button>
    </div>
  )
}

export default ListingType