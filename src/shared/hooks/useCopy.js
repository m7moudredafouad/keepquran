import { useState } from 'react';

const useCopy = () => {
	const [copied, setCopied] = useState({
		copied: false,
		number: 0,
	});

	const copyToClipboard = (text, ayahNumber, surahName, ayahNumberInSurah) => {
		navigator.clipboard
			.writeText(
				`${text}\n\n${process.env.REACT_APP_APP_URL}ayah/${surahName}/${ayahNumberInSurah}.png`
			)
			.then(() => {
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

	return [copyToClipboard, copied];
};
export default useCopy;
