import { useEffect, useState } from 'react'
import './App.css'

const apiUrl = import.meta.env.VITE_API_URL + '/status'

function App() {
  const [initialData, setInitialData] = useState({ appName: '', appVersion: '' })

  useEffect(() => {
    fetch(apiUrl)
      .then((result) => result.json())
      .then(({ data }) => setInitialData(data))
  }, [])

  return (
    <div className="App">
      Welcome to: {initialData.appName} v{initialData.appVersion}
    </div>
  )
}

export default App
