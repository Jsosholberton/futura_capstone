const { Client } = require("@notionhq/client");
require("dotenv").config();
const OpenAI = require('openai');

const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

class DataController {
  static async updateNotionData(req, res) {
    const { id } = req.params;
    try {
      const lastData = await notion.pages.retrieve({
        page_id: id,
      });

      // if (lastData.properties.Transcripcion.rich_text[0]) {
      //   const transcripcion =
      //     lastData.properties.Transcripcion.rich_text[0].text.content;
        const data = DataController.processData();//transcripcion);
        const newData = await notion.pages.update({
          page_id: id,
          properties: data,
        });
        res.render("MyReactView", { newData });
      // } else {
      //   res.status(500).send("No hay transcripcion");
      // }
    } catch (error) {
      res.status(500).send("Error");
      console.error(error);
    }
  }

  static processData() {//transcripcion) {
    // openai.completions
    //   .create({
    //     model: "text-davinci-002",
    //     prompt: `Con la siguiente transcripcion crea un array de longitud dos, donde el primer array tenga las habilidades de la persona entrevistada y el segundo la experiencia de lo sigueinte: ${transcripcion}`,
    //     max_tokens: 50,
    //   })
    //   .then((response) => {
    //     const respuesta = response.choices[0].text;
    //     const transcripcionArray = [respuesta];

        const resultado = {
          "Que lo hace único?": {
            rich_text: [
              {
                text: {
                  content: "New Skill",//transcripcionArray[0],
                },
              },
            ],
          },
          "Tech Stack": {
            rich_text: [
              {
                text: {
                  content: "New Experience",//transcripcionArray[0],
                },
              },
            ],
          },
          "Experiencia Laboral": {
            rich_text: [
              {
                text: {
                  content: "New Summary",//transcripcionArray[0],
                },
              },
            ],
          },
          "Educación": {
            rich_text: [
              {
                text: {
                  content: "New Summary",//transcripcionArray[0],
                },
              },
            ],
          },
          "Compañía": {
            rich_text: [
              {
                text: {
                  content: "New Summary",//transcripcionArray[0],
                },
              },
            ],
          },
          "Empresa": {
            rich_text: [
              {
                text: {
                  content: "New Summary",//transcripcionArray[0],
                },
              },
            ],
          },
          "Empresa1": {
            rich_text: [
              {
                text: {
                  content: "New Summary",//transcripcionArray[0],
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
      // })
      // .catch((error) => {
      //   console.error("Error al llamar a la API de OpenAI:", error);
      // });
  }
}

module.exports = DataController;
