import React from 'react';
import fullName from './fullName';

function SearchPlayer(playersData) {
    const fullNameList = fullName(playersData);
    return (
        <>
            <div className="flex items-center">
                <label className="input input-bordered flex justify-center">
                    <input type="text" className="text-center" placeholder="Names"/>
                </label>
            </div>
        </>
    );
}

export default SearchPlayer;