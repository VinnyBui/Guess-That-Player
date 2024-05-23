import  React, { useState, useEffect } from 'react'
import searchPlayer from "../components/searchPlayer.jsx"
import './App.css'
import axios from 'axios'

const URL = 'https://api.balldontlie.io/v1/players/active'

function App() {

    const fetchAllPlayers = async () => {
        try {
            let allPlayers = [];
            let nextCursor = 0;
            let uniquePlayerIds = new Set();
            const perPage = 100;

            const fetchPage = async (cursor) => {
                const response = await axios.get(URL, {
                    params: {
                        cursor: cursor,
                        per_page: perPage
                    },
                    headers: {
                        'Authorization': 'fb3685fc-ad92-4790-9b3b-1f1fdeb83b17'
                    }
                });
                return response.data;
            };

            let requestsMade = 0;

            while(true){
                const data = await fetchPage(nextCursor);
                const newPlayers = data.data.filter(player => !uniquePlayerIds.has(player.id))

                allPlayers.push(...data.data);
                newPlayers.forEach(player => uniquePlayerIds.add(player.id));

                if(newPlayers.length < perPage){
                    break;
                }

                nextCursor = data.meta.next_cursor;
                requestsMade++;
                //Make sure to stay within the API rate
                if(requestsMade >= 600){
                    await new Promise(resolve => setTimeout(resolve, 60000));
                    requestsMade = 0;
                }
            }
            
        
            localStorage.setItem('playersData', JSON.stringify(allPlayers));
            console.log("Player data has been saved!")

            const playersData = JSON.parse(localStorage.getItem('playersData'))
            console.log(playersData)
        } catch (error) {
            console.error('Error fetching players:', error);
        }

    };
    
    useEffect(() => {
        fetchAllPlayers();
    }, []);

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
