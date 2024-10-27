import React from 'react'
import { SideBar } from '../Components/SideBar'
// import styles from './AppLayout.module.css'
import styles from './AppLayout.module.css'
import Map from '../Components/map'

export const AppLayout = () => {
  return (
    <div className={styles.app} >
      <SideBar/>
      <Map/>
    </div>
  )
}
