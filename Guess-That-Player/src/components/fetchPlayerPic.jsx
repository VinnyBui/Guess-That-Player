import axios from 'axios';

const fetchPlayerPic = async (playerName) => {
  try {
    const response = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`);
    const player = response.data.player && response.data.player[0];
    if (player) {
      return player.strCutout; // Returning only the image URL
    } else {
      throw new Error('Player not found');
    }
  } catch (error) {
    console.error('Error fetching player pic:', error);
    throw new Error('Failed to fetch player pic');
  }
};

export default fetchPlayerPic;
