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

     <Hero search={search} setSearch={setSearch} />


      <ListingType
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <section className="listings-section">

        <div className="listings-heading">
          <div>
            <p className="section-label">CAMPUS MARKETPLACE</p>
            <h2>Fresh on Campus</h2>
            <p>
              Find what you need from students around you.
            </p>
          </div>

          <span>
            {listings.filter((listing) => {
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
            }).length}{' '}
            items
          </span>
        </div>

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
                image={listing.image}
                seller={listing.seller}
                location={listing.location}
                onViewDetails={setSelectedListing}
              />
            ))}

        </div>

      </section>

      {selectedListing && (
        <div className="modal-overlay">

          <div className="modal">

            <button
              className="modal-close"
              onClick={() => setSelectedListing(null)}
            >
              ×
            </button>

            <img
              src={selectedListing.image}
              alt={selectedListing.title}
              className="modal-image"
            />

            <h2>{selectedListing.title}</h2>

            <p>{selectedListing.description}</p>

            <div className="modal-price">
              ₹{selectedListing.price}
            </div>

            <span className="type-badge">
              {selectedListing.type}
            </span>

            <div className="modal-info">
              <p>
                👤 Seller: {selectedListing.seller}
              </p>

              <p>
                📍 Location: {selectedListing.location}
              </p>

              <p>
                📂 Category: {selectedListing.category}
              </p>
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
