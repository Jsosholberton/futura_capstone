import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import fs from "fs";
import nodemailer from "nodemailer";


dotenv.config();

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

class CompanyController {

    // Static method to send emails to companies with copies of candidates
    static async sendEmail(req, res){
        const { id } = req.params;
        
        const copies = [];
        
        try {
            const element = await notion.pages.retrieve({
                page_id: id,
            });
            const candidates = element.properties.Candidatos.relation;
            for(let candidate of candidates)
            {
                const tmp = await notion.pages.retrieve({
                    page_id: candidate.id,
                });
                copies.push(tmp.properties["Copy Final"].formula.string);
            }

            const stringCopies = copies.join("\n-----------------------------------------------------------\n");
            CompanyController.sendCandidateCopies(stringCopies, element)
            res.status(200).send("Funciona")
        } catch (error) {
            console.log(error)
        }
    }

    // Send the email
    static async sendCandidateCopies(copies, company) {

        const email = company.properties.Correo.email;
        const contacto = company.properties.Contacto.rich_text[0].text.content;
        const name = company.properties.Name.title[0].text.content;
      
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
              user: "enviocorreopdf@gmail.com",
              pass: "diaq xmru ndzt lwzp",
          },
      });
      
        const info = await transporter.sendMail({
          from: "enviocorreopdf@gmail.com",
          to: email,
          subject: `Hola ${name}, estos son los candidatos`,
          text: `Hi ${contacto}, We've been working hard to get new developers\n\n${copies}`,
        });
      
        console.log("Message sent: %s", info.messageId);
      }
}

export default CompanyController;