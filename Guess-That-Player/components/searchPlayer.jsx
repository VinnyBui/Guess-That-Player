import React from 'react';

function SearchPlayer(props) {
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