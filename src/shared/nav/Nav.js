import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SHIEKH from '../SHIEKH';

const Nav = () => {
	const [autoState, setAutoState] = useState(
		localStorage.getItem('autoPlay') === 'true' ? true : false
	);

	const [addSoundState, setAddSoundState] = useState(
		localStorage.getItem('addSound') === 'true' ? true : false
	);

	const changeAutoPlay = (state) => {
		localStorage.setItem('autoPlay', state);
		setAutoState(state);
	};

	const changeAddSound = (state) => {
		localStorage.setItem('addSound', state);
		setAddSoundState(state);
	};

	const changeShiekh = (shiekh) => {
		localStorage.setItem('shiekh', shiekh);
	};
	const renderShiek = () => {
		let favShiekh = localStorage.getItem('shiekh');
		return SHIEKH.map((person) => {
			return (
				<option
					value={person.identifier}
					key={person.identifier}
					selected={favShiekh === person.identifier}
				>
					{person.name}
				</option>
			);
		});
	};

	return (
		<nav className="nav">
			<ul className="nav_list">
				<Link to="/" className="nav_list-link">
					<li>الرئيسيه</li>
				</Link>
				<a className="nav_list-link dropdown">
					<li>الاعدادات</li>
					<ul className="dropdown_main">
						<li className="dropdown_item">
							<div className="dropdown_item-check">
								<p>تشغيل تلقائي</p>
								<label className="switch">
									<input
										type="checkbox"
										checked={autoState}
										onChange={(e) => changeAutoPlay(e.target.checked)}
									/>
									<span className="switch_slider switch_slider-round"></span>
								</label>
							</div>
						</li>
						<li className="dropdown_item">
							<div className="dropdown_item-check">
								<p>اضافه الصوت</p>
								<label className="switch">
									<input
										type="checkbox"
										checked={addSoundState}
										onChange={(e) => changeAddSound(e.target.checked)}
									/>
									<span className="switch_slider switch_slider-round"></span>
								</label>
							</div>
						</li>
						<li className="dropdown_item">
							<form className="form dFlexCoulmn mt-2">
								<select
									className="form_input form_input-dropdown"
									onChange={(e) => changeShiekh(e.target.value)}
								>
									{renderShiek()}
								</select>
							</form>
						</li>
					</ul>
				</a>

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
