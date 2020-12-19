import React from 'react';
import useCopy from '../../shared/hooks/useCopy';

const Ayah = ({ ayah, surahNumber }) => {
	const [copyToClipboard, copied] = useCopy();

	return (
		<div className=" ayat_aya-read">
			<p className="ayat_aya-text">{ayah.text}</p>
			<span className="ayat_aya-read--number">{ayah.numberInSurah}</span>
			<span className="ayat_aya-read--actions">
				<button
					className="btn btn-sm"
					onClick={() =>
						copyToClipboard(
							ayah.text,
							ayah.number,
							surahNumber,
							ayah.numberInSurah
						)
					}
				>
					نسخ {copied.copied && copied.number === ayah.number ? '✓' : ''}
				</button>
				{/* <button className="btn btn-sm">التفسير</button> */}
			</span>
		</div>
	);
};

export default Ayah;
