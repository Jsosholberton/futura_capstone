const axios = require("axios");
const fs = require("fs");
const pr = require("fs").promises;

function reduceTranscription(transcripcion) {
  const regex = /^(\d+:\d+) (?!Alejandro Pineda:)(.+)$/gm; // We need to add the name of the interviewer

  const resultados = [];
  let match;
  while ((match = regex.exec(transcripcion)) !== null) {
    resultados.push(`${match[1]} ${match[2]}`);
  }

  return resultados.join("\n");
}

function downloadTxt(fileUrl) {
  axios({
    method: "get",
    url: fileUrl,
    responseType: "stream",
  })
    .then((response) => {
      const writer = fs.createWriteStream("transcripcion.txt");
      response.data.pipe(writer);
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
  return true;
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

module.exports = {
  reduceTranscription,
  formatData,
  downloadTxt,
  readTxt,
};
