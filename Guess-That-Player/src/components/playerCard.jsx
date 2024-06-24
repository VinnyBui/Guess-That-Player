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
import { checkName } from "./fullName";

const PlayerCard = ({ selectedPlayer }) => {
  const [playerData, setPlayerData] = useState(null);
  const [playerPic, setPlayerPic] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedPlayer) return;

    const fetchData = async () => {
      try {
        let index = checkName(selectedPlayer);
        
        if (index !== -1) {
          const data = await fetchPlayerData(index);
          const imageUrl = await fetchPlayerPic(selectedPlayer);
          setPlayerData(data);
          setPlayerPic(imageUrl);
      } else {
          setError('Player not found');
      }
      
        // const playerData = await fetchPlayerData();
        // const imageUrl = await fetchPlayerPic(selectedPlayer); // Change the player name as needed
        // setPlayerData(playerData);
        // setPlayerPic(imageUrl);
      }catch (error) {
        console.error('Error fetching player card:', error);
        setError('Failed to fetch player card');
      }
    };
    fetchData();
  }, [selectedPlayer]);

  if(!selectedPlayer){
    return null;
  }

    return(
        <>
            <Card className='flex flex-col items-center'>
                <CardHeader>
                    <CardTitle>{selectedPlayer}</CardTitle>
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