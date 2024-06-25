import React, { useState } from 'react';
import fullName from '@/components/fullName';
import { FaSearch } from "react-icons/fa";


function SearchPlayer({ playersData, setSelectedPlayer }) {
    const [input, setInput] = useState("");
    const [showResults, setShowResults] = useState(false); // State to manage the visibility of results
    const fullNameList = fullName(playersData);

    // Filter the list of names based on the input
    const filteredNames = fullNameList.filter(name =>
        name.toLowerCase().includes(input.toLowerCase())
    );

    // Event handlers to show and hide the results list
    const handleFocus = () => {
        setShowResults(true);
    };

    const handleBlur = () => {
        // Use a timeout to ensure click event on the result list gets registered before hiding it
        setTimeout(() => setShowResults(false), 100);
    };

    const handleNameClick = (name) => {
        setInput(name);
        setSelectedPlayer(name);
        setShowResults(false);
    };

    const handeKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleNameClick(input);
        }
    };

    return (
        <>
            <div className="Search-bar-container relative w-full">
                <div className="Input-wrapper relative w-full">
                    <FaSearch id="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Name"
                        value={input}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handeKeyDown}
                    />
                </div>
                {showResults && (
                    <div className="Results-list absolute top-full w-full">
                        {filteredNames.map((name, index) => (
                            <div className="Search-result cursor-pointer" 
                                key={index}
                                onClick={() => handleNameClick(name)}    
                            >
                                <p className="text-gray-800">{name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchPlayer;
