import  React, { useState } from 'react'
import searchPlayer from "../components/searchPlayer.jsx";
import './App.css'
import axios from 'axios'

function App() {
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

export default App
