import './App.css'
import Navbar from './Navbar'
import Hero from './Hero'
import SearchBar from './SearchBar'
import ListingType from './ListingType'
import Categories from './Categories'
import ListingCard from './ListingCard'

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <SearchBar />
      <ListingType />
      <Categories />
      <div className="listing-container">
  <ListingCard />
  <ListingCard />
  <ListingCard />
  </div>
    </div>
  )
}

export default App