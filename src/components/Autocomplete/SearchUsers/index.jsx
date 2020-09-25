import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const SearchUsers = (props) => {
  const { users } = props

  return (
    <div className="userContainer">
      {users.map((user) => {
        const userUrl = `https://github.com/${user.login}`

        return (
          <div key={user.id}>
            <a
              tabIndex="0"
              className="option"
              href={userUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text">{user.login}</div>
              <div>
                <img className="image" src={user.avatar_url} alt={user.login} />
              </div>
            </a>
          </div>
        )
      })}
    </div>
  )
}

SearchUsers.propTypes = {
  users: PropTypes.array.isRequired,
}
export default SearchUsers
