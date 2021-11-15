import ReactDOM from "react-dom";
import "cirrus-ui"
import {Link} from "react-router-dom";

const Modal = ({id, title, topic, children}) => {
  return ReactDOM.createPortal(
    <>
      <div className={`modal modal-animated--zoom-in`} id={id}>
        <Link to={`/registration`} className="modal-overlay btn-close" aria-label={`close`} />
        <div className="modal-content" role={`document`}>
          <div className="modal-header">
            <Link to={`/registration`}>
              <button className="u-pull-right" aria-label="Close">
                <span className="icon">
                    <i className="fa-wrapper fa fa-times" />
                </span>
              </button>
            </Link>
            <div className={`modal-title`}>{title}</div>
          </div>
          <div className="modal-body">
            <div className={`r`}>
              <h3 className={`font-alt font-light u-text-center`}>{topic}</h3>
            </div>
            <div className={`space`} />
            <div className={`divider`} />
            <p>{children}</p>
          </div>
          <div className="modal-footer u-text-right">
            <button className="btn-small">No</button>
            <button className="btn-primary btn-small">Yes</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};
export default Modal;