"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const translations = {
  en: {
    login: "Login",
    signUp: "Sign Up",
    welcomeBack: "Welcome Back",
    createAccount: "Create Account",
    fullName: "Full Name",
    emailAddress: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    signIn: "Sign In",
    createAccountBtn: "Create Account",
    forgotPassword: "Forgot your password?",
  },
  nl: {
    login: "Inloggen",
    signUp: "Registreren",
    welcomeBack: "Welkom Terug",
    createAccount: "Account Aanmaken",
    fullName: "Volledige Naam",
    emailAddress: "E-mailadres",
    password: "Wachtwoord",
    confirmPassword: "Bevestig Wachtwoord",
    signIn: "Inloggen",
    createAccountBtn: "Account Aanmaken",
    forgotPassword: "Wachtwoord vergeten?",
  },
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [language, setLanguage] = useState<"en" | "nl">("en")
  const router = useRouter()

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    fullName?: string;
    confirmPassword?: string;
  }>({})
  const [showLoginSuccess, setShowLoginSuccess] = useState(false)

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setErrors({})

    // Validation
    const newErrors: { [key: string]: string } = {}

    if (!email.trim()) {
      newErrors.email = language === "en" ? "Email is required" : "E-mail is verplicht"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = language === "en" ? "Please enter a valid email" : "Voer een geldig e-mailadres in"
    }

    if (!password.trim()) {
      newErrors.password = language === "en" ? "Password is required" : "Wachtwoord is verplicht"
    } else if (password.length < 6) {
      newErrors.password =
        language === "en" ? "Password must be at least 6 characters" : "Wachtwoord moet minimaal 6 tekens zijn"
    }

    if (!isLogin) {
      if (!fullName.trim()) {
        newErrors.fullName = language === "en" ? "Full name is required" : "Volledige naam is verplicht"
      }

      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = language === "en" ? "Please confirm your password" : "Bevestig je wachtwoord"
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = language === "en" ? "Passwords do not match" : "Wachtwoorden komen niet overeen"
      }
    }

    // If there are errors, show them and don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Show success popup
    setShowLoginSuccess(true)

    // Hide popup after 2 seconds and redirect
    setTimeout(() => {
      setShowLoginSuccess(false)
      router.push(`/dashboard?lang=${language}`)
    }, 2000)
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "nl" : "en")
  }

  return (
<div style={{
  height: '100vh',
  width: '100%',
  maxWidth: '24rem',
  margin: '0 auto',
  background: 'black',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}}>
  {/* Beautiful Dark Forest Road Background */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'url("/images/dark-forest-road.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transition: 'all 0.5s'
    }}
  />

  {/* Dark overlay for better text readability */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)'
  }} />

  {/* Additional gradient overlays for depth */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, transparent 50%, rgba(0, 0, 0, 0.4) 100%)'
  }} />
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%)'
  }} />

  {/* Animated floating elements */}
  <div style={{
    position: 'absolute',
    top: '5rem',
    left: '2rem',
    width: '8rem',
    height: '8rem',
    background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.2) 0%, rgba(0, 0, 0, 0.3) 100%)',
    borderRadius: '50%',
    filter: 'blur(24px)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  }} />
  <div style={{
    position: 'absolute',
    top: '10rem',
    right: '3rem',
    width: '6rem',
    height: '6rem',
    background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.25) 0%, rgba(17, 24, 39, 0.2) 100%)',
    borderRadius: '50%',
    filter: 'blur(16px)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    animationDelay: '1s'
  }} />
  <div style={{
    position: 'absolute',
    bottom: '8rem',
    left: '4rem',
    width: '7rem',
    height: '7rem',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.35) 0%, rgba(31, 41, 55, 0.2) 100%)',
    borderRadius: '50%',
    filter: 'blur(24px)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    animationDelay: '0.5s'
  }} />
  <div style={{
    position: 'absolute',
    bottom: '12rem',
    right: '2rem',
    width: '5rem',
    height: '5rem',
    background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.3) 0%, rgba(0, 0, 0, 0.25) 100%)',
    borderRadius: '50%',
    filter: 'blur(16px)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    animationDelay: '0.7s'
  }} />
      {/* Language Toggle */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        zIndex: 20
      }}>
        <button
          onClick={toggleLanguage}
          style={{
            color: 'white',
            border: '1px solid rgba(75, 85, 99, 0.5)',
            backdropFilter: 'blur(4px)',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            background: 'rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          {language === "en" ? "NL" : "EN"}
        </button>
      </div>

      {/* Login Form */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem'
      }}>
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          {/* Toggle Buttons */}
          <div style={{
            display: 'flex',
            marginBottom: '2rem',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(12px)',
            borderRadius: '0.5rem',
            padding: '0.25rem',
            border: '1px solid rgba(75, 85, 99, 0.3)'
          }}>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.3s',
                background: isLogin ? 'white' : 'transparent',
                color: isLogin ? 'black' : '#d1d5db',
                border: 'none',
                cursor: 'pointer',
                transform: isLogin ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isLogin ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              {t.login}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.3s',
                background: !isLogin ? 'white' : 'transparent',
                color: !isLogin ? 'black' : '#d1d5db',
                border: 'none',
                cursor: 'pointer',
                transform: !isLogin ? 'scale(1.05)' : 'scale(1)',
                boxShadow: !isLogin ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              {t.signUp}
            </button>
          </div>

          {/* Form Card */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(75, 85, 99, 0.4)',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <h1 style={{
              color: 'white',
              fontSize: '1.875rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              {isLogin ? t.welcomeBack : t.createAccount}
            </h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    placeholder={t.fullName}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(4px)',
                      border: `1px solid ${errors.fullName ? '#ef4444' : 'rgba(107, 114, 128, 0.5)'}`,
                      color: 'white',
                      borderRadius: '0.75rem',
                      height: '3rem',
                      padding: '0 1rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'white'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.fullName ? '#ef4444' : 'rgba(107, 114, 128, 0.5)'
                    }}
                    required
                  />
                  {errors.fullName && (
                    <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem', marginLeft: '0.25rem' }}>
                      {errors.fullName}
                    </p>
                  )}
                </div>
              )}

              <div>
                <input
                  type="email"
                  placeholder={t.emailAddress}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    border: `1px solid ${errors.email ? '#ef4444' : 'rgba(107, 114, 128, 0.5)'}`,
                    color: 'white',
                    borderRadius: '0.75rem',
                    height: '3rem',
                    padding: '0 1rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'white'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(107, 114, 128, 0.5)'
                  }}
                  required
                />
                {errors.email && (
                  <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem', marginLeft: '0.25rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder={t.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    border: `1px solid ${errors.password ? '#ef4444' : 'rgba(107, 114, 128, 0.5)'}`,
                    color: 'white',
                    borderRadius: '0.75rem',
                    height: '3rem',
                    padding: '0 1rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'white'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.password ? '#ef4444' : 'rgba(107, 114, 128, 0.5)'
                  }}
                  required
                />
                {errors.password && (
                  <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem', marginLeft: '0.25rem' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <input
                    type="password"
                    placeholder={t.confirmPassword}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(4px)',
                      border: `1px solid ${errors.confirmPassword ? '#ef4444' : 'rgba(107, 114, 128, 0.5)'}`,
                      color: 'white',
                      borderRadius: '0.75rem',
                      height: '3rem',
                      padding: '0 1rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'white'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : 'rgba(107, 114, 128, 0.5)'
                    }}
                    required
                  />
                  {errors.confirmPassword && (
                    <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem', marginLeft: '0.25rem' }}>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'white',
                  color: 'black',
                  fontWeight: '600',
                  padding: '0.75rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#e5e7eb'
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
              >
                {isLogin ? t.signIn : t.createAccountBtn}
              </button>
            </form>

            {isLogin && (
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button style={{
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.textDecoration = 'underline'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#9ca3af'
                  e.currentTarget.style.textDecoration = 'none'
                }}>
                  {t.forgotPassword}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Success Popup */}
      {showLoginSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            margin: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                background: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 style={{ color: 'black', fontWeight: '700', fontSize: '1.125rem', margin: 0 }}>
                  {language === "en" ? "Logged In!" : "Ingelogd!"}
                </h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', margin: 0 }}>
                  {language === "en" ? "Welcome back" : "Welkom terug"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}