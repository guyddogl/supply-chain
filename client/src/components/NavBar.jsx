import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logox64.png';
import AppContext from '../context/AppContext';

export default function NavBar() {
  const { currentUser, setCurrentUser, setIsUserLoggedIn } = useContext(AppContext);

  const location = useLocation();

  const navigate = useNavigate();

  const logUserOut = () => {
    setCurrentUser(null);
    setIsUserLoggedIn(false);
    navigate('/login');
  };

  const checkNavLinkActive = (nav, path) => (nav === path ? 'nav-link-active' : '');

  return (
    <nav className="navbar navbar-expand-lg bg-light border">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="42" height="42" className="d-inline-block align-text-top" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-1">
              <Link className={`nav-link ${checkNavLinkActive('/', location.pathname)}`} to="/">Home</Link>
            </li>
            <li className="nav-item mx-1">
              <Link className={`nav-link ${checkNavLinkActive('/fabricantes', location.pathname)}`} to="/fabricantes">Fabricantes</Link>
            </li>
            <li className="nav-item mx-1">
              <Link className={`nav-link ${checkNavLinkActive('/mercadorias', location.pathname)}`} to="/mercadorias">Mercadorias</Link>
            </li>
            <li className="nav-item mx-1">
              <Link className={`nav-link ${checkNavLinkActive('/relatorios', location.pathname)}`} to="/relatorios">Relatórios</Link>
            </li>
          </ul>
          <span className="navbar-text">
            Olá,
            {' '}
            <b>{currentUser.username}</b>
          </span>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={logUserOut}
          >
            <i className="fa-solid fa-right-from-bracket" />
          </button>
        </div>
      </div>
    </nav>
  );
}
