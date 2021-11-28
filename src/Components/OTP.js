import firebase from "../config";
import {useState} from "react";

function OTP() {
  const [number, setNumber] = useState("")

  function setData(val) {
    setNumber(val.target.value)
  }
  
  const handleClick = () => {
    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container")
    firebase.auth().signInWithPhoneNumber(number, recaptcha).then((e) => {
      let code = prompt("enter OTP");
      if (code == null) {
        return;
      }
      e.confirm(code).then((res) => {
        console.log(res, "OTP success")
      })
    }).catch(() => {
      console.log("error")
    })
  }

  return (
    <container>
      <div id="recaptcha-container"></div>
      <input type="text" id="phone__number" onChange={setData} placeholder="phone number"/>
      <button onClick={handleClick}>Click Me</button>
    </container>
  )
}

export default OTP;