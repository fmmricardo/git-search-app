import React, {useState, useEffect, useRef} from "react";
import "./App.css";

//
//Create effect for tracking keys
//
const useKey = (key, cb) => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    if (even.code === key) {
      callbackRef(event);
    }

    document.addEventListener("keypress", handle);
    return () => {
      document.removeEventListener("keypress", handle);
    };
  }),
    [key];
};

//
//End Create effect for tracking keys
//

function App() {
  usekey("Enter", handleEnter);
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
    setSearch(user);
    setDisplay(false);
  };

  return (
    <>
      <form
        ref={wrapperRef}
        onSubmit={(event) => {
          event.preventDefault();
          setInputValue(event.target.elements.query.value);
          setDisplay(true);
        }}>
        <div className="App">
          <input
            id="namedInput"
            type="text"
            name="query"
            name="searchUsers"
            value={search}
            aria-label={labelText}
            aria-required="true"
            placeholder="Search Github Users"
            onChange={(event) => setSearch(event.target.value)}
            onClick={() => setDisplay(!display)}
          />
        </div>
      </form>
      {isLoading && <div>Loading ...</div>}
      {error && (
        <div>
          `Sorry something went wrong. We found the following error ${error}`
        </div>
      )}
      {users === "" && <div>No Results found</div>}

      {display && (
        <div>
          {users.map((user) => {
            return (
              <div onClick={() => updateInput(user.login)} tabIndex="0">
                <li key={user.id}>{user.login}</li>
                <img src={user.avatar_url} alt={user.login} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
