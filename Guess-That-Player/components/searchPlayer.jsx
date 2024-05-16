import React from 'react';

function SearchPlayer(props) {
    return (
        <>
            <div className="flex items-center">
                <label className="input input-bordered">
                    <input type="text" className="" placeholder="Name"/>
                </label>
            </div>
        </>
    );
}

export default SearchPlayer;