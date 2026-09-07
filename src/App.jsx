import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Hero from './Hero'
import SearchBar from './SearchBar'
import ListingType from './ListingType'
import Categories from './Categories'
import ListingCard from './ListingCard'
import listings from './listings'

function App() {
  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
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

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="listing-container">
        {listings
          .filter((listing) => {
            const matchesType =
              selectedType === 'ALL' ||
              listing.type === selectedType

            const matchesCategory =
              selectedCategory === 'ALL' ||
              listing.category === selectedCategory

            const matchesSearch =
              listing.title
                .toLowerCase()
                .includes(search.toLowerCase())

            return (
              matchesType &&
              matchesCategory &&
              matchesSearch
            )
          })
          .map((listing) => (
            <ListingCard
              key={listing.title}
              title={listing.title}
              description={listing.description}
              price={listing.price}
              type={listing.type}
              category={listing.category}
              emoji={listing.emoji}
              seller={listing.seller}
              location={listing.location}
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

            <div className="modal-info">
              <p>📂 Category: {selectedListing.category}</p>
              <p>👤 Seller: {selectedListing.seller}</p>
              <p>📍 Location: {selectedListing.location}</p>
            </div>

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

