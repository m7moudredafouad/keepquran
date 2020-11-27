import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Account from './Account';
import Modal from '../../shared/modal/Modal';
import Ayah from './Ayah';

const reducer = (state, action) => {
	let newState;
	switch (action.type) {
		case 'CHANE_DETAILS':
			return {
				...state,
				ayahNumber: action.payload.ayahNumber,
				ayahNumberInQuran: action.payload.ayahNumberInQuran,
				surahNumber: action.payload.surahNumber,
				pageNumber: action.payload.pageNumber,
			};

		case 'newPage':
			return {
				...state,
				pageAyahs: action.payload.ayahs,
			};

		case 'UPDATE_AYAH':
			newState = { ...state };
			newState.isPageEnded = true;
			newState.pageAyahs.forEach((ayah) => {
				if (ayah.number === action.payload.number) {
					ayah.isFinished = true;
				}

				if (ayah.number === action.payload.number + 1) {
					if (!ayah.isFinished) {
						newState.addAyah = newState.addAyah + 1;
					}
					ayah.isReady = true;

					if (newState.autoPlay) {
						ayah.isPlaying = true;
					}
				}

				newState.isPageEnded = newState.isPageEnded && ayah.isFinished;
			});

			return newState;

		case 'ADD_TAFSEER':
			newState = { ...state };
			newState.pageAyahs.forEach((ayah) => {
				if (ayah.number === action.payload.number) {
					ayah.tafseer = action.payload.tafseer;
					return;
				}
			});
			return newState;

		case 'STOP_ALL':
			newState = { ...state };
			newState.pageAyahs.forEach((ayah) => {
				if (ayah.number === action.payload.number) {
					ayah.isPlaying = action.payload.state;
				} else {
					ayah.isPlaying = false;
				}
			});
			return newState;

		case 'RESET_ISPAGEENDED':
			return {
				...state,
				isPageEnded: action.payload.state,
			};

		case 'UPDATE_AUTOPLAY':
			return {
				...state,
				autoPlay: action.payload.state,
			};
		default:
			return state;
	}
};

