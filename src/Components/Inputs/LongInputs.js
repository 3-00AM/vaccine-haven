import 'cirrus-ui'
import React from "react";

export default (label, info, register, errors, data, options, errors_info, isRequired) => (
  <div className="mb-1">
    <label className="font-bold">{label} {isRequired && <span className="required ${}">*</span>}<span
      className="info inline font-light {}">{info}</span></label>
    <div className="section-body">
      <div className="input-control">
        <input type="number"
               className={`input-contains-icon input-contains-icon input-contains-icon-left ${{errors} && "text-danger input-error"}`}
               placeholder={label} {...register({data}, {options})} />
        <span className="icon icon-left"><i
          className={`fa fa-wrapper fa-id-card ${{errors} && "text-danger input-error"}`}
          aria-hidden="true" /></span>
      </div>
    </div>
    {errors_info}
  </div>
)