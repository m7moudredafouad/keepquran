import React, { Fragment, useEffect, useRef, useState } from 'react';

import SHIEKH from '../SHIEKH';

import SVG from '../SVG/SVG';
const Player = ({
	ayahNumberInQuran,
	ayahNumber,
	surahNumber,
	onFinished,
	isPlayingNow,
	setIsPlayingNow,
}) => {
	const audioRef = useRef('audio_tag');

	const [favShiek, setFavShiekh] = useState('abdulbasitmurattal');
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(null);

	useEffect(() => {
		if (!isPlayingNow) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
	}, [isPlayingNow]);

	useEffect(() => {
		let localStFavShiek = localStorage.getItem('shiekh');

		SHIEKH.forEach((person) => {
			if (localStFavShiek === person.identifier) {
				setFavShiekh(person.identifier);
				return;
			}
		});
	}, []);

	const toggle = () => {
		if (isPlayingNow) {
			audioRef.current.pause();
			setIsPlayingNow(false);
		} else {
			audioRef.current.play();
			setIsPlayingNow(true);
		}
	};

	const resetTime = () => {
		audioRef.current.currentTime = 0;
		setIsPlayingNow(true);
		audioRef.current.play();
	};

	const renderTimer = () => {
		if (!duration) return 'Error';

		let currentMinutes = Math.floor((duration - currentTime) / 60);
		let currentSeconds = Math.ceil(
			duration - currentTime - currentMinutes * 60
		);

		if (currentSeconds < 10) {
			currentSeconds = '0' + currentSeconds;
		}
		if (currentMinutes < 10) {
			currentMinutes = '0' + currentMinutes;
		}

		return currentMinutes + ':' + currentSeconds;
	};

	const audioFinished = () => {
		setIsPlayingNow(false);

		if (surahNumber > parseInt(localStorage.getItem('surahNumber'))) {
			localStorage.setItem('surahNumber', surahNumber);

			if (ayahNumber < parseInt(localStorage.getItem('ayahNumber'))) {
				localStorage.setItem('ayahNumber', ayahNumber);
			}
		} else if (surahNumber === parseInt(localStorage.getItem('surahNumber'))) {
			if (ayahNumber > parseInt(localStorage.getItem('ayahNumber'))) {
				localStorage.setItem('ayahNumber', ayahNumber);
			}
		}

		onFinished();
	};

	return (
		<Fragment>
			<audio
				ref={audioRef}
				src={`http://cdn.alquran.cloud/media/audio/ayah/ar.${favShiek}/${ayahNumberInQuran}/low`}
				type="audio/mpeg"
				onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
				onCanPlay={(e) => setDuration(e.target.duration)}
				onEnded={audioFinished}
			></audio>
			<div className="player">
				<div className="player_controls">
					<div className="player_controls-control" onClick={toggle}>
						<SVG name={`icon-media-${isPlayingNow ? 'pause' : 'play'}`} />
					</div>
					<div className="player_controls-replay" onClick={resetTime}>
						<SVG name="icon-replay" />
					</div>
				</div>
				<div className="player_progress">
					<div
						className="player_progress-meter"
						style={{
							width: (currentTime / audioRef.current.duration) * 100 + '%',
						}}
					></div>
				</div>
				<div className="player_timer">
					<span>{renderTimer()}</span>
				</div>
			</div>
		</Fragment>
	);
};

export default Player;
