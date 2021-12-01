import * as PropTypes from "prop-types";
import React from "react";

export default function CitizenID(props) {
  return <div className="mb-1">
    <label className="font-bold">Citizen ID<span className="required">*</span><span
      className="info inline font-light">Please input valid citizen ID.</span></label>
    <div className="section-body">
      <div className="input-control">
        <input
          type="text"
          id={"citizen_id"}
          value={props.value}
          className={`input-contains-icon input-contains-icon input-contains-icon-left ${props.errors.citizen_id && "text-danger input-error"}`}
          placeholder="Citizen ID"
          {...props.useFormRegisterReturn} onKeyUp={props.onKeyUp} />
        <span className="icon icon-left"><i
          className={`fa fa-wrapper fa-id-card ${props.errors.citizen_id && "text-danger input-error"}`}
          aria-hidden="true" /></span>
      </div>
    </div>
    {props.errors.citizen_id && <span className="required info">{props.errors.citizen_id.message}</span>}
  </div>;
}

CitizenID.propTypes = {
  errors: PropTypes.func,
  useFormRegisterReturn: PropTypes.any,
  onKeyUp: PropTypes.func
};