import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const SG_API_KEY = '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'

sendgrid.setApiKey(SG_API_KEY);

const sendEmail = ({ to, from, subject, text, html, templateId }) => {
  console.log(SG_API_KEY);

  if(typeof templateId!==undefined){
    console.log('aca')
    const msg = { to, from, templateId }
    return sendgrid.send(msg).catch((e) => console.log('e', e));
  }
  console.log('o aca')
  const msg = { to, from, subject, text, html }
  return sendgrid.send(msg).catch((e) => console.log('e', e));

};

export default sendEmail;
