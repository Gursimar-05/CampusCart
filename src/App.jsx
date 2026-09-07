import './App.css'
import Navbar from './Navbar'
import Hero from './Hero'
import SearchBar from './SearchBar'
import ListingType from './ListingType'
import Categories from './Categories'
import ListingCard from './ListingCard'
import listings from './listings'
import { useState } from 'react'

function App() {
  const [selectedType, setSelectedType] = useState('ALL')
  const [search, setSearch] = useState('')
  const [selectedListing, setSelectedListing] = useState(null)
  return (
    <div>
      <Navbar />

      <Hero />

<SearchBar
  search={search}
  setSearch={setSearch}
/>

      <ListingType
  selectedType={selectedType}
  setSelectedType={setSelectedType}
/>

      <Categories />

      <div className="listing-container">
  {listings
  .filter((listing) => {
    const matchesType =
      selectedType === 'ALL' || listing.type === selectedType

    const matchesSearch =
      listing.title.toLowerCase().includes(search.toLowerCase())

    return matchesType && matchesSearch
  })
  .map((listing) => (
    <ListingCard
      key={listing.title}
      title={listing.title}
      description={listing.description}
      price={listing.price}
      type={listing.type}
      emoji={listing.emoji}
      onViewDetails={setSelectedListing}
    />
  ))}
      </div>
      {selectedListing && (
  <div className="modal-overlay">
    <div className="modal">
      <button
        className="modal-close"
        onClick={() => setSelectedListing(null)}
      >
        ×
      </button>

      <div className="listing-image">
        {selectedListing.emoji}
      </div>

      <h2>{selectedListing.title}</h2>

      <p>{selectedListing.description}</p>

      <strong>₹{selectedListing.price}</strong>

      <span>{selectedListing.type}</span>

      <button className="contact-button">
        Contact Seller
      </button>
    </div>
  </div>
)}
    </div>
  )
}

export default App