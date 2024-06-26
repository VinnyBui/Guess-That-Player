import  React, { useState, useEffect } from 'react'
import { fetchAllPlayers } from '@/components/fetchAllPlayers';
import randomPick from '@/components/randomPick';
import SearchPlayer from '@/components/searchPlayer';
import PlayerCard from './components/playerCard';

function App() {
    const[playersData, setPlayersData] = useState([]);
    const[randomName, setRandomName] = useState('');
    const[selectedPlayers, setSelectedPlayers] = useState([]);

    useEffect(() => {
        const storedPlayersData = localStorage.getItem('playersData');
        if (storedPlayersData) {
          const parsedPlayersData = JSON.parse(storedPlayersData);
          setPlayersData(parsedPlayersData);
          setRandomName(randomPick(parsedPlayersData));
        } else {
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
        }
      }, []);
      
    useEffect(() => {
        const storedSelectedPlayers = localStorage.getItem('selectedPlayers');
        if (storedSelectedPlayers) {
            setSelectedPlayers(JSON.parse(storedSelectedPlayers));
        }
      }, []);
    
      // Function to add a player to selected players and store in local storage
      const handleAddSelectedPlayer = (player) => {
        if (!selectedPlayers.includes(player)) {
          const updatedSelectedPlayers = [...selectedPlayers, player];
          setSelectedPlayers(updatedSelectedPlayers);
          localStorage.setItem('selectedPlayers', JSON.stringify(updatedSelectedPlayers));
        }
      };

    return (
      <>
          <div className="flex flex-col items-center gap-8 pt-20">
                <h1 className="font-bold text-5xl">
                    Guess That Player
                </h1>
                <SearchPlayer  playersData={playersData} setSelectedPlayer={handleAddSelectedPlayer}/>
                <div className="player-cards flex gap-4">
                    {selectedPlayers.map((playerName, index) => (
                        <PlayerCard key={index} selectedPlayer={playerName} playersData={playersData}/>
                    ))}
                </div>
          </div>
      </>
  )
}

export default App;
