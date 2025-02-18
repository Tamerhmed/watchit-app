import React from 'react';
import Search from './Search';

export default function Navbar() {
  return (
    <nav className='nav-bar'>
      <div className='logo'>
        <span role='img'>🎬</span>
        <h1>WatchIt</h1>
      </div>
      <Search />
    </nav>
  );
}
