
import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Hero from './Hero'
import ListingType from './ListingType'
import Categories from './Categories'
import ListingCard from './ListingCard'
import listingsData from './listings'

function App() {
  const [listings, setListings] = useState(listingsData)

  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [search, setSearch] = useState('')

  const [selectedListing, setSelectedListing] = useState(null)
  const [showSellForm, setShowSellForm] = useState(false)

  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    price: '',
    type: 'BUY',
    category: 'Books',
    seller: 'You',
    location: 'Your Block',
    image: ''
  })

  function handleInputChange(event) {
    const { name, value } = event.target

    setNewListing({
      ...newListing,
      [name]: value
    })
  }

  function handleImageChange(event) {
    const file = event.target.files[0]

    if (file) {
      const imageURL = URL.createObjectURL(file)

      setNewListing({
        ...newListing,
        image: imageURL
      })
    }
  }

  function handleAddListing(event) {
    event.preventDefault()

    if (
      !newListing.title ||
      !newListing.description ||
      !newListing.price ||
      !newListing.image
    ) {
      return
    }

    const listing = {
      ...newListing,
      id: Date.now()
    }

    setListings([...listings, listing])

    setNewListing({
      title: '',
      description: '',
      price: '',
      type: 'BUY',
      category: 'Books',
      seller: 'You',
      location: 'Your Block',
      image: ''
    })

    setShowSellForm(false)
  }

  const filteredListings = listings.filter((listing) => {
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

  return (
    <div>
      <Navbar />

      <Hero
        search={search}
        setSearch={setSearch}
      />

      <div className="marketplace-controls">

        <ListingType
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

      </div>

      <section className="listings-section">

        <div className="listings-heading">

          <div>
            <p className="section-label">
              CAMPUS MARKETPLACE
            </p>

            <h2>Fresh on Campus</h2>

            <p>
              Find what you need from students around you.
            </p>
          </div>

          <button
            className="sell-button"
            onClick={() => setShowSellForm(true)}
          >
            + Sell an Item
          </button>

        </div>

        <div className="listing-container">

          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
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
            ))
          ) : (
            <div className="no-results">
              <h3>No listings found</h3>
              <p>
                Try another search or category.
              </p>
            </div>
          )}

        </div>

      </section>

      {/* SELL ITEM MODAL */}

      {showSellForm && (
        <div className="modal-overlay">

          <div className="modal sell-modal">

            <button
              className="modal-close"
              onClick={() => setShowSellForm(false)}
            >
              ×
            </button>

            <h2>Sell an Item</h2>

            <p>
              Add something you'd like to sell or rent
              on campus.
            </p>

            <form onSubmit={handleAddListing}>

              <input
                type="text"
                name="title"
                placeholder="Item name"
                value={newListing.title}
                onChange={handleInputChange}
                required
              />

              <textarea
                name="description"
                placeholder="Describe your item"
                value={newListing.description}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="price"
                placeholder="Price"
                value={newListing.price}
                onChange={handleInputChange}
                required
              />

              <select
                name="type"
                value={newListing.type}
                onChange={handleInputChange}
              >
                <option value="BUY">BUY</option>
                <option value="RENT">RENT</option>
              </select>

              <select
                name="category"
                value={newListing.category}
                onChange={handleInputChange}
              >
                <option value="Books">Books</option>
                <option value="Electronics">
                  Electronics
                </option>
                <option value="Furniture">
                  Furniture
                </option>
              </select>

              <input
                type="text"
                name="location"
                placeholder="Your campus location"
                value={newListing.location}
                onChange={handleInputChange}
                required
              />

              {/* ITEM PICTURE */}

              <div className="image-upload">

                <label htmlFor="item-image">
                  Item Picture <span>*</span>
                </label>

                <input
                  id="item-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />

                <small>
                  A picture of the item is required.
                </small>

                {newListing.image && (
                  <img
                    src={newListing.image}
                    alt="Preview"
                    className="upload-preview"
                  />
                )}

              </div>

              <button
                type="submit"
                className="contact-button"
              >
                Publish Listing
              </button>

            </form>

          </div>

        </div>
      )}

      {/* LISTING DETAILS MODAL */}

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

            <p>
              {selectedListing.description}
            </p>

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