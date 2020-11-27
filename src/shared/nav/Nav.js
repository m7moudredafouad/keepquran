import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<nav className="nav">
			<ul className="nav_list">
				<Link to="/" className="nav_list-link">
					<li>الرئيسيه</li>
				</Link>
				<Link to="/about" className="nav_list-link">
					<li>من نحن</li>
				</Link>
			</ul>
			<Link to="/" className="nav_logo nav_list-link">
				احفظ القرآن
			</Link>
		</nav>
	);
};

export default Nav;
