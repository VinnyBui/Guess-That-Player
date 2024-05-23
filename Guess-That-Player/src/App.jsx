import  React, { useState, useEffect } from 'react'
import searchPlayer from "../components/searchPlayer.jsx"
import { fetchAllPlayers } from '../components/fetchAllPlayers.jsx'
import './App.css'


function App() {

    fetchAllPlayers();

    return (
      <>
          <div className="flex flex-col items-center gap-8">
              <h1 className="font-bold text-5xl">
                  Guess That Player
              </h1>
              {searchPlayer()}
          </div>
      </>
  )
}

export default App;
