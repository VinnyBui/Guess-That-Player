import React from 'react';

function SearchPlayer(props) {
    return (
        <>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Name
                    <input type="text" className="grow" placeholder="Name"/>
                </label>
            </div>
        </>
    );
}

export default SearchPlayer;