import React from 'react';

import ALL from '../../assets/all.svg';

const SVG = ({ name }) => {
	return (
		<svg>
			<use xlinkHref={`${ALL}#${name}`}></use>
		</svg>
	);
};

export default SVG;
