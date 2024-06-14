import emailJs from "@emailjs/browser";

const EmailSend = (UInfo, MInfo) => {
      emailJs
      .send(
        "Outlook",
        "RequestConfirmation",
        UInfo,
        "mcWavAzTyHu83WrOG"
      )
      .then((succ) => {
        console.log("Confirmation email sent successfully: ", succ);
      })
      .catch((err) => {
        console.error("Error sending confirmation email: ", err);
      });

      emailJs
      .send(
        "Outlook",
        "RequestApproval",
        MInfo,
        "mcWavAzTyHu83WrOG"
      )
      .then((succ) => {
        console.log("Approval email sent successfully: ", succ);
      })
      .catch((err) => {
        console.error("Error sending approval email: ", err);
      });
  }

export default EmailSend;