function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="categories">
      <h2>Categories</h2>

      <div className="category-buttons">
        <button
          className={selectedCategory === 'ALL' ? 'active' : ''}
          onClick={() => setSelectedCategory('ALL')}
        >
          All
        </button>

        <button
          className={selectedCategory === 'Books' ? 'active' : ''}
          onClick={() => setSelectedCategory('Books')}
        >
          📚 Books
        </button>

        <button
          className={selectedCategory === 'Electronics' ? 'active' : ''}
          onClick={() => setSelectedCategory('Electronics')}
        >
          🎧 Electronics
        </button>

        <button
          className={selectedCategory === 'Furniture' ? 'active' : ''}
          onClick={() => setSelectedCategory('Furniture')}
        >
          🪑 Furniture
        </button>
      </div>
    </div>
  )
}

export default Categories