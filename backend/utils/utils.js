/**
 * Imports necessary libraries and modules for the application.
 */
import axios from "axios"; // For making HTTP requests
import fs from "fs"; // For file system operations
import { promises as pr } from "fs"; // Promisified file system operations
import nodemailer from "nodemailer"; // For sending emails

/**
 * Reduces a transcription by extracting specific lines.
 *
 * @param {string} transcripcion - The transcription text to be processed.
 * @returns {string} The reduced transcription text.
 */
async function reduceTranscription(transcripcion) {
  const regex = /^(\d+:\d+) (?!Santiago Martinez:)(.+)$/gm; // Name of the interviewer

  const resultados = [];
  let match;
  while ((match = regex.exec(transcripcion)) !== null) {
    resultados.push(`${match[2].split(":")[1]}`);
  }

  return resultados.join("\n");
}

/**
 * Downloads a text file from a given URL.
 *
 * @param {string} fileUrl - The URL of the file to be downloaded.
 * @returns {Promise<boolean>} A Promise that resolves to true on successful download or false on error.
 */
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

        writer.on("finish", () => {
          resolve(true);
        });
        writer.on("error", (error) => {
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

/**
 * Deletes a text file.
 *
 * @returns {boolean} True on successful deletion, false on error.
 */
function deleteTxt() {
  fs.unlink("transcripcion.txt", (err) => {
    if (err) {
      console.error(err.message);
      return false;
    }
    return true;
  });
}

/**
 * Formats data into a specific structure.
 *
 * @param {string} data - The data to be formatted.
 * @returns {Object} The formatted data in a specific structure.
 */
function formatData(data) {
  // Split the data into an array and remove empty lines
  const dataArrTmp = data.split("\n");
  const dataArr = [];

  for (data in dataArrTmp) {
    if (dataArrTmp[data] !== "") {
      dataArr.push(dataArrTmp[data]);
    }
  }

  // Extract and format specific data points
  const TechStack = dataArr[3]
    .split(":")[1]
    .split(",")
    .map((stack) => ({ name: stack.replace(".", "") }));
  const sTechS = dataArr[9]
    .split(":")[1]
    .split(",")
    .map((stack) => ({ name: stack.replace(".", "") }));
  const positions = dataArr[6]
    .split(":")[1]
    .split(",")
    .map((position) => ({ name: position.replace(".", "") }));
  const industrias = dataArr[7]
    .split(":")[1]
    .split(",")
    .map((industria) => ({ name: industria.replace(".", "") }));

  return {
    "Que lo hace único?": {
      rich_text: [
        {
          text: {
            content: dataArr[2].split(":")[1],
          },
        },
      ],
    },
    "Tech Stack": {
      multi_select: TechStack,
    },
    "Tech Stack especializado": {
      multi_select: sTechS,
    },
    "Experiencia Laboral": {
      rich_text: [
        {
          text: {
            content: dataArr[0].split(":")[1],
          },
        },
      ],
    },
    Educación: {
      rich_text: [
        {
          text: {
            content: dataArr[1].split(":")[1],
          },
        },
      ],
    },
    Copy: {
      rich_text: [
        {
          text: {
            content: dataArr[4].split(":")[1],
          },
        },
      ],
    },
    Posición: {
      multi_select: positions,
    },
    "Años de experiencia": {
      number: parseInt(dataArr[5].split(":")[1]),
    },
    Industria: {
      multi_select: industrias,
    },
    "Salary Expected": {
      rich_text: [
        {
          text: {
            content: dataArr[8].split(":")[1],
          },
        },
      ],
    },
  };
}

/**
 * Reads the contents of a text file.
 *
 * @returns {Promise<string | undefined>} A Promise that resolves to the file contents or undefined on error.
 */
async function readTxt() {
  try {
    const data = await pr.readFile("transcripcion.txt", "utf8");
    return data;
  } catch (err) {
    console.error("Error al leer el archivo:", err);
    return undefined;
  }
}

/**
 * Sends a candidate agreement via email.
 *
 * @param {Object} user - The user object containing email and other properties.
 */
async function sendCandidateAgreement(user) {
  const email = user.properties["Correo electrónico"].email;

  const name = user.properties.Nombre.title[0].plain_text;

  const fileName = `${name.replace(/\s/g, "_")}.pdf`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "enviocorreopdf@gmail.com",
      pass: "diaq xmru ndzt lwzp",
    },
  });

  const info = await transporter.sendMail({
    from: "enviocorreopdf@gmail.com",
    to: email,
    subject: `Hola ${name}, este es el acuerdo de candidato`,
    text: `Hola ${name}, este es el acuerdo de candidato...`,
    attachments: [
      {
        filename: fileName,
        path: `./downloads/${fileName}`,
        encoding: "utf-8",
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
}

export {
  reduceTranscription,
  formatData,
  downloadTxt,
  readTxt,
  deleteTxt,
  sendCandidateAgreement,
};
