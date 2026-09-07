
function Navbar({ onSell, onLogin }) {
  function handleBrowse() {
    document
      .getElementById('marketplace')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar">

      <h2 className="logo">
        Campus Cart
      </h2>

      <div className="nav-links">

        <button onClick={handleBrowse}>
          Browse
        </button>

        <button onClick={onSell}>
          Sell
        </button>

        <button
          className="login-nav-button"
          onClick={onLogin}
        >
          Login
        </button>

      </div>

    </nav>
  )
}

export default Navbar

