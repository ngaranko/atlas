import React from 'react'
import './Icon.scss'

export interface IconProps {
  icon: string
}

const Icon: React.FC<IconProps> = ({ icon }) => (
  <span
    className={`
      rc-icon
      rc-icon--${icon}
    `}
  />
)

export default Icon
