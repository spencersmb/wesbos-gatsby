import React from 'react';
import { Link, navigate } from 'gatsby';

// good to know
function goToSlicers() {
  setTimeout(() => {
    navigate('/sliceMasters', { replace: true }).then((r) => {
      console.log('nav', r);
    });
  }, 2000);
}

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/pizzas'>Menu</Link>
        </li>
        <li>
          <Link to='/'>Logo</Link>
        </li>
        <li>
          <Link to='/sliceMasters'>Slice Masters</Link>
        </li>
        <li>
          <Link to='/order'>Order Ahead</Link>
        </li>
        <li>
          <button type='button' onClick={goToSlicers}>
            My Button
          </button>
        </li>
      </ul>
    </nav>
  );
}
