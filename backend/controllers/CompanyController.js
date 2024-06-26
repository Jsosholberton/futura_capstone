import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Create a Notion client with authentication
const notion = new Client({
  auth: process.env.NOTION_TOKEN, // Use the NOTION_TOKEN from environment variables
});

/**
 * Controller for business and email management.
 * @class
 */
class CompanyController {
  /**
   * Static method to send emails to companies with copies of candidates
   * @param {Object} req - Purpose of express request.
   * @param {Object} res - Express response object.
   */
  static async preloadEmailForm(req, res) {
    const { id } = req.params;
    const copies = [];

    try {
      // Get candidate information from Notion.
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

      // Concatenate the candidate copies.
      const stringCopies = copies.join(
        "\n-----------------------------------------------------------\n"
      );

      const email = element.properties.Correo.email;
      const contacto = element.properties.Contacto.rich_text[0].text.content;
      const name = element.properties.Name.title[0].text.content;

      // Respond with a success status
      res
        .status(200)
        .send(
          JSON.stringify({ text: stringCopies, email, contacto, name }, null, 2)
        );
    } catch (error) {
      res.status(500).send({ msg: "Error proccessing request" });
      console.log(error);
    }
  }

  /**
   * Static method for sending candidate copy emails to a specific company.
   * @param {string} copies - Copies of candidates in text format.
   * @param {Object} company - Object that represents the company.
   */
  static async sendEmail(req, res) {
    // Extract necessary information from the company's Notion page
    const { text, email, contacto, name } = req.body;

    // Configures the email transport.
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "enviocorreopdf@gmail.com",
        pass: "diaq xmru ndzt lwzp",
      },
    });

    // Send the email with the candidates' copies.
    const info = await transporter.sendMail({
      from: "enviocorreopdf@gmail.com",
      to: email,
      subject: `Hola ${name}, estos son los candidatos`,
      text: `Hi ${contacto}, We've been working hard to get new developers\n\n${text}`,
    });

    // Log a confirmation message
    console.log("Message sent: %s", info.messageId);
    res.status(200).send({ msg: "Email sent" });
  }
}

// Exports the CompanyController class so that it can be used in other modules.
export default CompanyController;
