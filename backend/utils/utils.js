import axios from "axios";
import fs from "fs";
import { jsPDF } from "jspdf";
import { promises as pr } from "fs";
import nodemailer from "nodemailer";

async function reduceTranscription(transcripcion) {
  const regex = /^(\d+:\d+) (?!Santiago Martinez:)(.+)$/gm;

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
  const dataArrTmp = data.split("\n");
  const dataArr = [];

  for (data in dataArrTmp) {
    if (dataArrTmp[data] !== "") {
      dataArr.push(dataArrTmp[data]);
    }
  }

  const TechStack = dataArr[3].split(":")[1].split(",").map(stack => ({ name: stack.replace(".", "") }));

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
            content: dataArr[4],
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

// como me traigo el correo electronico del candidato????
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
};

export {
  reduceTranscription,
  formatData,
  downloadTxt,
  readTxt,
  deleteTxt,
  sendCandidateAgreement,
};
