"use client"

import React, { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
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
    <div className="h-screen w-full max-w-sm mx-auto bg-black relative overflow-hidden hide-scrollbar">
      {/* Beautiful Dark Forest Road Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-jZo5HnttCJlSPKKFEYAeobHNolGioO.jpeg")`,
        }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Additional gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Animated floating elements */}
      <div className="absolute top-20 left-8 w-32 h-32 bg-gradient-to-br from-gray-900/20 to-black/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-12 w-24 h-24 bg-gradient-to-br from-gray-800/25 to-gray-900/20 rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-16 w-28 h-28 bg-gradient-to-br from-black/35 to-gray-800/20 rounded-full blur-xl animate-pulse delay-500" />
      <div className="absolute bottom-48 right-8 w-20 h-20 bg-gradient-to-br from-gray-900/30 to-black/25 rounded-full blur-lg animate-pulse delay-700" />

      {/* Language Toggle - Top Right - FIXED */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          onClick={toggleLanguage}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 border border-gray-600/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
        >
          {language === "en" ? "NL" : "EN"}
        </Button>
      </div>

      {/* Login/Signup Form */}
      <div className="relative z-10 flex items-center justify-center h-full px-8 hide-scrollbar overflow-y-auto">
        <div className="w-full max-w-xs animate-fade-in">
          {/* Toggle Buttons */}
          <div className="flex mb-8 bg-black/70 backdrop-blur-md rounded-lg p-1 border border-gray-600/30 transition-all duration-300">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-white text-black shadow-lg transform scale-105"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {t.login}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-white text-black shadow-lg transform scale-105"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {t.signUp}
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-black/80 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:shadow-3xl">
            <h1 className="text-white text-3xl font-bold text-center mb-8 transition-all duration-300">
              {isLogin ? t.welcomeBack : t.createAccount}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="animate-slide-down">
                  <Input
                    type="text"
                    placeholder={t.fullName}
                    value={fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                    className={`bg-black/50 backdrop-blur-sm border ${errors.fullName ? "border-red-500" : "border-gray-500/50"} text-white placeholder-gray-400 focus:border-white focus:ring-white/20 rounded-xl h-12 transition-all duration-300 hover:border-gray-400/70`}
                    required
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-sm mt-2 ml-1 animate-slide-down">{errors.fullName}</p>
                  )}
                </div>
              )}

              <div>
                <Input
                  type="email"
                  placeholder={t.emailAddress}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className={`bg-black/50 backdrop-blur-sm border ${errors.email ? "border-red-500" : "border-gray-500/50"} text-white placeholder-gray-400 focus:border-white focus:ring-white/20 rounded-xl h-12 transition-all duration-300 hover:border-gray-400/70`}
                  required
                />
                {errors.email && <p className="text-red-400 text-sm mt-2 ml-1 animate-slide-down">{errors.email}</p>}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder={t.password}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className={`bg-black/50 backdrop-blur-sm border ${errors.password ? "border-red-500" : "border-gray-500/50"} text-white placeholder-gray-400 focus:border-white focus:ring-white/20 rounded-xl h-12 transition-all duration-300 hover:border-gray-400/70`}
                  required
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-2 ml-1 animate-slide-down">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div className="animate-slide-down">
                  <Input
                    type="password"
                    placeholder={t.confirmPassword}
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    className={`bg-black/50 backdrop-blur-sm border ${errors.confirmPassword ? "border-red-500" : "border-gray-500/50"} text-white placeholder-gray-400 focus:border-white focus:ring-white/20 rounded-xl h-12 transition-all duration-300 hover:border-gray-400/70`}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-2 ml-1 animate-slide-down">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3 h-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                {isLogin ? t.signIn : t.createAccountBtn}
              </Button>
            </form>

            {isLogin && (
              <div className="text-center mt-6">
                <button className="text-gray-400 text-sm hover:text-white transition-colors duration-300 hover:underline">
                  {t.forgotPassword}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Login Success Popup */}
      {showLoginSuccess && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 m-6 shadow-2xl animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-black font-bold text-lg">{language === "en" ? "Logged In!" : "Ingelogd!"}</h3>
                <p className="text-gray-600 text-sm">{language === "en" ? "Welcome back" : "Welkom terug"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
