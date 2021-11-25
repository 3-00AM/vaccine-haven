// import {Link} from "react-router-dom";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const Modal = props => {
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="u-pull-right" aria-label="Close">
            <span className="icon">
                <i className="fa-wrapper fa fa-times" />
            </span>
          </button>
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button">
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("modal")
  );
};

export default Modal;

// const Modal = ({id, title, topic, children}) => {
//   return ReactDOM.createPortal(
//     <>
//       <div className={`modal modal-animated--zoom-in`} id={id}>
//         <Link to={`/registration`} className="modal-overlay btn-close" aria-label={`close`} />
//         <div className="modal-content" role={`document`}>
//           <div className="modal-header">
//             <Link to={`/registration`}>
//               <button className="u-pull-right" aria-label="Close">
//                 <span className="icon">
//                     <i className="fa-wrapper fa fa-times" />
//                 </span>
//               </button>
//             </Link>
//             <div className={`modal-title`}>{title}</div>
//           </div>
//           <div className="modal-body">
//             <div className={`r`}>
//               <h3 className={`font-alt font-light u-text-center`}>{topic}</h3>
//             </div>
//             <div className={`space`} />
//             <div className={`divider`} />
//             <p>{children}</p>
//           </div>
//           <div className="modal-footer u-text-right">
//             <button className="btn-small">No</button>
//             <button className="btn-primary btn-small">Yes</button>
//           </div>
//         </div>
//       </div>
//     </>,
//     document.getElementById("modal")
//   );
// };