const Home = () => {
	const myHistory = useHistory();

	const [showModal, setShowModal] = useState({
		show: false,
		text: null,
	});

	const [keepState, dispatch] = useReducer(reducer, {
		ayahNumber: parseInt(localStorage.getItem('ayahNumber')) || 1,
		ayahNumberInQuran: undefined,
		surahNumber: parseInt(localStorage.getItem('surahNumber')) || 1,
		pageNumber: undefined,
		autoPlay: localStorage.getItem('autoPlay') === 'true' ? true : false,
		pageAyahs: [],
		isPageEnded: false,
		addAyah: 0,
	});

	const validateAyah = (ayahNumber = 0) => {
		fetch(
			`${process.env.REACT_APP_ALQURAN_API}/surah/${
				keepState.surahNumber
			}?offset=${(ayahNumber || keepState.ayahNumber) - 1}&limit=1`
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.code === 404) {
					localStorage.setItem('ayahNumber', 1);
					localStorage.setItem('surahNumber', 1);
					localStorage.setItem('pageNumber', 1);
					return myHistory.push('/');
				}

				if (typeof data.data.ayahs === 'string') {
					return validateAyah(1);
				}

				dispatch({
					type: 'CHANE_DETAILS',
					payload: {
						ayahNumber: data.data.ayahs[0].numberInSurah,
						ayahNumberInQuran: data.data.ayahs[0].number,
						surahNumber: data.data.number,
						pageNumber: data.data.ayahs[0].page,
					},
				});

				localStorage.setItem('ayahNumber', data.data.ayahs[0].numberInSurah);
				localStorage.setItem('surahNumber', data.data.number);
				localStorage.setItem('pageNumber', data.data.ayahs[0].page);
			});
	};

	const getPage = () => {
		fetch(`${process.env.REACT_APP_ALQURAN_API}/page/${keepState.pageNumber}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.code === 404) {
					return myHistory.push('/');
				}

				let newAyahs = data.data.ayahs;
				let isPageFinished = true;
				newAyahs = newAyahs.map((ayah) => {
					delete ayah.juz;
					delete ayah.manzil;
					delete ayah.ruku;
					delete ayah.hizbQuarter;
					delete ayah.surah.englishName;
					delete ayah.surah.englishNameTranslation;
					delete ayah.surah.revelationType;

					ayah.isReady = ayah.number <= keepState.ayahNumberInQuran;
					ayah.isFinished = ayah.number <= keepState.ayahNumberInQuran;

					isPageFinished = isPageFinished && ayah.isFinished;

					ayah.isPlaying = false;
					ayah.tafseer = null;
					return ayah;
				});

				newAyahs[0].isReady = true;

				dispatch({
					type: 'RESET_ISPAGEENDED',
					payload: { state: isPageFinished },
				});
				dispatch({ type: 'newPage', payload: { ayahs: newAyahs } });
			});
	};

	useEffect(() => {
		validateAyah();
	}, []);

	useEffect(() => {
		if (keepState.pageNumber) {
			getPage();
			localStorage.setItem('pageNumber', keepState.pageNumber);
		}
	}, [keepState.pageNumber]);

	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
	}, [keepState.addAyah]);

	const nextPage = () => {
		dispatch({ type: 'RESET_ISPAGEENDED', payload: { state: false } });

		dispatch({
			type: 'CHANE_DETAILS',
			payload: {
				ayahNumber: keepState.ayahNumber,
				ayahNumberInQuran: keepState.ayahNumberInQuran,
				surahNumber: keepState.surahNumber,
				pageNumber: parseInt(localStorage.getItem('pageNumber')) + 1,
			},
		});
	};

	const toggleAudioPlaying = (ayahNumber, state) => {
		dispatch({
			type: 'STOP_ALL',
			payload: { number: ayahNumber, state },
		});
	};

	const onAyahFinish = (number) => {
		dispatch({
			type: 'UPDATE_AYAH',
			payload: { number: number },
		});
	};

	const getTafseer = (ayah) => {
		if (ayah.tafseer != null) {
			return viewModal(ayah.tafseer);
		} else {
			viewModal('Loading..');
			fetch(`${process.env.REACT_APP_TAFSEER}/${ayah.number}/ar.muyassar`)
				.then((res) => res.json())
				.then((data) => {
					if (data.status === 404) {
						hideModal();
						return;
					}
					dispatch({
						type: 'ADD_TAFSEER',
						payload: { number: ayah.number, tafseer: data.data.text },
					});
					viewModal(data.data.text);
				});
		}
	};

	const viewModal = (text) => {
		setShowModal({
			show: true,
			text,
		});
	};

	const hideModal = () => {
		setShowModal({
			show: false,
			text: null,
		});
	};

	const changeAutoState = () => {
		localStorage.setItem('autoPlay', !keepState.autoPlay);
		dispatch({
			type: 'UPDATE_AUTOPLAY',
			payload: { state: !keepState.autoPlay },
		});
	};

	const renderReadyAyahs = () => {
		return keepState.pageAyahs.map((ayah) => {
			return (
				ayah.isReady && (
					<Ayah
						key={ayah.number.toString()}
						ayah={ayah}
						toggleAudioPlaying={toggleAudioPlaying}
						onAyahFinish={onAyahFinish}
						getTafseer={getTafseer}
					/>
				)
			);
		});
	};

	return (
		<Fragment>
			{showModal.show && showModal.text != null && (
				<Modal text={showModal.text} onClose={hideModal} />
			)}
			<div className="content">
				<Account
					surahNumber={keepState.surahNumber}
					ayahNumber={keepState.ayahNumber}
					pageNumber={keepState.pageNumber}
				/>

				<div className="ayat">
					<div className="ayat_aya dFlex">
						<button
							className={`btn btn-sm mAuto ${
								keepState.autoPlay === true ? 'btn-green' : null
							}`}
							onClick={changeAutoState}
						>
							Autoplay
						</button>
					</div>

					{renderReadyAyahs()}

					{keepState.isPageEnded && (
						<button className="btn mt-1 mb-1" onClick={nextPage}>
							Next Page
						</button>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
