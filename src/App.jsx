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
        <ListingCard
          title="Engineering Mathematics"
          description="Good condition, used for one semester."
          price="300"
          type="BUY"
          emoji="📚"
        />

        <ListingCard
          title="Wireless Headphones"
          description="Barely used, excellent condition."
          price="800"
          type="BUY"
          emoji="🎧"
        />

        <ListingCard
          title="Study Chair"
          description="Comfortable chair available for rental."
          price="50/day"
          type="RENT"
          emoji="🪑"
        />
      </div>
    </div>
  )
}

export default App