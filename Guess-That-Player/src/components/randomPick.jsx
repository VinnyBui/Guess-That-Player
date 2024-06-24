import { fullName } from "./fullName";

const randomPick = (playersData) => {
    const fullNameList = fullName(playersData);
    const randomIndex = Math.floor(Math.random() * fullNameList.length);
    return fullNameList[randomIndex];
}

export default randomPick;
