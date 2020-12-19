import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import Ayah from './Ayah';

const Read = () => {
	const params = useParams();
	const [surahName, setSurahName] = useState(undefined);
	const [allAyatState, setAllAyatState] = useState([]);
	const [errorState, setErrorState] = useState(null);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_ALQURAN_API}/surah/${params.surahNumber}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.code === 404) {
					setErrorState('رقم السوره المطلوب غير موجود');
					return;
				}
				setSurahName(data.data.name);
				setAllAyatState(data.data.ayahs);
			});
	}, []);

	const renderAyat = () => {
		return allAyatState.map((ayah) => {
			return (
				<Ayah
					key={ayah.numberInSurah}
					ayah={ayah}
					surahNumber={parseInt(params.surahNumber)}
				/>
			);
		});
	};

	return (
		<div className="content">
			<MetaTags>
				<title>{surahName}</title>
				<meta property="og:title" content={surahName} />
				<meta property="og:site_name" content={surahName} />
				<meta name="twitter:title" content={surahName} />
			</MetaTags>

			<div className="ayat_aya">
				{errorState !== null ? (
					<p className="modal_body-text">{errorState}</p>
				) : (
					<Fragment>
						<div className="ayat_aya-data">
							<p className="ayat_aya-details">{surahName}</p>
						</div>

						{renderAyat()}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default Read;
