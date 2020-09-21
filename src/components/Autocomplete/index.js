import React, {useState, useEffect, useRef} from "react";

import {
  useKey,
  handleEnter,
  handleArrowUp,
  handleArrowDown,
} from "../../auxiliarFunctions/keypressFunctions";

import "../../styles/main.scss";

const Autocomplete = () => {
  useKey("Enter", handleEnter);
  useKey("ArrowUp", handleArrowUp);
  useKey("ArrowDown", handleArrowDown);

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
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
        console.log(data.items);
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
            value={search}
            aria-required="true"
            placeholder="Search Github Users"
            onChange={(event) => setSearch(event.target.value)}
            onClick={() => setDisplay(!display)}
          />
        </div>
      </form>
      {isLoading && <div>Loading ...</div>}
      {users === "" && <div>No Results found</div>}
      {display && (
        <div className="autoContainer">
          {users.map((user) => {
            const userUrl = `https://github.com/${user.login}`;
            return (
              <div
                className="option"
                onClick={() => updateInput(user.login)}
                tabIndex="0">
                <a
                  key={user.id}
                  href={userUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  <li>{user.login}</li>
                  <img src={user.avatar_url} alt={user.login} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Autocomplete;
