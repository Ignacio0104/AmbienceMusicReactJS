import React from 'react'
import UserProfile from '../UserProfile'

function Profile(props) {
  return (
    <div>
      <UserProfile changeLogin={props.actionLogin}></UserProfile>
    </div>
  )
}

export default Profile
