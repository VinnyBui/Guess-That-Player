const fullName = (playersData) => {
    const fullNameList = [];
    if(playersData){
        playersData ? playersData.map(player => {
            fullNameList.push(`${player.first_name} ${player.last_name}`)
        }) : [];
    }
    
    return fullNameList;
    
}


export default fullName;