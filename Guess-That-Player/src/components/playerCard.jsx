import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import fetchPlayerPic from "./fetchPlayerPic";
import { useEffect, useState } from "react";
import { fetchPlayerData } from "./fetchAllPlayers";

const PlayerCard = ({ selectedPlayer, playersData }) => {
  const [playerData, setPlayerData] = useState(null);
  const [playerPic, setPlayerPic] = useState(null);
  const [error, setError] = useState(null);
  const [displaynName, setDisplayName] = useState(selectedPlayer);

  useEffect(() => {
    if (!selectedPlayer) return;

    const player = playersData.find(player => {
      const fullName = `${player.first_name} ${player.last_name}`;
      return fullName.toLowerCase() === selectedPlayer.toLowerCase();
    });

    if (!player) {
      setError('Player not found in players data');
      return;
    }
    setDisplayName(`${player.first_name} ${player.last_name}`);

    const fetchData = async () => {
      try {
        const playerData = await fetchPlayerData(selectedPlayer);
        const imageUrl = await fetchPlayerPic(selectedPlayer); // Change the player name as needed
        setPlayerData(playerData);
        setPlayerPic(imageUrl);
      }catch (error) {
        console.error('Error fetching player card:', error);
        setError('Failed to fetch player card');
      }
    };
    fetchData();
  }, [selectedPlayer, playersData]);

  if(!selectedPlayer || error){
    return null;
  }

    return(
        <>
            <Card className='flex flex-col items-center'>
                <CardHeader>
                    <CardTitle>{displaynName}</CardTitle>
                    {playerData && <CardDescription>Position: {playerData.position}</CardDescription>}
                </CardHeader>
                {playerPic ? (
                    <img src={playerPic} alt={selectedPlayer} className="player-image" />
                ) : (
                    <p>No image available</p>
                )}
                <CardContent>
                  {playerData && (
                    <>
                      <p>Height: {playerData.height}</p>
                      <p>Jersey number: {playerData.jersey_number}</p>
                      <p>Team: {playerData.team.city}</p>
                      <p>Division: {playerData.team.division}</p>
                      <p>Conference: {playerData.team.conference}</p>
                      <p>Draft Year: {playerData.draft_year}</p>
                    </>
                  )}
                </CardContent>
            </Card>
        </>
    );
};

export default PlayerCard;