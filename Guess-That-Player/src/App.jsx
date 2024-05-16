import  React, { useState } from 'react'
import searchPlayer from "../components/searchPlayer.jsx";
import './App.css'
import axios from 'axios'

function App() {
  return (
      <>
          <div>
              <h1>
                  Guess That Player
              </h1>
              <searchPlayer/>
          </div>
          <div>
              <label className="input input-bordered flex items-center gap-2">
                  Name
                  <input type="text" className="grow" placeholder="Daisy"/>
              </label>
          </div>
      </>
  )
}

export default App
