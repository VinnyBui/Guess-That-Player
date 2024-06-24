let fullNameList = [];

const fullName = (playersData) => {
    fullNameList = [];
    if(playersData){
        playersData ? playersData.map(player => {
            fullNameList.push(`${player.first_name} ${player.last_name}`)
        }) : [];
    }
    
    return fullNameList;
    
}

const checkName = (selectedName) => {
    if (selectedName) {
        const index = fullNameList.findIndex(name => name === selectedName);
        return index !== -1 ? index : -1; // Return index as an integer, -1 if not found
    }
    return -1; //if selectedName is not found
}

export {fullName, checkName};