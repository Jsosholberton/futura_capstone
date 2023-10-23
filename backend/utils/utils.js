import axios from "axios";
import fs from "fs";
import { promises as pr } from "fs";

async function reduceTranscription(transcripcion) {
  const regex = /^(\d+:\d+) (?!Alejandro Pineda:)(.+)$/gm;

  const resultados = [];
  let match;
  while ((match = regex.exec(transcripcion)) !== null) {
    resultados.push(`${match[1]} ${match[2]}`);
  }

  return resultados.join("\n");
}

function downloadTxt(fileUrl) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: fileUrl,
      responseType: "stream",
    })
      .then((response) => {
        const writer = fs.createWriteStream("transcripcion.txt");
        response.data.pipe(writer);

        writer.on('finish', () => {
          resolve(true);
        });
        writer.on('error', (error) => {
          console.error("Error al descargar el archivo: " + error.message);
          reject(false);
        });
      })
      .catch((error) => {
        console.error("Error al descargar el archivo: " + error.message);
        reject(false);
      });
  });

}

function deleteTxt() {
  fs.unlink("transcripcion.txt", (err) => {
    if (err) {
      console.error(err.message);
      return false;
    }
    return true;
  });
}

function formatData(data) {
  const dataArr = data.split("\n");

  return {
    "Que lo hace único?": {
      rich_text: [
        {
          text: {
            content: dataArr[2],
          },
        },
      ],
    },
    "Tech Stack": {
      rich_text: [
        {
          text: {
            content: dataArr[3],
          },
        },
      ],
    },
    "Experiencia Laboral": {
      rich_text: [
        {
          text: {
            content: dataArr[0],
          },
        },
      ],
    },
    Educación: {
      rich_text: [
        {
          text: {
            content: dataArr[1],
          },
        },
      ],
    },
    Empresa: {
      rich_text: [
        {
          text: {
            content: dataArr[0],
          },
        },
      ],
    },
    Empresa1: {
      rich_text: [
        {
          text: {
            content: dataArr[0],
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
}

async function readTxt() {
    try {
        const data = await pr.readFile('transcripcion.txt', 'utf8');
        return data;
      } catch (err) {
        console.error('Error al leer el archivo:', err);
        return undefined;
      }
}

export {
  reduceTranscription,
  formatData,
  downloadTxt,
  readTxt,
  deleteTxt,
};
