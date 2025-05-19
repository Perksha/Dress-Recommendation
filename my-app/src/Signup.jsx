"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "../styles/Signup.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUser,
  faEnvelope,
  faLock,
  faPhone,
  faCalendarAlt,
  faVenusMars,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"

const Signup = () => {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const validateStep1 = () => {
    if (!name.trim()) {
      setError("Name is required")
      return false
    }
    if (!age.trim() || isNaN(Number.parseInt(age))) {
      setError("Valid age is required")
      return false
    }
    if (!gender) {
      setError("Please select your gender")
      return false
    }
    if (!contact.trim()) {
      setError("Contact number is required")
      return false
    }
    setError("")
    return true
  }

  const validateStep2 = () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Valid email is required")
      return false
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    setError("")
    return true
  }

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const prevStep = () => {
    setStep(1)
    setError("")
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!validateStep2()) {
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        age,
        gender,
        contact,
        email,
        password,
      })

      setLoading(false)
      alert("Account created successfully! Please login.")
      // Redirect to login page or show success message
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || "Signup failed. Please try again.")
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>{step === 1 ? "Create Your Account" : "Set Up Your Login"}</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
        </div>

        {step === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              nextStep()
            }}
          >
            <div className="form-group">
              <div className="input-group">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <FontAwesomeIcon icon={faVenusMars} className="input-icon" />
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="signup-button">
              Continue <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <div className="input-group">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-buttons">
              <button type="button" className="back-button" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="signup-button" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>
        )}

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
