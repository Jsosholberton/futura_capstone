import axios from "axios"; // For making HTTP requests
import fs from "fs"; // For file system operations
import { jsPDF } from "jspdf"; // For generating PDF documents
import { promises as pr } from "fs"; // Promisified file system operations
import nodemailer from "nodemailer"; // For sending emails

// Define a function to reduce transcription by extracting certain lines
async function reduceTranscription(transcripcion) {
  const regex = /^(\d+:\d+) (?!Santiago Martinez:)(.+)$/gm;

  const resultados = [];
  let match;
  while ((match = regex.exec(transcripcion)) !== null) {
    resultados.push(`${match[2].split(":")[1]}`);
  }

  return resultados.join("\n");
}

// Define a function to download a file from a given URL
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

// Define a function to delete a text file
function deleteTxt() {
  fs.unlink("transcripcion.txt", (err) => {
    if (err) {
      console.error(err.message);
      return false;
    }
    return true;
  });
}

// Define a function to format data into a specific structure
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
  const TechStack = dataArr[3].split(":")[1].split(",").map(stack => ({ name: stack.replace(".", "") }));
  const sTechS = dataArr[9].split(":")[1].split(",").map(stack => ({ name: stack.replace(".", "") }));
  const positions = dataArr[6].split(":")[1].split(",").map(position => ({ name: position.replace(".", "") }));
  const industrias = dataArr[7].split(":")[1].split(",").map(industria => ({ name: industria.replace(".", "") }));

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

// Define a function to read the contents of a text file
async function readTxt() {
    try {
        const data = await pr.readFile('transcripcion.txt', 'utf8');
        return data;
      } catch (err) {
        console.error('Error al leer el archivo:', err);
        return undefined;
      }
}


// Define a function to send a candidate agreement via email
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
          encoding: "utf-8"
      }
    ]
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
