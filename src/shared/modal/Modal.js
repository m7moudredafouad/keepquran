import React from 'react';
import ReactDOM from 'react-dom'

const ModalBox = (props) => {
  const content = (
    <div className="modal">
			<div className="modal_container">
				<div className="modal_header">
					<button className="modal_header-close" onClick={props.onClose}>x</button>
				</div>
				<div className="modal_body">{props.text}</div>
			</div>
		</div>

  )
  return ReactDOM.createPortal(content, document.getElementById('modal'))
}

const Modal = (props) => {
  return <ModalBox {...props} />

}

export default Modal;