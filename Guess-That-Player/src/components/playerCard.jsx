import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import fetchPlayerPic from "./fetchPlayerPic";
import { useEffect, useState } from "react";

const PlayerCard = () => {
    const [playerPic, setPlayerPic] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const imageUrl = await fetchPlayerPic('Stephen Curry'); // Change the player name as needed
          setPlayerPic(imageUrl);
        } catch (error) {
          console.error('Error fetching player pic:', error);
          setError('Failed to fetch player pic');
        }
      };
      fetchData();
    }, []);
    return(
        <>
            <Card className='flex flex-col items-center'>
                <CardHeader>
                    <CardTitle>Stephen Curry</CardTitle>
                    <CardDescription>Position: G</CardDescription>
                </CardHeader>
                {playerPic ? (
                    <img src={playerPic} alt="Player" className="player-image" />
                ) : (
                    <p>No image available</p>
                )}
                <CardContent>
                    <p>Height: 6-2</p>
                    <p>Jersey number: 30</p>
                    <p>Team: Golden State Warriors</p>
                    <p>Division: Pacific</p>
                    <p>Conference: West</p>
                    <p>Draft Year: 2009</p>
                </CardContent>
            </Card>
        </>
    );
};

export default PlayerCard;