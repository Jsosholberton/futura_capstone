import { Client } from "@notionhq/client"; // Import the Notion API client
import dotenv from "dotenv"; // Import the dotenv module for environment variables
import fs from "fs"; // Import the file system module
import nodemailer from "nodemailer"; // Import the nodemailer library for sending emails

// Load environment variables from a .env file (dotenv)
dotenv.config();

// Create a Notion client with authentication
const notion = new Client({
    auth: process.env.NOTION_TOKEN, // Use the NOTION_TOKEN from environment variables
});

// Define the CompanyController class
class CompanyController {

    // Static method to send emails to companies with copies of candidates
    static async sendEmail(req, res) {
        const { id } = req.params;

        const copies = [];

        try {
            // Retrieve a Notion page by its page_id
            const element = await notion.pages.retrieve({
                page_id: id,
            });

            // Get the list of candidates related to the company
            const candidates = element.properties.Candidatos.relation;

            // Iterate through the candidates to gather their copy data
            for (let candidate of candidates) {
                // Iterate through the candidates to gather their copy data
                const tmp = await notion.pages.retrieve({
                    page_id: candidate.id,
                });
                copies.push(tmp.properties["Copy Final"].formula.string);
            }

            // Join the copies with a separator
            const stringCopies = copies.join("\n-----------------------------------------------------------\n");

            // Send an email with the candidate copies
            CompanyController.sendCandidateCopies(stringCopies, element)

            // Respond with a success status
            res.status(200).send("Funciona")
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 
     * @param {*Copies to send to teh company} copies hola 
     * @param {*company} company the company
     */
    static async sendCandidateCopies(copies, company) {

        // Extract necessary information from the company's Notion page
        const email = company.properties.Correo.email;
        const contacto = company.properties.Contacto.rich_text[0].text.content;
        const name = company.properties.Name.title[0].text.content;

        // Create a transporter for sending emails via Gmail
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "enviocorreopdf@gmail.com",
                pass: "diaq xmru ndzt lwzp",
            },
        });

        // Compose and send the email
        const info = await transporter.sendMail({
            from: "enviocorreopdf@gmail.com",
            to: email,
            subject: `Hola ${name}, estos son los candidatos`,
            text: `Hi ${contacto}, We've been working hard to get new developers\n\n${copies}`,
        });

        // Log a confirmation message
        console.log("Message sent: %s", info.messageId);
    }
}

export default CompanyController;