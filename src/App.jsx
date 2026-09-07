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
  const [favourites, setFavourites] = useState([])

  const [showSellForm, setShowSellForm] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  const [messageSent, setMessageSent] = useState(false)

  const [interested, setInterested] = useState(false)

  const [notifications, setNotifications] = useState([])

  const [showNotifications, setShowNotifications] = useState(false)

  const [message, setMessage] = useState('')
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
const [loginEmail, setLoginEmail] = useState('')
const [loginPassword, setLoginPassword] = useState('')
const [loginError, setLoginError] = useState('')

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
  function handleLogin() {
  if (!loginEmail || !loginPassword) {
    setLoginError('Please enter your email and password.')
    return
  }

  setIsLoggedIn(true)
  setShowLoginForm(false)
  setLoginError('')
}

  /* =========================
     SELL FORM
     ========================= */

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

  /* =========================
     CONTACT SELLER
     ========================= */

  function handleContactSeller() {
    if (!message.trim()) {
      return
    }

    setMessageSent(true)
  }

  function closeContactForm() {
    setShowContactForm(false)
    setMessage('')
    setMessageSent(false)
  }

  /* =========================
     INTERESTED
     ========================= */

  function handleInterested() {
    if (!selectedListing) {
      return
    }

    if (interested) {
      return
    }

    setInterested(true)

    const notification = {
      id: Date.now(),
      seller: selectedListing.seller,
      title: selectedListing.title,
      message: `Someone is interested in your ${selectedListing.title}.`,
      time: 'Just now'
    }

    setNotifications([
      notification,
      ...notifications
    ])
  }

  /* =========================
     REMOVE NOTIFICATION
     ========================= */

  function removeNotification(notificationId) {
    setNotifications(
      notifications.filter(
        (notification) =>
          notification.id !== notificationId
      )
    )
  }

  /* =========================
     CLOSE DETAILS
     ========================= */

  function closeDetails() {
    setSelectedListing(null)
    setInterested(false)
  }

  /* =========================
     FILTER LISTINGS
     ========================= */

    function handleToggleFavourite(listingId) {
  if (favourites.includes(listingId)) {
    setFavourites(
      favourites.filter((id) => id !== listingId)
    )
  } else {
    setFavourites([
      ...favourites,
      listingId
    ])
  }
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

      <Navbar
  onSell={() => setShowSellForm(true)}
  onLogin={() => setShowLoginForm(true)}
  onFavourites={() => {
    document
      .getElementById('favourites')
      ?.scrollIntoView({ behavior: 'smooth' })
  }}
/>

      {/* =========================
          NOTIFICATIONS
          ========================= */}

      <div className="notification-area">

        <button
          className="notification-button"
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
        >
          🔔

          {notifications.length > 0 && (
            <span className="notification-count">
              {notifications.length}
            </span>
          )}
        </button>

        {showNotifications && (

          <div className="notification-panel">

            <h3>Notifications</h3>

            {notifications.length === 0 ? (

              <p className="empty-notifications">
                No notifications yet.
              </p>

            ) : (

              notifications.map((notification) => (

                <div
                  className="notification-item"
                  key={notification.id}
                >

                  <div className="notification-icon">
                    !
                  </div>

                  <div className="notification-content">

                    <strong>
                      New interest
                    </strong>

                    <p>
                      {notification.message}
                    </p>

                    <small>
                      {notification.time}
                    </small>

                  </div>

                  {/* REMOVE NOTIFICATION */}

                  <button
                    className="remove-notification"
                    onClick={() =>
                      removeNotification(
                        notification.id
                      )
                    }
                    aria-label="Remove notification"
                  >
                    ×
                  </button>

                </div>

              ))

            )}

          </div>

        )}

      </div>

      {/* =========================
          HERO
          ========================= */}

      <Hero
        search={search}
        setSearch={setSearch}
      />

      {/* =========================
          MARKETPLACE CONTROLS
          ========================= */}

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

      {/* =========================
          LISTINGS
          ========================= */}

      <section
  id="marketplace"
  className="listings-section"
>
  {/* =========================
    FAVOURITES
    ========================= */}

<section
  id="favourites"
  className="listings-section favourites-section"
>

  <div className="listings-heading">

    <div>
      <p className="section-label">
        YOUR SAVED ITEMS
      </p>

      <h2>
        Favourites
      </h2>

      <p>
        Items you've saved for later.
      </p>
    </div>

  </div>

  <div className="listing-container">

    {listings.filter(
      (listing) => favourites.includes(listing.id)
    ).length > 0 ? (

      listings
        .filter((listing) =>
          favourites.includes(listing.id)
        )
        .map((listing) => (

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
            isFavourite={true}
            onToggleFavourite={() =>
              handleToggleFavourite(listing.id)
            }
          />

        ))

    ) : (

      <div className="no-results">

        <h3>
          No favourites yet
        </h3>

        <p>
          Click ♡ on an item to save it here.
        </p>

      </div>

    )}

  </div>

</section>
   <section id="favourites">

  <h2>Favourites</h2>

  {listings
    .filter((listing) => favourites.includes(listing.id))
    .map((listing) => (
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
        isFavourite={true}
        onToggleFavourite={() =>
          handleToggleFavourite(listing.id)
        }
      />
    ))}

</section>

        <div className="listings-heading">

          <div>

            <p className="section-label">
              CAMPUS MARKETPLACE
            </p>

            <h2>
              Fresh on Campus
            </h2>

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
                 isFavourite={favourites.includes(listing.id)}
  onToggleFavourite={() =>
    handleToggleFavourite(listing.id)
  }
              />
               

            ))

          ) : (

            <div className="no-results">

              <h3>
                No listings found
              </h3>

              <p>
                Try another search or category.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* =========================
          SELL ITEM MODAL
          ========================= */}

      {showSellForm && (

        <div className="modal-overlay">

          <div className="modal sell-modal">

            <button
              className="modal-close"
              onClick={() =>
                setShowSellForm(false)
              }
            >
              ×
            </button>

            <h2>
              Sell an Item
            </h2>

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

                <option value="BUY">
                  BUY
                </option>

                <option value="RENT">
                  RENT
                </option>

                <option value="BOTH">
                  BUY & RENT
                </option>

              </select>

           <select
  name="category"
  value={newListing.category}
  onChange={handleInputChange}
>
  <option value="Books">
    Books
  </option>

  <option value="Electronics">
    Electronics
  </option>

  <option value="Furniture">
    Furniture
  </option>

  <option value="Stationery">
    Stationery
  </option>

  <option value="Clothing">
    Clothing
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

              {/* IMAGE UPLOAD */}

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

      {/* =========================
          LISTING DETAILS
          ========================= */}

      {selectedListing && (

        <div className="modal-overlay">

          <div className="modal">

            <button
              className="modal-close"
              onClick={closeDetails}
            >
              ×
            </button>

            <img
              src={selectedListing.image}
              alt={selectedListing.title}
              className="modal-image"
            />

            <h2>
              {selectedListing.title}
            </h2>

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

            {/* FIXED INTERESTED BUTTON */}

            <button
              className={
                interested
                  ? 'interested-button interested'
                  : 'interested-button'
              }
              onClick={handleInterested}
            >
              {interested
                ? '✓ Interest Sent'
                : "I'm Interested"}
            </button>

            <button
              className="contact-button"
              onClick={() =>
                setShowContactForm(true)
              }
            >
              Contact Seller
            </button>

          </div>

        </div>

      )}

      {/* =========================
          CONTACT SELLER
          ========================= */}

      {showContactForm && selectedListing && (

        <div className="modal-overlay">

          <div className="modal contact-modal">

            <button
              className="modal-close"
              onClick={closeContactForm}
            >
              ×
            </button>

            {!messageSent ? (

              <>

                <div className="contact-icon">
                  💬
                </div>

                <h2>
                  Contact {selectedListing.seller}
                </h2>

                <p>
                  Send a message about{' '}
                  <strong>
                    {selectedListing.title}
                  </strong>
                </p>

                <textarea
                  className="message-input"
                  placeholder="Hi! Is this item still available?"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                />

                <button
                  className="contact-button"
                  onClick={handleContactSeller}
                >
                  Send Message
                </button>

              </>

            ) : (

              <div className="success-message">

                <div className="success-icon">
                  ✓
                </div>

                <h2>
                  Message Sent!
                </h2>

                <p>
                  Your message has been sent to{' '}
                  {selectedListing.seller}.
                </p>

                <button
                  className="contact-button"
                  onClick={closeContactForm}
                >
                  Done
                </button>

              </div>

            )}

          </div>

        </div>

      )}
            {/* =========================
          LOGIN MODAL
          ========================= */}

      {showLoginForm && (

        <div className="modal-overlay">

          <div className="modal login-modal">

           <h2>Login</h2>

<p>
  Login to your Campus Cart account.
</p>

<input
  type="email"
  placeholder="College email"
  value={loginEmail}
  onChange={(event) =>
    setLoginEmail(event.target.value)
  }
/>

<input
  type="password"
  placeholder="Password"
  value={loginPassword}
  onChange={(event) =>
    setLoginPassword(event.target.value)
  }
/>

{loginError && (
  <p className="login-error">
    {loginError}
  </p>
)}

<button
  className="contact-button"
  onClick={handleLogin}
>
  Login
</button>

            <small className="login-note">
              Demo login — authentication will be added later.
            </small>

          </div>

        </div>

      )}
      
    </div>
  )
}

export default App

