import  React, { useState, useEffect } from 'react'
import searchPlayer from "../components/searchPlayer.jsx";
import './App.css'
import axios, { all } from 'axios'

const URL = 'https://api.balldontlie.io/v1/players/active'

function App() {

    const fetchAllPlayers = async () => {
        try {
            let allPlayers = [];
            let nextCursor = 0;
    
            const fetchPage = async (cursor) => {
                const response = await axios.get(URL, {
                    params: {
                        cursor: cursor,
                        per_page: 100
                    },
                    headers: {
                        'Authorization': 'fb3685fc-ad92-4790-9b3b-1f1fdeb83b17'
                    }
                });
                return response.data;
            };

            let requestsMade = 0;
            do {
                const data = await fetchPage(nextCursor);
                allPlayers.push(...data.data);
                nextCursor = data.meta.next_cursor;
                requestsMade++;
                console.log(allPlayers)
                //Make sure to stay within the API rate limit
                if(requestsMade >= 600){
                    await new Promise(resolve => setTimeout(resolve, 60000));
                    requestsMade = 0;
                }
            } while (nextCursor !== null);
            
            //Convert data into JSON string
            const jsonData = JSON.stringify(allPlayers, null, 2);

            //Specify the path
            const filePath = path.resolve('public', 'player.json');

            //Write code to file
            fs.writeFileSync(filePath, jsonData);
            
            console.log("Player data has been saved!")
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
