import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddPoint from './pages/AddPoint'
import About from './pages/About'
import Header from './components/Header'

function App() {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPoint />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
