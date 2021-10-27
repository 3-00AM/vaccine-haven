import React from "react";

export default (label, info, register, errors, data, rules, errors_info, isRequired) => (
  <>
    <label className="font-bold">{label} {isRequired && <span className="required ${}">*</span>}</label>
    <div className="input-control">
      <input
        className={`input-contains-icon input-contains-icon input-contains-icon-left ${{errors} && "text-danger input-error"}`}
        type="text" placeholder="Firstname" {...register({data}, {rules})} />
      <span className={`icon icon-left ${errors.firstname && "text-danger input-error"}`}><i
        className="fa fa-wrapper fa-user" aria-hidden="true" /></span>
    </div>
    {errors_info}
  </>
)