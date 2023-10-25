import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import OpenAI from "openai";


dotenv.config();

import {
  reduceTranscription,
  formatData,
  downloadTxt,
  readTxt,
  deleteTxt,
  genPdf,
} from "../utils/utils.js";

const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

class DataController {
  static async updateNotionData(req, res) {
    const { id } = req.params;

    try {
      const element = await notion.pages.retrieve({
        page_id: id,
      });

      if (element.properties.Transcripcion.files[0]) {

        const fileUrl = element.properties.Transcripcion.files[0].file.url;

        const cName = element.properties.Nombre.title[0].text.content;

        genPdf(cName);

        const file = await downloadTxt(fileUrl);

        if (!file) {
          console.log("Error al descargar el archivo");
          res.status(500).send("Error al descargar el archivo");
          return;
        }

        var transcripcion = await readTxt();

        if (!transcripcion) {
          console.log("Error al leer el archivo");
          res.status(500).send("Error al leer el archivo");
          return;
        }

        transcripcion = reduceTranscription(transcripcion);

        if (!transcripcion) {
          console.log("Error al reducir el archivo");
          res.status(500).send("Error al reducir el archivo");
          return;
        }

        const data = await DataController.processData(transcripcion);

        if (!data) {
          res.status(500).send("Error, API OpenAI");
          return;
        }

        const newData = await notion.pages.update({
          page_id: id,
          properties: data,
        });

        await deleteTxt();

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

  static async processData(transcripcion) {
    try {
      // const response = await openai.chat.completions.create({
      //   messages: [
      //     {
      //       role: "system",
      //       content: `${process.env.SECRET_PROMPT} ${transcripcion}`,
      //     },
      //   ],
      //   model: "gpt-3.5-turbo",
      //   temperature: 0,
      //   //max_tokens: 50,
      // });

      const response = {
        choices: [
          {
            message: {
              content:
                "Últimas dos empresas donde trabajó: No se mencionan en el currículum.\n" +
                "Historial educativo: No se menciona en el currículum.\n" +
                "Aspectos que hacen que esta persona sea única: No se mencionan en el currículum.\n" +
                "Tecnologías o stack tecnológico mencionado: No se mencionan en el currículum.",
            },
          },
        ],
      };

      const respuesta = response.choices[0].message.content;
      console.log(respuesta);

      const dataFormated = formatData(respuesta);

      return dataFormated;
    } catch (error) {
      console.error("Error al llamar la API de OpenAI", error);
    }
  }
}

export default DataController;
