import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/add', label: 'Adicionar Ponto' },
    { to: '/about', label: 'Sobre' },
  ]

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: 'linear-gradient(90deg, #28a745 60%, #218838 100%)',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container flex justify-between items-center py-2">
        <Link
          className="navbar-brand text-white font-bold text-2xl tracking-wide"
          to="/"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          EcoPoint
        </Link>
        <div className="flex gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link px-3 py-1 rounded transition-colors duration-200
                ${
                  location.pathname === link.to
                    ? 'bg-white/80 text-green-800 font-semibold border border-green-600 shadow-sm'
                    : 'text-white hover:bg-green-100 hover:text-green-800'
                }
              `}
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Header
