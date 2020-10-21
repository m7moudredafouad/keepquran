import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SURAHS from '../../shared/SURAHS';
import SHIEKH from '../../shared/SHIEKH';

const Start = () => {
	const [showCustom, setShowCustom] = useState(false);
	const [newSurah, setNewSurah] = useState(1);
	const [newAyah, setNewAyah] = useState(1);
	const [surahAyatNumber, setSurahAyatNumber] = useState(0);

	const myHistory = useHistory();

	useEffect(() => {
		fetch('https://api.quran.com/api/v3/chapters/1/verses/1/tafsirs')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	}, []);

	const savedStart = () => {
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

	const submitForm = (e) => {
		e.preventDefault();

		localStorage.setItem('ayahNumber', newAyah);
		localStorage.setItem('surahNumber', newSurah);
		localStorage.setItem('pageNumber', undefined);
		myHistory.push('/keep');
	};

	const onSurahChange = (surahNumber) => {
		let sNumAndTVerse = surahNumber.split('_');
		setNewSurah(parseInt(sNumAndTVerse[0]));
		setSurahAyatNumber(parseInt(sNumAndTVerse[1]));
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

	const renderSurahsNames = () => {
		return SURAHS.map((surah) => {
			return (
				<option
					value={`${surah.number}_${surah.total_verses}`}
					key={surah.number.toString()}
				>
					سورة {surah.name}
				</option>
			);
		});
	};

	const renderAyatNumber = () => {
		let AyatComponent = [];
		for (let i = 1; i <= surahAyatNumber; i++) {
			AyatComponent.push(
				<option value={i} key={i.toString()}>
					{i}
				</option>
			);
		}

		return AyatComponent;
	};

	return (
		<div className="start">
			<button className="btn mt-2" onClick={savedStart}>
				ابدأ من اخر حفظ قمت به
			</button>
			<button
				className="btn mt-2"
				onClick={() => setShowCustom((prevState) => !prevState)}
			>
				بدايه مخصصه
			</button>

			{showCustom && (
				<form className="form mt-2" onSubmit={submitForm}>
					<select
						className="form_input"
						onChange={(e) => changeShiekh(e.target.value)}
					>
						<option value="abdulbasitmurattal">اختر قارئك المفضل</option>
						{renderShiek()}
					</select>
					<select
						className="form_input"
						onChange={(e) => onSurahChange(e.target.value)}
					>
						<option value="1">اختر اسم السوره</option>
						{renderSurahsNames()}
					</select>
					<select
						className="form_input"
						onChange={(e) => setNewAyah(e.target.value)}
					>
						<option value="1">اختر رقم الآيه</option>
						{renderAyatNumber()}
					</select>
					<button className="btn btn-sm">تأكيد</button>
				</form>
			)}
		</div>
	);
};

export default Start;
