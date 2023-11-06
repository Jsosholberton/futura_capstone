import { Client } from "@notionhq/client"; // Import the Notion API client
import dotenv from "dotenv"; // Import the dotenv module for environment variables
import OpenAI from "openai"; // Import the OpenAI library
import fs from "fs"; // Import the file system module

import { genPdf } from "../utils/jsPdfCandidate/pdfCandidate.js";

// Load environment variables from a .env file (dotenv)
dotenv.config();

import {
  reduceTranscription,
  formatData,
  downloadTxt,
  readTxt,
  deleteTxt,
  sendCandidateAgreement,
} from "../utils/utils.js";

// Initialize the OpenAI client with the provided API key
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

// Create a Notion client with authentication
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Define the DataController class
class DataController {

  // Static method to update data in Notion
  static async updateNotionData(req, res) {
    const { id } = req.params;

    try {
      // Retrieve a Notion page by its page_id
      const element = await notion.pages.retrieve({
        page_id: id,
      });

      // Check if the page contains a transcription file
      if (element.properties.Transcripcion.files[0]) {

        // Get the URL of the transcription file
        const fileUrl = element.properties.Transcripcion.files[0].file.url;

        // Extract the name from the Notion page
        const name = element.properties.Nombre.title[0].plain_text;

        // Download the transcription file
        const file = await downloadTxt(fileUrl);

        if (!file) {
          console.log("Error al descargar el archivo");
          res.status(500).send("Error al descargar el archivo");
          return;
        }

        // Read the content of the transcription file
        var transcripcion = await readTxt();

        if (!transcripcion) {
          console.log("Error al leer el archivo");
          res.status(500).send("Error al leer el archivo");
          return;
        }

        // Reduce the transcription content
        transcripcion = (await reduceTranscription(transcripcion)).toString();

        if (!transcripcion) {
          console.log("Error al reducir el archivo");
          res.status(500).send("Error al reducir el archivo");
          return;
        }

        // Write the reduced transcription to a file
        fs.createWriteStream("transcripcionresumen.txt").write(transcripcion);

        // Process the transcription data using OpenAI
        const data = await DataController.processData(transcripcion);

        if (!data) {
          res.status(500).send("Error, API OpenAI");
          return;
        }

        // Generate a PDF document based on the name
        await genPdf(name);

        // Prepare all the updated data
        const allData = { ...data };

        // Update the Notion page properties with the new data
        const newData = await notion.pages.update({
          page_id: id,
          properties: allData,
        });

        // Send the candidate agreement via email
        await sendCandidateAgreement(element);

        // Delete the temporary transcription file
        await deleteTxt();

        // Respond with the updated data
        res.json(newData);

      } else {
        console.log("No Files");
        res.status(500).send("Error, you need put a transcription file");
      }
    } catch (error) {
      res.status(500).send("Error, Not Found");
      console.error(error);
    }
  }

  // Static method to process transcription data using OpenAI
  static async processData(transcripcion) {
    try {
      // Generate responses from OpenAI's chat model
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: "You are a selection analyst, and you've just received these responses from a candidate." + transcripcion,
          },

          {
            role: 'user',
            content:
              "Complete the information bellow in a single line:" +
              "Experience: (Information collected from work and academic experience mentioning your contributions in projects, followed by text in narrative format. If the companies mentioned are consultants, exclude the names of the consultants and mention the final clients of the projects)" +
              "Educational History: (Information gathered from degrees or studies and universities or institutes)." +
              "Aspects that make this person unique: (Information gathered about what makes them unique)" +
              "Technologies or tech stack mentioned: List of technologies, programming languages, and tools, separated by commas)" +
              "Summary: (Here would go the candidate's summary related to soft skills)." +
              "Years of Experience: (Number based on their experience or knowledge, if none, '0')" +
              "Profession: (Backend, Frontend, Fullstack list separated by commas)" +
              "Industries: (List of industries they could work in based on their experience or projects)" +
              "Salary: (Salary range. example:  $70/80)" +
              "Strong tech stack: List of technologies in which have the most experience, programming languages, and tools, separated by commas)"
          }
        ],

        model: "gpt-3.5-turbo",
        temperature: 0,
      });

      // const response = {
      //   choices: [
      //     {
      //       message: {
      //         content:

      //         "Experiencia laboral: Operario de planta en Acate Motos.\n" +
      //         "Historial educativo: Estudió en Holberton.\n" +
      //         "Aspectos que hacen que esta persona sea única: Ha realizado proyectos en equipo utilizando lenguajes como C, HTML, CSS, JavaScript y React. También ha trabajado en el desarrollo de una tienda de muebles y un ecommerce.\n" +
      //         "Tecnologías o stack tecnológico mencionado: C, HTML, CSS, JavaScript, React.\n" +
      //         "Resumen: Profesión: Desarrollador. Nombre: Ruben Dario Florez Betancur. Cargo relacionado: Junior. Años de experiencia: No se menciona. Tecnologías: C, HTML, CSS, JavaScript, React. Res\n",
      //       }
      //     },
      //   ],
      // };

      // Extract the response content
      const respuesta = response.choices[0].message.content;

      console.log(respuesta);

      // Write the response to a file
      fs.createWriteStream("respuesta.txt").write(respuesta);

      // Format the response data
      const dataFormated = formatData(respuesta);

      return dataFormated;
    } catch (error) {
      console.error("Error al llamar la API de OpenAI", error);
    }
  }
}

export default DataController;
