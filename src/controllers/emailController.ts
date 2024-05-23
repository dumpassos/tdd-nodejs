import { Request, Response } from 'express';
import nodemailer from "nodemailer";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const contato = async (req: Request, res: Response) => {
   // Passo 1: Configurar o transporter

   let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "17c25eaf71ae26",
      pass: "feee8b33d55f50"
    }
  });
  
   // Passo 2: Configurar a mensagem 

   let message = {
    from: "nao-responda@ep.com", 
    to: "suporte@ep.com", 
    replyTo: req.body.from,
    subject: req.body.subject, 
    html: req.body.email, 
    text: req.body.email 
   }

   // Passo 3: Enviar a mensagem

   let info = await transport.sendMail(message); 

   console.log("INFO: ", info);

   res.json({success: true});
};