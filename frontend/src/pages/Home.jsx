import React, { useEffect, useState, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const defaultIcon = new L.Icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
})

const highlightedIcon = new L.Icon({
  iconUrl:
    'https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=star|00aaff',
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [1, -34],
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
})

function ChangeView({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

// Componente botão customizado com estilos Tailwind + Bootstrap
function Button({ children, onClick, disabled, variant = 'primary' }) {
  const baseClasses =
    'px-4 py-2 rounded font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary:
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    secondary:
      'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400',
    info: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  )
}

function Sidebar({ selectedPoint }) {
  return (
    <aside className="sidebar">
      <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-400 pb-2">
        Detalhes do Ecoponto
      </h2>
      {!selectedPoint ? (
        <p className="text-gray-700 mt-10 text-center">
          Clique em um ecoponto no mapa para ver as informações aqui.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-green-800">
            {selectedPoint.name}
          </h3>
          {selectedPoint.image && (
            <img
              src={selectedPoint.image}
              alt={selectedPoint.name}
              className="rounded shadow-md max-h-48 object-cover"
            />
          )}
          <p className="text-gray-800">{selectedPoint.description}</p>
          <p className="text-gray-800">
            <span className="font-semibold">Telefone: </span>
            {selectedPoint.telefone}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Coordenadas: </span>
            {selectedPoint.coords[0].toFixed(5)}, {selectedPoint.coords[1].toFixed(5)}
          </p>
        </div>
      )}
      <footer className="mt-auto pt-4 text-center text-green-600 font-semibold text-sm">
        Projeto EcoPontos ♻️
      </footer>
    </aside>
  )
}

export default function EcoMap() {
  const [geoData, setGeoData] = useState(null)
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [mapCenter, setMapCenter] = useState([-2.5519, -44.2606])
  const [mapZoom, setMapZoom] = useState(12)
  const geoJsonLayerRef = useRef(null)

  useEffect(() => {
    fetch('/ecopontos.geojson')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error('Erro ao carregar GeoJSON:', err))
  }, [])

  // Corrigido: Limpar destaque só dos marcadores
  const clearHighlight = () => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.setIcon(defaultIcon)
          layer.closePopup()
        }
      })
    }
  }

  const resetZoom = () => {
    setMapCenter([-2.5519, -44.2606])
    setMapZoom(12)
    setSelectedPoint(null)
    clearHighlight()
  }

  // Corrigido: Usar pointToLayer para garantir Marker
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        clearHighlight()
        if (layer.setIcon) layer.setIcon(highlightedIcon)
        layer.openPopup()

        const coords = feature.geometry.coordinates
        setMapCenter([coords[1], coords[0]])
        setMapZoom(15)

        setSelectedPoint({
          name: feature.properties.name || 'Sem nome',
          description: feature.properties.description || 'Sem descrição',
          telefone: feature.properties.telefone || 'Sem telefone',
          image: feature.properties.image || null,
          coords: [coords[1], coords[0]],
        })
      },
    })

    const popupContent = `
      <b>${feature.properties.name || 'Sem nome'}</b><br/>
      ${feature.properties.description || ''}
    `
    layer.bindPopup(popupContent)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-green-50 to-white p-0 flex flex-col">
      <header className="mb-4 px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 drop-shadow-md tracking-wide">
          EcoPoint - Localizador Sustentável ♻️
        </h1>
        <p className="text-green-700 mt-1 font-medium">
          Encontre pontos de coleta e reciclagem perto de você!
        </p>
      </header>

      <div className="sidebar-container px-4 pb-4">
        {/* Mapa */}
        <section className="map-wrapper rounded-lg shadow-lg overflow-hidden border border-green-300">
          <div className="map-container">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
            >
              <ChangeView center={mapCenter} zoom={mapZoom} />
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {geoData && (
                <GeoJSON
                  data={geoData}
                  onEachFeature={onEachFeature}
                  ref={geoJsonLayerRef}
                  pointToLayer={(feature, latlng) =>
                    L.marker(latlng, { icon: defaultIcon })
                  }
                />
              )}
            </MapContainer>
          </div>
          <div className="flex justify-center gap-4 py-3 bg-green-50 border-t border-green-200">
            <Button variant="secondary" onClick={resetZoom}>
              Resetar Zoom
            </Button>
          </div>
        </section>

        {/* Sidebar detalhes */}
        <aside className="sidebar">
          <Sidebar selectedPoint={selectedPoint} />
        </aside>
      </div>

      <footer className="mt-4 text-center text-green-600 font-semibold text-sm px-4 pb-2">
        © 2025 EcoPoint - Desenvolvido com React, Leaflet, Bootstrap e Tailwind CSS
      </footer>
    </div>
  )
}
