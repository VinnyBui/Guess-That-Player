import React, {useState} from 'react';
import fullName from './fullName';
import { FaSearch } from "react-icons/fa"

function SearchPlayer(playersData) {
    const fullNameList = fullName(playersData);
    const [input, setInput] = useState("");

    console.log(fullNameList)
    return (
        <>
            <div className="Search-bar-container">
                {/* <label className="input input-bordered flex justify-center">
                    <input type="text" className="text-center" placeholder="Names"/>
                </label> */}
                <div className="Input-wrapper">
                    <FaSearch id="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Name"
                        value = {input}
                        onChange= {(e) => setInput(e.target.value)}
                    />
                </div>
                <div className="Search-result">
                    {fullNameList.map((name, index) => {
                        <div key={index}>
                            <p>{name}</p>
                        </div>
                    })}

                </div>
            </div>
        </>
    );
}

export default SearchPlayer;