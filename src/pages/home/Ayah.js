import React, { useState } from 'react';

import Player from '../../shared/Player/Player';

const Ayah = ({ ayah, toggleAudioPlaying, onAyahFinish, getTafseer }) => {
	const [copied, setCopied] = useState({
		copied: false,
		number: 0,
	});

	const copyToClipboard = (text, ayahNumber) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied({
				copied: true,
				number: ayahNumber,
			});
			setTimeout(() => {
				setCopied({
					copied: false,
					number: 0,
				});
			}, 1000);
		});
	};

	return (
		<div className="ayat_aya">
			<div className="ayat_aya-data">
				<div>
					<button className="btn btn-sm ml-1" onClick={() => getTafseer(ayah)}>
						التفسير
					</button>
					<button
						className="btn btn-sm"
						onClick={() => copyToClipboard(ayah.text, ayah.number)}
					>
						نسخ الآيه{' '}
						{copied.copied && copied.number === ayah.number ? '✓' : ''}
					</button>
				</div>
				<p className="ayat_aya-details">
					{ayah.surah.name} الآيه رقم {ayah.numberInSurah}
				</p>
			</div>

			<p
				className="ayat_aya-text"
				onClick={() => toggleAudioPlaying(ayah.number, !ayah.isPlaying)}
			>
				{ayah.text}
			</p>

			<Player
				ayahNumberInQuran={ayah.number}
				ayahNumber={ayah.numberInSurah}
				surahNumber={ayah.surah.number}
				isPlayingNow={ayah.isPlaying}
				setIsPlayingNow={(state) => toggleAudioPlaying(ayah.number, state)}
				onFinished={() => onAyahFinish(ayah.number)}
			/>
		</div>
	);
};

export default Ayah;
