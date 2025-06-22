import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // test only
  const [barangays, setBarangays] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/barangays/')
      .then(response => {
        console.log('Barangays endpoint data:', response.data) // <-- Log to console
        setBarangays(response.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <h1>Barangays</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {barangays.map((barangay, idx) => (
            <li key={barangay.id || idx}>{barangay.barangay_name}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App
