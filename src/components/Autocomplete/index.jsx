import React, { useState, useEffect, useRef } from 'react'

import SearchUsers from './SearchUsers'

import './index.scss'

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [display, setDisplay] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!inputValue) {
      return
    }
    // eslint-disable-next-line no-console
    const timer = setTimeout(() => {
      setIsLoading(true)
      fetch(`https://api.github.com/search/users?q=${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.items)
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        })
    }, 300)

    return () => clearTimeout(timer)
  }, [inputValue])

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef

    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false)
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  })

  const clickHandler = (user) => {
    if (Array.isArray(users) && users.length) {
      setDisplay(false)
    } else {
      setInputValue(user)
      setDisplay(false)
    }
  }

  return (
    <div className="mainWrapper" ref={wrapperRef}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setInputValue(event.target.elements.searchUsers.value)
          setDisplay(true)
        }}
      >
        <div>
          <input
            className="input"
            id="namedInput"
            type="text"
            name="searchUsers"
            aria-required="true"
            placeholder="Search Github Users"
            onChange={(event) => setInputValue(event.target.value)}
            onClick={clickHandler}
          />
        </div>
        {isLoading && <div>Loading ...</div>}
        {display && users && <SearchUsers users={users} />}
      </form>
    </div>
  )
}

export default Autocomplete
