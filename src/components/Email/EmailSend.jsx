import emailJs from '@emailjs/browser';
import MyContext from "../../FireBase/MyContext.jsx";
import * as userService from "../../services/UserService.jsx";
// import { useState } from "react";

const EmailSend = (UInfo, MInfo) => {
    // const [uFName, setUFName] = useState("hi");
    // const [uLName, setULName] = useState("hi");
    // const [userEmail, setUserEmail] = useState("hi");

    // console.log(UInfo)

    // userService.getUserByUsername(cookies.name).then((res) => {
    //   // console.log(res.data);
    //   setUserEmail(res.data.email);
    //   console.log(userEmail);
    //   // setRequests(res.data.userExpenses);
    // });

    // console.log(form);

    // function sendEmail() {
      emailJs
      .send(
        'Outlook',
        'RequestConfirmation',
        UInfo,
        'mcWavAzTyHu83WrOG'
      )
      .then((succ) => {
        console.log('Email sent successfully:', succ);
      })
      .catch((err) => {
        console.error('Error sending email:', err);
      });

      emailJs
      .send(
        'Outlook',
        'RequestApproval',
        MInfo,
        'mcWavAzTyHu83WrOG'
      )
      .then((succ) => {
        console.log('Email sent successfully:', succ);
      })
      .catch((err) => {
        console.error('Error sending email:', err);
      });
  }

//   return(sendEmail())
// }

export default EmailSend;