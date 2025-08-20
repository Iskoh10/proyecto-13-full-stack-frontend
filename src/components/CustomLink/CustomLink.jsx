import { NavLink } from 'react-router-dom';
import './CustomLink.css';

const CustomLink = ({ link, nameLink }) => {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {nameLink}
      </NavLink>
    </li>
  );
};

export default CustomLink;
