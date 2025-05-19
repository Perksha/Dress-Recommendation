import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faTag,
  faTshirt,
  faEnvelope,
  faSignInAlt,
  faUserPlus,
  faSearch,
  faFilter,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons"
import "../styles/Dashboard.css"

const Dashboard = () => {
  const [dresses, setDresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({ price: "", occasion: "" })
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // ✅ Fetch Dresses from Backend based on Filters
  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const url = "http://localhost:5000/api/dresses/get-dresses"
        const params = new URLSearchParams()

        if (filters.occasion) {
          params.append("occasion", filters.occasion)
        }
        if (filters.price) {
          params.append("price", filters.price)
        }

        const response = await fetch(`${url}?${params.toString()}`)
        if (!response.ok) {
          throw new Error("Failed to fetch dresses")
        }

        const data = await response.json()
        console.log("✅ Dresses fetched:", data)

        if (Array.isArray(data)) {
          setDresses(data)
        } else {
          console.error("❌ Unexpected API response format:", data)
          setDresses([])
        }
        setLoading(false)
      } catch (error) {
        console.error("❌ Error fetching dresses:", error)
        setError("Failed to load dresses. Please try again later.")
        setLoading(false)
      }
    }

    fetchDresses()
  }, [filters])

  // ✅ Handle Filter Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  // ✅ Search Filter Function
  const filteredDresses = dresses.filter(
    (dress) =>
      dress.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dress.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dress.color?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <div>
      {/* ✅ Navbar Section */}
      <nav className="navbar">
        <div className="logo">
          <h1 className="brand-name">StyleGenie</h1>
        </div>
        <ul className={`nav-links ${showMobileMenu ? "show" : ""}`}>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link to="/shop">
              <FontAwesomeIcon icon={faTag} /> Shop
            </Link>
          </li>
          <li>
            <Link to="/collections">
              <FontAwesomeIcon icon={faTshirt} /> Collections
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <FontAwesomeIcon icon={faEnvelope} /> Contact
            </Link>
          </li>
          <li>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FontAwesomeIcon icon={faUserPlus} /> Signup
            </Link>
          </li>
        </ul>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, category, or color..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
     
      {/* Page Title */}
      <div className="page-header">
        <h1>Explore Our Collection</h1>
        <p>Find the perfect outfit for any occasion</p>
      </div>

      {/* ✅ Filter Section */}
      <div className="filter-section">
        <div className="filter-title">
          <FontAwesomeIcon icon={faFilter} />
          <span>Filter By:</span>
        </div>
        <select name="occasion" value={filters.occasion} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Casual">Casual</option>
          <option value="Winter Wear">Winter Wear</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Designer">Designer</option>
          <option value="Summer Wear">Summer Wear</option>
          <option value="Formal">Formal</option>
        </select>

        <select name="price" value={filters.price} onChange={handleFilterChange}>
          <option value="">All Prices</option>
          <option value="below600">Below ₹600</option>
          <option value="600-2000">₹600 - ₹2000</option>
          <option value="above2000">Above ₹2000</option>
        </select>
      </div>

      {/* ✅ Dress Collection Section */}
      <div className="dress-collection">
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading dresses...</p>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <>
            <div className="results-count">
              <p>Showing {filteredDresses.length} items</p>
            </div>

            <div className="dress-grid">
              {filteredDresses.length > 0 ? (
                filteredDresses.map((dress) => (
                  <div key={dress._id || dress.dress_id} className="dress-card">
                    <div className="dress-image-container">
                      <img
                        src={dress.image || "/placeholder.svg?height=300&width=200"}
                        alt={dress.name}
                        className="dress-image"
                      />
                      <div className="dress-overlay">
                        <button className="quick-view-btn">Quick View</button>
                        <button className="add-to-cart-btn">
                          <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="dress-details">
                      <h3>{dress.name}</h3>
                      <p className="dress-brand">Brand: {dress.brand}</p>
                      <p className="dress-category">Category: {dress.category}</p>
                      <p className="dress-color">Color: {dress.color}</p>
                      <p className="dress-size">Size: {Array.isArray(dress.size) ? dress.size.join(", ") : "N/A"}</p>
                      <p className="dress-price">Price: ₹{dress.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <img src="/placeholder.svg?height=200&width=200" alt="No results" />
                  <p>No dresses found matching your search/filter criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setFilters({ price: "", occasion: "" })
                    }}
                    className="reset-filters-btn"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>StyleGenie</h3>
            <p>Your AI-powered fashion assistant for personalized style recommendations.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/collections">Collections</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@stylegenie.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} StyleGenie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
