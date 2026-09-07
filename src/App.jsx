import './App.css'
import Navbar from './Navbar'
import Hero from './Hero'
import SearchBar from './SearchBar'
import ListingType from './ListingType'
import Categories from './Categories'
import ListingCard from './ListingCard'
import { useState } from 'react'

function App() {
  const [selectedType, setSelectedType] = useState('ALL')
  return (
    <div>
      <Navbar />

      <Hero />

      <SearchBar />

      <ListingType
  selectedType={selectedType}
  setSelectedType={setSelectedType}
/>

      <Categories />

      <div className="listing-container">
          {(selectedType === 'ALL' || selectedType === 'BUY') && (
  <ListingCard
    title="Engineering Mathematics"
    description="Good condition, used for one semester."
    price="300"
    type="BUY"
    emoji="📚"
  />
)}
{(selectedType === 'ALL' || selectedType === 'BUY') && (
  <ListingCard
    title="Wireless Headphones"
    description="Barely used, excellent condition."
    price="800"
    type="BUY"
    emoji="🎧"
  />
)}
{(selectedType === 'ALL' || selectedType === 'RENT') && (
  <ListingCard
    title="Study Chair"
    description="Comfortable chair available for rental."
    price="50/day"
    type="RENT"
    emoji="🪑"
  />
)}
      </div>
    </div>
  )
}

export default App