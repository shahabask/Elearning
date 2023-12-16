

import React, { useState } from 'react'
import LiveManagement from './LiveManagement';
import LiveNavbar from './LIveNavbar';
import OngoingLive from './OngoingLive';
import LiveHistory from './LiveHistory';

function AllLives() {

    const [selectedNavItem, setSelectedNavItem] = useState('Scheduled Live');

    const handleNavItemClick = (itemName) => {
      setSelectedNavItem(itemName);
    };
  return (
    <>
    <LiveNavbar onNavItemClick={handleNavItemClick} />
    <div className="" style={{ backgroundColor: '#FDF8EE' }}>
      {selectedNavItem === 'Scheduled Live' && <LiveManagement />}
      {selectedNavItem === 'Ongoing' && <OngoingLive />}
      {selectedNavItem === 'History' && <LiveHistory />}
    </div>
  </>
  )
}

export default AllLives