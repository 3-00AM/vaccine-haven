import ReactDOM from "react-dom";
import "cirrus-ui"

const Modal = ({close, title, topic, children}) => {
  return ReactDOM.createPortal(
    <>
      {/*<div className={`modal-container ${show ? "show" : ""}`} onClick={() => close()}>*/}
      <div className={`modal`} onClick={() => close()}>
        {/*<button className="modal-overlay btn-close" aria-label={`close`} />*/}
        <div className="modal-content" role={`document`} onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <button className="u-pull-right" onClick={() => close()} aria-label="Close">
                  <span className="icon">
                      <i className="fa-wrapper fa fa-times" />
                  </span>
            </button>
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
      {/*</div>*/}
    </>,
    document.getElementById("modal")
  );
};


export default Modal;