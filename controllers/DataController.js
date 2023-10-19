const { Client } = require("@notionhq/client");
require("dotenv").config();
const OpenAI = require("openai");
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
      if (element.properties.Transcripcion.files[0]) {
        const fileUrl = element.properties.Transcripcion.files[0].file.url;
        axios({
          method: "get",
          url: fileUrl,
          responseType: "stream",
        })
          .then((response) => {
            const writer = fs.createWriteStream("transcripcion.txt");
            response.data.pipe(writer);

            fs.readFile(
              "./transcripcion.txt",
              "utf8",
              async (err, transcripcion) => {
                if (err) {
                  console.error(err);
                  res.status(500).send("Error");
                  return;
                }

                const data = await DataController.processData(transcripcion);

                if (data == undefined) {
                  res.status(500).send("Error, API OpenAI");
                  return;
                }

                const newData = await notion.pages.update({
                  page_id: id,
                  properties: data,
                });

                res.render("MyReactView", { newData });
              }
            );
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error, processing the txt file");
          });
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
      const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: `${process.env.SECRET_PROMPT} ${transcripcion}` }],
        model: "gpt-3.5-turbo",
        temperature: 0,
        //max_tokens: 50,
      });

      console.log(response.choices[0]);

      const respuesta = response.choices[0].message.content;

      console.log(respuesta);

      // Pendiente tokenizar respuesta
      const transcripcionArray = respuesta.split("\n");

      console.log(transcripcionArray);

      return {
        "Que lo hace único?": {
          rich_text: [
            {
              text: {
                content: transcripcionArray[4],
              },
            },
          ],
        },
        "Tech Stack": {
          rich_text: [
            {
              text: {
                content: transcripcionArray[6],
              },
            },
          ],
        },
        "Experiencia Laboral": {
          rich_text: [
            {
              text: {
                content: transcripcionArray[0],
              },
            },
          ],
        },
        Educación: {
          rich_text: [
            {
              text: {
                content: transcripcionArray[2],
              },
            },
          ],
        },
        Empresa: {
          rich_text: [
            {
              text: {
                content: transcripcionArray[0],
              },
            },
          ],
        },
        Empresa1: {
          rich_text: [
            {
              text: {
                content: transcripcionArray[0],
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
    } catch (error) {
      console.error("Error al llamar la API de OpenAI", error);
    }
  }
}

module.exports = DataController;
