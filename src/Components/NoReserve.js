import React from "react";
import "cirrus-ui";
import {Link} from "react-router-dom";

function NoReserve() {
  return (
    <div className="col-5">
      <div className="card h-100">
        <div className="card__header">
          <p className="font-bold px-3">Vaccine Reservation Information:</p>
        </div>
        <div className="content">
          <div className={"u-center"}>
            <p>You have not reserve vaccine yet!</p>
          </div>
        </div>
        <div className="u-center">
          <Link to={"/reservation"}>
            <button className="btn-link">Reservation</button>
          </Link>
        </div>
        <div className={`space`} />
      </div>
    </div>
  );
}

export default NoReserve;
