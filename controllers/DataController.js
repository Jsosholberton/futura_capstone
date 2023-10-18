const { Client } = require("@notionhq/client");
require("dotenv").config();
const OpenAI = require('openai');
const axios = require("axios");
const fs = require("fs");

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
      if (element.properties.Transcripcion.files[0]){
        const fileUrl = element.properties.Transcripcion.files[0].file.url;
        axios({
          method: 'get',
          url: fileUrl, 
          responseType: 'stream',
        })
        .then ((response) =>{
          const writer = fs.createWriteStream('transcripcion.txt');
          response.data.pipe(writer);

          fs.readFile("./transcripcion.txt", "utf8", async (err, transcripcion) => {
            if (err) {
              console.error(err);
              return;
            }

            const data = DataController.processData(transcripcion);

            const newData = await notion.pages.update({
              page_id: id,
              properties: data,
            });

            res.render("MyReactView", { newData });
          });
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        console.log("No hay archivo");
        res.status(500).send("Error");
      }
    } catch (error) {
      res.status(500).send("Error");
      console.error(error);
    }
  }

  static processData(transcripcion) {
    openai.completions
      .create({
        model: "text-davinci-002",
        prompt: `Con la siguiente transcripcion crea un array de longitud dos, donde el primer array tenga las habilidades de la persona entrevistada y el segundo la experiencia de lo siguiente: ${transcripcion}`,
        max_tokens: 50,
      })
      .then((response) => {
        const respuesta = response.choices[0].text;
        const transcripcionArray = [respuesta];
        const resultado = {
          "Que lo hace único?": {
            rich_text: [
              {
                text: {
                  content: transcripcionArray[0] || "Lo hace unico...",
                },
              },
            ],
          },
          "Tech Stack": {
            rich_text: [
              {
                text: {
                  content: transcripcionArray[0] || "Tech Stack...",
                },
              },
            ],
          },
          "Experiencia Laboral": {
            rich_text: [
              {
                text: {
                  content: transcripcionArray[0] || "Experiencia Laboral...",
                },
              },
            ],
          },
          "Educación": {
            rich_text: [
              {
                text: {
                  content: transcripcionArray[0]  || "Educación...",
                },
              },
            ],
          },
          "Empresa": {
            rich_text: [
              {
                text: {
                  content: transcripcionArray[0] || "Empresa...",
                },
              },
            ],
          },
          "Empresa1": {
            rich_text: [
              {
                text: {
                  content: transcripcionArray[0] || "Empresa1...",
                },
              },
            ],
          },
          // "Candidate Agreement": {
          //   rich_text: [
          //     {
          //       text: {
          //         content: "New Summary",//transcripcionArray[0],
          //       },
          //     },
          //   ],
          // },
        };
        // console.log(resultado);
        return resultado;
       })
      .catch((error) => {
        console.error("Error al llamar a la API de OpenAI:", error);
      });
  }
}

module.exports = DataController;
