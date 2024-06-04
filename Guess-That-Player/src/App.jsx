import  React, { useState, useEffect } from 'react'
import searchPlayer from '../components/searchPlayer.jsx';
import fetchAllPlayers from '../components/fetchAllPlayers.jsx';
import randomPick from '../components/randomPick.jsx';
import SearchPlayer from '../components/searchPlayer.jsx';


function App() {
    const[playersData, setPlayersData] = useState([]);
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
          <div className="flex flex-col items-center gap-8 pt-20">
              <h1 className="font-bold text-5xl">
                  Guess That Player
              </h1>
              <SearchPlayer  playersData={playersData}/>
          </div>
      </>
  )
}

export default App;
