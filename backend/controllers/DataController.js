import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";

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

        const name = element.properties.Nombre.title[0].plain_text;

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

        transcripcion = (await reduceTranscription(transcripcion)).toString();

        if (!transcripcion) {
          console.log("Error al reducir el archivo");
          res.status(500).send("Error al reducir el archivo");
          return;
        }

        fs.createWriteStream("transcripcionresumen.txt").write(transcripcion);

        const data = await DataController.processData(transcripcion);

        if (!data) {
          res.status(500).send("Error, API OpenAI");
          return;
        }

        await genPdf(name);

        const allData = { ...data };

        const newData = await notion.pages.update({
          page_id: id,
          properties: allData,
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

      const response = await openai.chat.completions.create({
        messages: [
          {
          role: 'system',
          content: "Eres un analista de seleccion, acabaste de tener estas respuestas de un candidato"+ transcripcion,
                },

          {
            role: 'user',
            content: "Experiencia laboral : (Aca iria la informacion recopilada de la experiencia laboral y academica, separada por comas relacionado con desarrollo de software)"+
            "Historial educativo : (aca iria  la informacion recopilada de grados o estudios y universidades o institutos)."+
            "Aspectos que hacen que esta persona sea única : (aca iria  la informacion recopilada sobre que hace unico al entrevistado)"+
            "Tecnologías o stack tecnológico mencionado : (lista de tecnologias, lenguajes de programacion y herramientas, separadas por comas)"+
            "Resumen : (aca iria el resumen del candidato relacionado con desarrollo)."
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

      const respuesta = response.choices[0].message.content;

      console.log(respuesta);

      fs.createWriteStream("respuesta.txt").write(respuesta);

      const dataFormated = formatData(respuesta);

      return dataFormated;
    } catch (error) {
      console.error("Error al llamar la API de OpenAI", error);
    }
  }
}

export default DataController;
