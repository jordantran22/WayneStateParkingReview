import React from 'react';
import wsu_logo from '../images/wsuLogo.png';

const NavBar = () => {
  return (
    <div>

        <div>
            
            <ul className="navbar">
                {/* <li>
                    <img className="wsuLogo" src={wsu_logo} alt="logo"/>
                </li> */}

                <li className="navbarTab">
                    Home
                </li>

                <li className="navbarTab">
                    Parking Structures
                </li>

                <li className="navbarTab">
                    Reviews
                </li>
            </ul>
        </div>


    </div>
  )
};

export default NavBar;
