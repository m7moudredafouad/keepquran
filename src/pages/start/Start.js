import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import SURAHS from '../../shared/SURAHS';

const Start = () => {
	const [surahAyatNumber, setSurahAyatNumber] = useState(0);
	const [surahNumber, setSurahNumber] = useState(
		parseInt(localStorage.getItem('surahNumber'))
	);

	const myHistory = useHistory();

	const renderSurahsNames = () => {
		let surahInLocalStorage = parseInt(localStorage.getItem('surahNumber'));
		return SURAHS.map((surah) => {
			let foundSurah = surah.number === surahInLocalStorage;
			return (
				<option
					value={`${surah.number}_${surah.total_verses}`}
					key={surah.number.toString()}
					selected={foundSurah}
				>
					سورة {surah.name}
				</option>
			);
		});
	};

	const renderAyatNumber = () => {
		let ayahInLocalStorage = parseInt(localStorage.getItem('ayahNumber'));

		let AyatComponent = [];
		for (let i = 1; i <= surahAyatNumber; i++) {
			AyatComponent.push(
				<option
					value={i}
					key={i.toString()}
					selected={i === ayahInLocalStorage}
				>
					{i}
				</option>
			);
		}

		return AyatComponent;
	};

	const onSurahChange = (surahNumber) => {
		let sNumAndTVerse = surahNumber.split('_');

		setSurahAyatNumber(parseInt(sNumAndTVerse[1]));
		localStorage.setItem('surahNumber', sNumAndTVerse[0]);
		setSurahNumber(sNumAndTVerse[0]);
		localStorage.setItem('ayahNumber', 1);
	};

	const onAyahChange = (ayahNumber) => {
		localStorage.setItem('ayahNumber', ayahNumber);
	};

	const onKeep = () => {
		localStorage.setItem('pageNumber', undefined);

		if (!localStorage.getItem('ayahNumber')) {
			localStorage.setItem('ayahNumber', 1);
		}

		if (!localStorage.getItem('pageNumber')) {
			localStorage.setItem('pageNumber', 1);
		}

		if (!localStorage.getItem('surahNumber')) {
			localStorage.setItem('surahNumber', 1);
		}

		myHistory.push('/keep');
	};

	return (
		<div className="start">
			<h3 className="start_welcome">اهلا بيك في احفظ القرآن</h3>

			<form className="form mt-2">
				<select
					className="form_input ml-1"
					onChange={(e) => onSurahChange(e.target.value)}
				>
					<option value="1">اختر اسم السوره</option>
					{renderSurahsNames()}
				</select>
				<select
					className="form_input"
					onChange={(e) => onAyahChange(e.target.value)}
				>
					<option value="1">اختر رقم الآيه</option>
					{renderAyatNumber()}
				</select>
			</form>

			<div className="start_ask">
				<p className="start_ask-text">عايز تعمل ايه ؟</p>
				<button className="btn ml-1" onClick={onKeep}>
					احفظ
				</button>
				<Link to={`read/${surahNumber}`} className="btn ml-1">
					اقرأ
				</Link>
				{/* <button className="btn">استمع</button> */}
			</div>
		</div>
	);
};

export default Start;
