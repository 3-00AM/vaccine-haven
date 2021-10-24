import "cirrus-ui";
import React, {useState} from "react";
import Axios from "axios";

function Reserve() {

  const base_url = "https://wcg-apis.herokuapp.com/reservation"

  const [data, setData] = useState({
    citizen_id: "",
    site_name: "",
    vaccine_name: ""
  })

  function handle(event) {
    const newData = {...data}
    newData[event.target.id] = event.target.value
    setData(newData)
    console.log(newData)
  }

  async function submit(event) {
    event.preventDefault();

    const config = {
      method: 'post',
      url: `${base_url}?citizen_id=${data.citizen_id}&site_name=${data.site_name}&vaccine_name=${data.vaccine_name}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    };

    await Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div className="hero fullscreen">
      <div className="content">
        <div style={{margin: "auto"}}>
          <form className="frame p-0" method="post" autoComplete="on" onSubmit={(event) => submit(event)}>
            <div className="frame__body p-0">
              <div className="row p-0 level fill-height">
                <div className="col">
                  <div className="space xlarge" />
                  <div className="padded">
                    <h1 className="u-text-center u-font-alt">Vaccine Reservation</h1>
                    <div className="divider" />
                    <p className="u-text-center">Get the user information for who want to reserve the vaccine</p>
                    <div className="divider" />

                    <div className="form-group">
                      <label className="form-group-label">
                          <span className="icon">
                            <i className="fa-wrapper fas fa-id-card" />
                          </span>
                      </label>
                      <input onChange={(event => handle(event))} type="text" id="citizen_id" value={data.citizen_id}
                             className="form-group-input" placeholder="Enter your citizen ID" />
                    </div>

                    <div className="form-section section-inline">
                      <div className="section-body row">
                        <div className="form-group col-6 pl-0">
                          <label className="form-group-label">
                              <span className="icon">
                                <i className="fa-wrapper fas fa-hospital" />
                              </span>
                          </label>
                          <select onChange={(event => handle(event))} className="select form-group-input" id="site_name"
                                  value={data.site_name} placeholder="Choose site">
                            <option value="" disabled defaultValue>Choose Site...</option>
                            <option value="OGYHSite" >OGYHSite</option>
                          </select>
                        </div>
                        <div className="form-group col-6 pr-0">
                          <label className="form-group-label">
                              <span className="icon">
                                <i className="fa-wrapper fas fa-syringe" />
                              </span>
                          </label>
                          <select onChange={(event => handle(event))} className="select form-group-input"
                                  id="vaccine_name" value={data.vaccine_name} placeholder="Choose vaccine">
                            <option value="" disabled defaultValue>Choose Vaccine...</option>
                            <option value="Pfizer">Pfizer</option>
                            <option value="Astra">Astra</option>
                            <option value="Sinopharm">Sinopharm</option>
                            <option value="Sinovac">Sinovac</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="space" />

                    <div className="btn-group u-pull-right">
                      <button className="btn-info">Send</button>
                    </div>

                  </div>
                  <div className="space xlarge" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Reserve;