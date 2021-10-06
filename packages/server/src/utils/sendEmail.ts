import nodemailer from "nodemailer";
import { HTMLFileToString } from "../utils/html";
import path from "path";
import Mail from "nodemailer/lib/mailer";
import { compile } from "handlebars";

export const sendEmail = async (
  recipient: string,
  url: string,
  verb: string,
  noun: string,
  extraText?: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME!,
      pass: process.env.MAIL_PASSWORD!,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let html;

  try {
    const rawHtml = HTMLFileToString(path.resolve(__dirname, "../email.html"));
    const template = compile(rawHtml);

    const data = {
      url,
      buttonText: verb.charAt(0).toUpperCase() + verb.slice(1),
      extraText,
    };
    html = template(data);
  } catch (err) {
    console.log("err: ", err);
  }

  const mailOptions: Mail.Options = {
    from: `"No Reply" <${process.env.USERNAME}>`,
    to: recipient,
    subject: `${verb.charAt(0).toUpperCase() + verb.slice(1)} your ${noun}`,
    html,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};
