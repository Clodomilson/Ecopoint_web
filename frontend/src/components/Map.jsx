import React, { useEffect, useState, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Popup,
  useMap,
  Marker,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Ícones
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

export default function Map() {
  const [geoData, setGeoData] = useState(null)
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [mapCenter, setMapCenter] = useState([-2.5519, -44.2606])
  const [mapZoom, setMapZoom] = useState(12)
  const [modalOpen, setModalOpen] = useState(false)
  const geoJsonLayerRef = useRef(null)

  useEffect(() => {
    fetch('/ecopontos.geojson')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error('Erro ao carregar GeoJSON:', err))
  }, [])

  // Reset zoom para área inicial
  const resetZoom = () => {
    setMapCenter([-2.5519, -44.2606])
    setMapZoom(12)
    setSelectedPoint(null)
    clearHighlight()
  }

  const clearHighlight = () => {
    geoJsonLayerRef.current?.eachLayer((layer) => {
      layer.setIcon(defaultIcon)
      layer.closePopup()
    })
  }

  const onEachFeature = (feature, layer) => {
    layer.setIcon(defaultIcon)

    layer.on({
      click: () => {
        clearHighlight()
        layer.setIcon(highlightedIcon)
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
    <>
      <div className="container mt-4">
        <div className="row">
          {/* Mapa */}
          <div className="col-md-8" style={{ height: '600px' }}>
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
            <div className="d-flex justify-content-center mt-2">
              <button
                className="btn btn-outline-primary me-2"
                onClick={resetZoom}
                aria-label="Resetar zoom do mapa"
              >
                Resetar Zoom
              </button>
              <button
                className="btn btn-outline-info"
                disabled={!selectedPoint}
                onClick={() => setModalOpen(true)}
                aria-label="Abrir detalhes em modal"
              >
                Ver Detalhes
              </button>
            </div>
          </div>

          {/* Aba lateral */}
          <div
            className="col-md-4 mt-3 mt-md-0"
            style={{ height: '600px', overflowY: 'auto' }}
          >
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Detalhes do Ecoponto</h5>
                {selectedPoint ? (
                  <>
                    <h6>{selectedPoint.name}</h6>
                    {selectedPoint.image && (
                      <img
                        src={selectedPoint.image}
                        alt={selectedPoint.name}
                        className="img-fluid mb-3 rounded"
                        style={{
                          maxHeight: '200px',
                          objectFit: 'cover',
                          width: '100%',
                        }}
                      />
                    )}
                    <p>{selectedPoint.description}</p>
                    <p>
                      <strong>Telefone:</strong> {selectedPoint.telefone}
                    </p>
                    <p>
                      <strong>Coordenadas:</strong>{' '}
                      {selectedPoint.coords[0].toFixed(5)},{' '}
                      {selectedPoint.coords[1].toFixed(5)}
                    </p>
                  </>
                ) : (
                  <p className="text-muted">
                    Clique em um ecoponto no mapa para ver detalhes aqui.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Bootstrap */}
      {modalOpen && selectedPoint && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitle">
                  {selectedPoint.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Fechar"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                {selectedPoint.image && (
                  <img
                    src={selectedPoint.image}
                    alt={selectedPoint.name}
                    className="img-fluid mb-3 rounded"
                    style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
                  />
                )}
                <p>{selectedPoint.description}</p>
                <p>
                  <strong>Telefone:</strong> {selectedPoint.telefone}
                </p>
                <p>
                  <strong>Coordenadas:</strong>{' '}
                  {selectedPoint.coords[0].toFixed(5)},{' '}
                  {selectedPoint.coords[1].toFixed(5)}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
