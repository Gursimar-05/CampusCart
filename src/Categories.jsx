function Categories({ selectedCategory, setSelectedCategory }) {
  const categories = [
    'ALL',
    'Books',
    'Electronics',
    'Furniture',
    'Stationery',
    'Clothing'
  ]

  return (
    <div className="categories">
      <h2>Categories</h2>

      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? 'active'
                : ''
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Categories