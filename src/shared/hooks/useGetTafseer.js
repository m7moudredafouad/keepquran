import { useState } from 'react';

const useGetTafseer = () => {
	const [showModalState, setShowModal] = useState({
		show: false,
		text: null,
		header: null,
	});
	const getTafseer = (callback) => {
		return (ayah, header) => {
			if (ayah.tafseer != null || ayah.tafseer != undefined) {
				return viewModal(ayah.tafseer, header);
			} else {
				viewModal('Loading..', header);
				fetch(`${process.env.REACT_APP_TAFSEER}/${ayah.number}/ar.muyassar`)
					.then((res) => res.json())
					.then((data) => {
						if (data.status === 404) {
							hideModal();
							return;
						}
						callback(ayah.number, data.data.text, ayah.numberInSurah);
						viewModal(data.data.text, header);
					});
			}
		};
	};

	const viewModal = (text, header) => {
		setShowModal({
			show: true,
			text,
			header,
		});
	};

	const hideModal = () => {
		setShowModal({
			show: false,
			text: null,
			header: null,
		});
	};

	return [getTafseer, showModalState, hideModal];
};
export default useGetTafseer;
