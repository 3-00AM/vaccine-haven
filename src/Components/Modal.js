import 'cirrus-ui';

function Modal() {

    return (
        <>
            <div className="modal modal-animated--zoom-in" id="basic-modal" >
                <a href="#searchModalDialog" className="modal-overlay close-btn" aria-label="Close"></a>
                <div className="modal-content" role="document">
                    <div className="modal-header"><a href="#components" className="u-pull-right" aria-label="Close"><span className="icon"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11 fa-wrapper" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></span></a>
                        <div className="modal-title">Invite</div>
                    </div>
                    <div className="modal-body">
                        <div className="r">
                            <h3 className="font-alt font-light u-text-center">Invite people to project</h3></div>
                        <div className="space"></div>
                        <div className="input-control">
                            <input type="text" className="input-contains-icon" placeholder="Search for team members" /><span className="icon"></span></div>
                        <div className="divider"></div>
                        <div className="my-1">
                            <div className="tile tile--center py-1 px-2 my-1" style={{boxShadow: "rgba(0, 0, 0, 0.06) 0px 3px 6px, rgba(0, 0, 0, 0.03) 0px 3px 6px"}}>
                                <div className="tile__icon">
                                    <figure className="avatar bg-teal-400" data-text="Jn"></figure>
                                </div>
                                <div className="tile__container">
                                    <p className="tile__title m-0">John Newman</p>
                                    <p className="tile__subtitle m-0">jnewman@gmail.com</p>
                                </div>
                                <div className="tile__buttons">
                                    <button className="btn-success btn-small uppercase"><span className="icon"></span></button>
                                </div>
                            </div>
                            <div className="tile tile--center py-1 px-2 my-1" style={{boxShadow: "rgba(0, 0, 0, 0.06) 0px 3px 6px, rgba(0, 0, 0, 0.03) 0px 3px 6px"}}>
                                <div className="tile__icon">
                                    <figure className="avatar bg-teal-500" data-text="Fw"></figure>
                                </div>
                                <div className="tile__container">
                                    <p className="tile__title m-0">Franklin Watson</p>
                                    <p className="tile__subtitle m-0">fwatsonm@gmail.com</p>
                                </div>
                                <div className="tile__buttons">
                                    <button className="btn-success btn-small uppercase"><span className="icon"></span></button>
                                </div>
                            </div>
                            <div className="tile tile--center py-1 px-2 my-1" style={{boxShadow: "rgba(0, 0, 0, 0.06) 0px 3px 6px, rgba(0, 0, 0, 0.03) 0px 3px 6px"}}>
                                <div className="tile__icon">
                                    <figure className="avatar bg-teal-600" data-text="Cr"></figure>
                                </div>
                                <div className="tile__container">
                                    <p className="tile__title m-0">Cornelia Roberts</p>
                                    <p className="tile__subtitle m-0">croberts@outlook.com</p>
                                </div>
                                <div className="tile__buttons">
                                    <button className="btn-danger btn-small uppercase"><span className="icon"></span></button>
                                </div>
                            </div>
                            <div className="tile tile--center py-1 px-2 my-1" style={{boxShadow: "rgba(0, 0, 0, 0.06) 0px 3px 6px, rgba(0, 0, 0, 0.03) 0px 3px 6px"}}>
                                <div className="tile__icon">
                                    <figure className="avatar bg-teal-700" data-text="Da"></figure>
                                </div>
                                <div className="tile__container">
                                    <p className="tile__title m-0">Dominic Alvarado</p>
                                    <p className="tile__subtitle m-0">dalvarado@yahoo.com</p>
                                </div>
                                <div className="tile__buttons">
                                    <button className="btn-success btn-small uppercase"><span className="icon"></span></button>
                                </div>
                            </div>
                            <div className="tile tile--center py-1 px-2 my-1" style={{boxShadow: "rgba(0, 0, 0, 0.06) 0px 3px 6px, rgba(0, 0, 0, 0.03) 0px 3px 6px"}}>
                                <div className="tile__icon">
                                    <figure className="avatar bg-teal-800" data-text="Sl"></figure>
                                </div>
                                <div className="tile__container">
                                    <p className="tile__title m-0">Stanley Lim</p>
                                    <p className="tile__subtitle m-0">slim@stanleylim.me</p>
                                </div>
                                <div className="tile__buttons">
                                    <button className="btn-success btn-small uppercase"><span className="icon"></span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="form-section u-text-right">
                            <a href="#components">
                                <button className="btn btn-small u-inline-block">Cancel</button>
                            </a>
                            <a href="#components">
                                <button className="btn-info btn-small u-inline-block">Confirm</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal