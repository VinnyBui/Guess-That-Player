import  React, { useState, useEffect } from 'react'
import searchPlayer from '../components/searchPlayer.jsx';
import fetchAllPlayers from '../components/fetchAllPlayers.jsx';
import randomPick from '../components/randomPick.jsx';
import './App.css'

function App() {
    const[playersData, setPlayersData] = useState(null);
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllPlayers();
                setPlayersData(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchData();
    }, []);

    const name = randomPick(playersData)
    


    return (
      <>
          <div className="flex flex-col items-center gap-8">
              <h1 className="font-bold text-5xl">
                  Guess That Player
              </h1>
              {searchPlayer(playersData)}
          </div>
      </>
  )
}

export default App;
