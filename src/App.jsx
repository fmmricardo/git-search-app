import React from 'react'
import Autocomplete from './components/Autocomplete'

import './App.scss'

function App() {
  return (
    <div className="App">
      <div className="titleContainer">
        <h1>Search github users</h1>
      </div>
      <div className="autoContainer">
        <Autocomplete />
      </div>
    </div>
  )
}

export default App
