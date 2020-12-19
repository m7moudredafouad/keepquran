import React from 'react';

const Account = (props) => {
	return (
		<div className="account">
			<div className="account_head">لقد اجتزت</div>
			<div className="account_details">
				<div className="account_details-item">
					<p className="account_details-item--number">{props.surahNumber}</p>
					<p className="account_details-item--name">سوره</p>
				</div>
				<div className="account_details-item">
					<p className="account_details-item--number">{props.ayahNumber}</p>
					<p className="account_details-item--name">آيات</p>
				</div>
				<div className="account_details-item">
					<p className="account_details-item--number">{props.pageNumber}</p>
					<p className="account_details-item--name">صفحه</p>
				</div>
			</div>
		</div>
	);
};

export default Account;
