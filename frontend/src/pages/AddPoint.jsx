import React, { useState } from 'react'
import axios from 'axios'

function AddPoint() {
  const [name, setName] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada pelo seu navegador.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },
      (error) => {
        alert('Erro ao obter localização: ' + error.message)
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !latitude || !longitude) {
      alert('Preencha todos os campos.')
      return
    }

    try {
      await axios.post('http://localhost:5000/api/pontos', {
        nome: name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      })
      alert('Ponto cadastrado com sucesso!')
      setName('')
      setLatitude('')
      setLongitude('')
    } catch (err) {
      console.error('Erro ao cadastrar o ponto: ' + err)
      alert('Erro ao cadastrar ponto.')
    }
  }

  return (
    <div>
      <h2>Adicionar Ponto de Coleta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nome</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Latitude</label>
          <input className="form-control" value={latitude} onChange={e => setLatitude(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Longitude</label>
          <input className="form-control" value={longitude} onChange={e => setLongitude(e.target.value)} />
        </div>
        <button type="button" className="btn btn-outline-primary me-2" onClick={handleGeolocation}>
          Usar minha localização
        </button>
        <button type="submit" className="btn btn-success">Cadastrar</button>
      </form>
    </div>
  )
}

export default AddPoint
