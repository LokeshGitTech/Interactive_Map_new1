import React from 'react'
import Sidebar from './Sidebar'
import Map from './Map'
import "./Home.css"

const Home = () => {
  return (
    <div>
      <div className="page-container">
        <div className="page-sidebar">
        <img className="logo" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/travel-logo-png-file-design-template-24af5b21fefb4012633e76eef51c261a_screen.jpg?ts=1566599725" />
          <Sidebar />
        </div>

        <div className="map-screen" >
          <div className="Navbar">
            <p>Navbar</p>
          </div>
          <div><b>Interactive Map</b></div>
          {/* <Villa_information/> */}
          <Map />
        </div>
      </div>
    </div>
  )
}

export default Home