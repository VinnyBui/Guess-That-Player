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

            //fetch data per page 
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
                //grabs data from current page
                const data = await fetchPage(nextCursor);
                //Makes a newPlayers array and checks for unique ID
                const newPlayers = data.data.filter(player => !uniquePlayerIds.has(player.id))
                //Puts data into allPlayer arrays
                allPlayers.push(...data.data);
                //Make sure to add each playerID into each item
                newPlayers.forEach(player => uniquePlayerIds.add(player.id));
                //If less new players than page, there is no more new data to be added 
                if(newPlayers.length < perPage){
                    break;
                }
                //Move onto next page
                nextCursor = data.meta.next_cursor;
                requestsMade++;
                //Make sure to stay within the API rate
                //honestly prob don't need it but maybe good for later
                if(requestsMade >= 600){
                    await new Promise(resolve => setTimeout(resolve, 60000));
                    requestsMade = 0;
                }
            }
            //Turns item into JSON file and put it in local storage
            localStorage.setItem('playersData', JSON.stringify(allPlayers));
            console.log("Player data has been saved!")
            //Retrieves data from local storage and store it in a variable
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
