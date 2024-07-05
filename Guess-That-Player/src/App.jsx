import React, { useState, useEffect } from 'react'
import { fetchAllPlayers } from '@/components/fetchAllPlayers';
import randomPick from '@/components/randomPick';
import SearchPlayer from '@/components/searchPlayer';
import PlayerCard from './components/playerCard';

function App() {
    const [playersData, setPlayersData] = useState([]);
    const [randomName, setRandomName] = useState(null);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    useEffect(() => {
        const storedPlayersData = localStorage.getItem('playersData');
        if (storedPlayersData) {
            const parsedPlayersData = JSON.parse(storedPlayersData);
            setPlayersData(parsedPlayersData);
        } else {
            const fetchData = async () => {
                try {
                    const data = await fetchAllPlayers();
                    setPlayersData(data);
                    localStorage.setItem('playersData', JSON.stringify(data));
                } catch (error) {
                    console.error('Error fetching players:', error);
                }
            };
            fetchData();
        }
    }, []);

    //pick random name after playersData is set
    useEffect(() => {
        if (playersData.length > 0) {
            const sessionRandomName = localStorage.getItem('sessionRandomName');
            if (sessionRandomName) {
                setRandomName(sessionRandomName);
            } else {
                const newRandomName = randomPick(playersData);
                setRandomName(newRandomName);
                localStorage.setItem('sessionRandomName', newRandomName);
            }
        }
    }, [playersData]);

    useEffect(() => {
        const storedSelectedPlayers = localStorage.getItem('selectedPlayers');
        if (storedSelectedPlayers) {
            setSelectedPlayers(JSON.parse(storedSelectedPlayers));
        }
    }, []);
    
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
                <SearchPlayer playersData={playersData} setSelectedPlayer={handleAddSelectedPlayer} />
                <h2>{randomName}</h2>
                <div className="player-cards flex gap-4">
                    {selectedPlayers.map((playerName, index) => (
                        <PlayerCard key={index} selectedPlayer={playerName} playersData={playersData} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
