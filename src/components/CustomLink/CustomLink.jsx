import { NavLink } from 'react-router-dom';
import './CustomLink.css';

const CustomLink = ({ link, nameLink, onClick }) => {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) => (isActive ? 'active' : '')}
        onClick={onClick}
      >
        {nameLink}
      </NavLink>
    </li>
  );
};

export default CustomLink;
