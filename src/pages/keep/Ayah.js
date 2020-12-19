import React from 'react';

import Player from '../../shared/Player/Player';
import useCopy from '../../shared/hooks/useCopy';

const Ayah = ({ ayah, toggleAudioPlaying, onAyahFinish, getTafseer }) => {
	const [copyToClipboard, copied] = useCopy();

	const onFinished = () => {
		if (ayah.surah.number > parseInt(localStorage.getItem('surahNumber'))) {
			localStorage.setItem('surahNumber', ayah.surah.number);

			if (ayah.numberInSurah < parseInt(localStorage.getItem('ayahNumber'))) {
				localStorage.setItem('ayahNumber', ayah.numberInSurah);
			}
		} else if (
			ayah.surah.number === parseInt(localStorage.getItem('surahNumber'))
		) {
			if (ayah.numberInSurah > parseInt(localStorage.getItem('ayahNumber'))) {
				localStorage.setItem('ayahNumber', ayah.numberInSurah);
			}
		}

		onAyahFinish(ayah.number);
	};

	const onAyahClick = () => {
		if (localStorage.getItem('addSound') === 'true') {
			toggleAudioPlaying(ayah.number, !ayah.isPlaying);
		} else {
			onFinished();
		}
	};

	return (
		<div className="ayat_aya">
			<div className="ayat_aya-data">
				<div>
					<button
						className="btn btn-sm ml-1"
						onClick={() =>
							getTafseer(
								ayah,
								`تفسير ${ayah.surah.name} الآيه رقم ${ayah.numberInSurah}`
							)
						}
					>
						التفسير
					</button>
					<button
						className="btn btn-sm"
						onClick={() =>
							copyToClipboard(
								ayah.text,
								ayah.number,
								ayah.surah.number,
								ayah.numberInSurah
							)
						}
					>
						نسخ الآيه{' '}
						{copied.copied && copied.number === ayah.number ? '✓' : ''}
					</button>
				</div>
				<p className="ayat_aya-details">
					{ayah.surah.name} الآيه رقم {ayah.numberInSurah}
				</p>
			</div>

			<p className="ayat_aya-text" onClick={() => onAyahClick()}>
				{ayah.text}
			</p>

			{localStorage.getItem('addSound') === 'true' ? (
				<Player
					ayahNumberInQuran={ayah.number}
					ayahNumber={ayah.numberInSurah}
					surahNumber={ayah.surah.number}
					isPlayingNow={ayah.isPlaying}
					setIsPlayingNow={(state) => toggleAudioPlaying(ayah.number, state)}
					onFinished={() => onFinished()}
				/>
			) : null}
		</div>
	);
};

export default Ayah;
