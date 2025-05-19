"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "../styles/Login.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password })

      // Store token if backend sends it
      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token)
      }

      setLoading(false)
      navigate("/dashboard")
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || "Login failed. Please try again.")
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
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
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              "Logging in..."
            ) : (
              <>
                Login <FontAwesomeIcon icon={faArrowRight} />
              </>
            )}
          </button>
        </form>
        <div className="divider">
          <span>OR</span>
        </div>
        <div className="social-login">
          <button className="google-btn">
            <img src="/placeholder.svg?height=20&width=20" alt="Google" />
            Continue with Google
          </button>
        </div>
        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/register" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
