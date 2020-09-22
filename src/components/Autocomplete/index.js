import React, {useState, useEffect, useRef} from "react";

import {
  useKey,
  handleEnter,
  handleArrowUp,
  handleArrowDown,
} from "../../auxiliarFunctions/keypressFunctions";
import {magnifyGlass} from "../../assets/loupe.png";

import "./index.scss";

const Autocomplete = () => {
  useKey("Enter", handleEnter);
  useKey("ArrowUp", handleArrowUp);
  useKey("ArrowDown", handleArrowDown);

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState(false);
  //const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    setIsLoading(true);
    fetch("https://api.github.com/search/users?q=" + inputValue)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.items);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [inputValue]);

  const handleClickOutside = (event) => {
    const {current: wrap} = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const updateInput = (user) => {
    setInputValue(user);
    setDisplay(false);
  };

  return (
    <div className="mainWrapper" ref={wrapperRef}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setInputValue(event.target.elements.searchUsers.value);
          setDisplay(true);
        }}>
        <div>
          <input
            className="input"
            id="namedInput"
            type="text"
            name="searchUsers"
            aria-required="true"
            placeholder="Search Github Users"
            onChange={(event) => setInputValue(event.target.value)}
            onClick={() => setDisplay(!display)}
          />
          <img className="image" src={magnifyGlass} alt="search bar" />
        </div>
        {isLoading && <div>Loading ...</div>}
        {users === "" && <div>No Results found</div>}
        {error && <div>Loading ...</div>}
        {display && users && (
          <div className="userContainer">
            {users.map((user) => {
              const userUrl = `https://github.com/${user.login}`;
              return (
                <a
                  onClick={() => updateInput(user.login)}
                  tabIndex="0"
                  className="option"
                  key={user.id}
                  href={userUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  <div>{user.login}</div>
                  <div>
                    <img
                      className="image"
                      src={user.avatar_url}
                      alt={user.login}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};
export default Autocomplete;
