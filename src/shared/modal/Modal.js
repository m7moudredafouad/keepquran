import React from 'react';
import ReactDOM from 'react-dom';

const ModalBox = (props) => {
	const content = (
		<div className="modal">
			<div className="modal_backdrop" onClick={props.onClose}></div>
			<div className="modal_container">
				<div className="modal_header">
					<p className="modal_header-text">{props.header}</p>
					{/* <button className="modal_header-close" onClick={props.onClose}>
						x
					</button> */}
				</div>
				<div className="modal_body">
					<p className="modal_body-text">{props.text}</p>
				</div>
			</div>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById('modal'));
};

const Modal = (props) => {
	return <ModalBox {...props} />;
};

export default Modal;
