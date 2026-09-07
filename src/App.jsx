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
    />
  ))}
      </div>
    </div>
  )
}

export default App