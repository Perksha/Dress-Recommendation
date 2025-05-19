import { Link } from "react-router-dom"
import "../styles/Home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSignInAlt,
  faUserPlus,
  faHome,
  faTag,
  faTshirt,
  faEnvelope,
  faStar,
  faShippingFast,
  faUndo,
  faSearch,
} from "@fortawesome/free-solid-svg-icons"

const Home = () => {
  // Sample trending items data
  const trendingItems = [
    { id: 1, name: "Summer Dress", price: "$49.99", image: "/placeholder.svg?height=300&width=300" },
    { id: 2, name: "Casual Jeans", price: "$39.99", image: "/placeholder.svg?height=300&width=300" },
    { id: 3, name: "Designer T-Shirt", price: "$29.99", image: "/placeholder.svg?height=300&width=300" },
    { id: 4, name: "Elegant Watch", price: "$99.99", image: "/placeholder.svg?height=300&width=300" },
  ]

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah J.",
      comment: "StyleGenie completely transformed my wardrobe! The AI recommendations are spot on.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael T.",
      comment: "Great selection and amazing prices. The personalized style advice is a game-changer.",
      rating: 4,
    },
    {
      id: 3,
      name: "Emma L.",
      comment: "I love how easy it is to find outfits that match my style preferences.",
      rating: 5,
    },
  ]

  return (
    <div className="homepage">
      {/* Navigation Bar - Enhanced with mobile responsiveness */}
      <nav className="navbar sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="logo">
          <h1 className="brand-name">StyleGenie</h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search for items..." />
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} className="icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/shop">
              <FontAwesomeIcon icon={faTag} className="icon" /> Shop
            </Link>
          </li>
          <li>
            <Link to="/collections">
              <FontAwesomeIcon icon={faTshirt} className="icon" /> Collections
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <FontAwesomeIcon icon={faEnvelope} className="icon" /> Contact
            </Link>
          </li>
          <li>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} className="icon" /> Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FontAwesomeIcon icon={faUserPlus} className="icon" /> Signup
            </Link>
          </li>
        </ul>
        <div className="mobile-menu-button">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Hero Section - Enhanced with animation and call-to-action */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animate-fade-in">
            Welcome to <span className="gradient-text">StyleGenie</span>
          </h1>
          <p className="animate-fade-in-delay">Your AI-powered fashion assistant.</p>
          <p className="hero-subtext animate-fade-in-delay-2">
            Discover personalized style recommendations based on your preferences and body type.
          </p>
          <div className="hero-buttons animate-fade-in-delay-3">
            <Link to="/shop">
              <button className="btn btn-primary">Explore Now</button>
            </Link>
            <Link to="/style-quiz">
              <button className="btn btn-secondary">Take Style Quiz</button>
            </Link>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      {/* Features Section - Enhanced with better visuals */}
      <section className="features">
        <h2 className="section-title">Why Choose StyleGenie</h2>
        <div className="feature-container">
          <div className="feature-box">
            <FontAwesomeIcon icon={faTag} className="icon" />
            <h3>Best Prices</h3>
            <p>Exclusive deals on top fashion brands with price match guarantee.</p>
          </div>
          <div className="feature-box highlight">
            <FontAwesomeIcon icon={faTshirt} className="icon" />
            <h3>AI-Powered Recommendations</h3>
            <p>Smart outfit suggestions tailored to your style, body type, and preferences.</p>
          </div>
          <div className="feature-box">
            <FontAwesomeIcon icon={faSignInAlt} className="icon" />
            <h3>Secure Login</h3>
            <p>Fast and secure sign-in to personalize your experience.</p>
          </div>
          <div className="feature-box">
            <FontAwesomeIcon icon={faShippingFast} className="icon" />
            <h3>Fast Delivery</h3>
            <p>Free shipping on orders over $50 with express delivery options.</p>
          </div>
          <div className="feature-box">
            <FontAwesomeIcon icon={faUndo} className="icon" />
            <h3>Easy Returns</h3>
            <p>Hassle-free 30-day return policy on all purchases.</p>
          </div>
        </div>
      </section>

      {/* New Section: Trending Items */}
      <section className="trending-items">
        <h2 className="section-title">Trending This Week</h2>
        <div className="items-container">
          {trendingItems.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-image">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
                <div className="item-overlay">
                  <button className="quick-view">Quick View</button>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/shop">
            <button className="btn btn-outline">View All Products</button>
          </Link>
        </div>
      </section>

      {/* New Section: AI Style Assistant Showcase */}
      <section className="ai-showcase">
        <div className="ai-content">
          <h2>Meet Your Personal AI Stylist</h2>
          <p>
            Our advanced AI analyzes your body type, style preferences, and current trends to create perfect outfit
            combinations.
          </p>
          <ul className="ai-features">
            <li>Personalized outfit recommendations</li>
            <li>Color palette suggestions based on your skin tone</li>
            <li>Seasonal wardrobe planning</li>
            <li>Mix and match existing items in your closet</li>
          </ul>
          <Link to="/ai-stylist">
            <button className="btn">Try AI Stylist Now</button>
          </Link>
        </div>
        <div className="ai-image">
          <img src="/placeholder.svg?height=400&width=400" alt="AI Stylist Demo" />
        </div>
      </section>

      {/* New Section: Testimonials */}
      <section className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.comment}"</p>
              <p className="testimonial-author">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Section: Newsletter Signup */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Join Our Style Community</h2>
          <p>Subscribe to receive personalized style tips, exclusive offers, and early access to new collections.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="btn">Subscribe</button>
          </div>
          <p className="privacy-note">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
        </div>
      </section>

      {/* New Section: App Download */}
      <section className="app-download">
        <div className="app-content">
          <h2>Get the StyleGenie App</h2>
          <p>Take your personal stylist wherever you go. Download our mobile app for on-the-go fashion advice.</p>
          <div className="app-buttons">
            <a href="#" className="app-button">
              <img src="/placeholder.svg?height=50&width=150" alt="App Store" />
            </a>
            <a href="#" className="app-button">
              <img src="/placeholder.svg?height=50&width=150" alt="Google Play" />
            </a>
          </div>
        </div>
        <div className="app-image">
          <img src="/placeholder.svg?height=500&width=250" alt="StyleGenie Mobile App" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>StyleGenie</h3>
            <p>Your AI-powered fashion assistant for personalized style recommendations.</p>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
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
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/size-guide">Size Guide</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@stylegenie.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Hours: Mon-Fri, 9am-5pm EST</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} StyleGenie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
