import React, { useState } from 'react';
import fullName from '@/components/fullName';
import { FaSearch } from "react-icons/fa";


function SearchPlayer({ playersData }) {
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

    return (
        <>
            <div className="Search-bar-container">
                <div className="Input-wrapper">
                    <FaSearch id="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Name"
                        value={input}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                {showResults && (
                    <div className="Results-list">
                        {filteredNames.map((name, index) => (
                            <div className="Search-result" key={index}>
                                <p>{name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchPlayer;
