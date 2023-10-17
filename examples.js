//secret_Rq7XS1Rdgs3pcTx5uzmKRLzhy415RqJRHCnbHyyKi2Q

const { Client } = require("@notionhq/client");
const fs = require("fs");
const axios = require("axios");

const notion = new Client({
  //auth: process.env.NOTION_TOKEN,
  auth: "secret_Rq7XS1Rdgs3pcTx5uzmKRLzhy415RqJRHCnbHyyKi2Q",
});


async function getNotionData() {
  // https://www.notion.so/72c9c0f42b4149b6af29530efd8b6d13?v=57703a5e23b747e091570024accc5d09&pvs=4

  const results = await notion.databases.query({
    database_id: "72c9c0f42b4149b6af29530efd8b6d13",
  });

  fs.writeFileSync("data.json", JSON.stringify(results, null, 2));

  fileName = results.results.map(
    (item) => item.properties.Recorded.files[0].name
  );
  fileName = fileName.toString().replace(/ /g, "_");

  fileUrl = results.results.map(
    (item) => item.properties.Recorded.files[0].file.url
  );

  fileUrl = fileUrl.toString();

  downloadFile(fileName, fileUrl);
  //console.log(fileUrl);
  //console.log(fileName);
  //console.log(results.results.map((item) => item.properties.Name.title[0].plain_text));
}

getNotionData();

async function addNotionData() {
  try {
    const newData = await notion.pages.create({
      parent: {
        database_id: "72c9c0f42b4149b6af29530efd8b6d13",
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "New Item",
              },
            },
          ],
        },
        Tags: {
          multi_select: [
            {
              name: "New Tag",
            },
          ],
        },
      },
    });
    console.log(newData);
  } catch (error) {
    console.error(error.body);
  }
}
// addNotionData();

async function updateNotionData() {
  try {
    const newData = await notion.pages.update({
      page_id: "d428361e-0dad-4941-9269-dbb3b5e7fff4",
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Updated Item",
              },
            },
          ],
        },
        Tags: {
          multi_select: [
            {
              name: "Updated Tag",
            },
          ],
        },
      },
    });
    console.log(newData);
    getNotionData();
  } catch (error) {
    console.error(error.body);
  }
}
// updateNotionData();

async function deleteNotionData() {
  try {
    const newData = await notion.pages.update({
      page_id: "d428361e-0dad-4941-9269-dbb3b5e7fff4",
      archived: true,
    });
    console.log(newData);
    getNotionData();
  } catch (error) {
    console.error(error.body);
  }
}

// deleteNotionData();

async function recoverNotionData() {
  try {
    const newData = await notion.pages.update({
      page_id: "d428361e-0dad-4941-9269-dbb3b5e7fff4",
      archived: false,
    });
    console.log(newData);
    getNotionData();
  } catch (error) {
    console.error(error.body);
  }
}

// recoverNotionData();

function downloadFile(fileName, fileUrl) {
    axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
      })
        .then(response => {
          // Crea un flujo de escritura para el archivo de destino
          const writer = fs.createWriteStream(`./downloads/${fileName}`);

          // Escribe el flujo de datos en el archivo
          response.data.pipe(writer);

          // Maneja el evento cuando la descarga se completa
          writer.on('finish', () => {
            console.log('Archivo descargado con éxito');
          });

          // Maneja errores durante la descarga
          writer.on('error', (err) => {
            console.error('Error al descargar el archivo:', err);
          });
        })
        .catch(error => {
          console.error('Error al realizar la solicitud HTTP:', error);
        });

}
