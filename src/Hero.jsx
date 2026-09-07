function Hero({ search, setSearch })  {
  return (
    <section className="hero">
      <div className="hero-content">

        <div className="hero-text">
          <p className="hero-eyebrow">BUY / SELL / RENT</p>

          <h1>
            Everything you need.
            <br />
            Right on <span>campus.</span>
          </h1>

          <p className="hero-description">
            Find great deals, give your items a new home,
            and make campus life easier — together.
          </p>

          <div className="hero-search">
            <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search for books, electronics, furniture..."
/>

            <button>Search</button>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
            alt="Student studying on campus"
          />

          <div className="floating-card card-one">
            <img
              src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=200&q=80"
              alt="Books"
            />
            <div>
              <strong>Books</strong>
              <small>Starting ₹100</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
              alt="Headphones"
            />
            <div>
              <strong>Electronics</strong>
              <small>Student deals</small>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero