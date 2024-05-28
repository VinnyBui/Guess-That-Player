import  React, { useState, useEffect } from 'react'
import searchPlayer from '../components/searchPlayer.jsx';
import fetchAllPlayers from '../components/fetchAllPlayers.jsx';
import randomPick from '../components/randomPick.jsx';
import './App.css'

function App() {
    const[playersData, setPlayersData] = useState(null);
    const[randomName, setRandomName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllPlayers();
                setPlayersData(data);
                setRandomName(randomPick(data));
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchData();
    }, []);

    return (
      <>
          <div className="flex flex-col items-center gap-8">
              <h1 className="font-bold text-5xl">
                  Guess That Player
              </h1>
              <h1 className="font-bold text-3xl">
                    {randomName}
                </h1>
              {searchPlayer(playersData)}
          </div>
      </>
  )
}

export default App;
