import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchWikipedia = async (event) => {
    if (event.key === "Enter") {
      setIsLoading(true);
      setSearchResults([]);

      const url = `https://apis.ccbp.in/wiki-search?search=${searchInput}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      const { search_results } = jsonData;
      setSearchResults(search_results);
      setIsLoading(false);
    }
  };

  const createAndAppendSearchResult = (result) => {
    const { link, title, description } = result;

    return (
      <div className="result-item" key={link}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="result-title"
        >
          {title}
        </a>
        <br />
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="result-url"
        >
          {link}
        </a>
        <br />
        <p className="link-description">{description}</p>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="wiki-search-header">
        <img
          className="wiki-logo"
          src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/wiki-logo-img.png"
          alt="Wiki Logo"
        />
        <input
          type="search"
          className="search-input"
          placeholder="Type a keyword and press Enter to search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={searchWikipedia}
        />
      </div>
      {isLoading && (
        <div className="spinner">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="search-results">
        {searchResults.map(createAndAppendSearchResult)}
      </div>
    </div>
  );
}

export default App;
