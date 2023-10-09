import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const SG_API_KEY = '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'

sendgrid.setApiKey(SG_API_KEY);

const sendEmail = ({ to, from, subject, text, html, templateId }) => {
  console.log(SG_API_KEY);

  if(typeof templateId!==undefined){
    const msg = { to, from, templateId }
    return sendgrid.send(msg);
  }

  const msg = { to, from, subject, text, html }
  return sendgrid.send(msg);

};

export default sendEmail;
