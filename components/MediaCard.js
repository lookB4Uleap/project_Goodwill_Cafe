// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
// import '../styles/globals.css'

const MediaCard = ({title, subtitle,icon, color}) => {
  return (
    <div className='Card-Container'>
      <div className='Card-Title'>{title}</div>
      <div className='Card-Subtitle'>{subtitle}</div>
      <div className='Card-Image-Container'>
        <FontAwesomeIcon icon={icon} className='Card-Image'  style={{ color: `${color}` }} />
      </div>
    </div>
  )
}

export default MediaCard
