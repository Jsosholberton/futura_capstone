import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

async function downloadData() {
    const databaseId = process.env.NOTION_DB_ID;
    const response = await notion.databases.query({
        database_id: databaseId,
    });

    const writeStream = fs.createWriteStream("newData.json");

    // Write the JSON data to the stream
    writeStream.write(JSON.stringify(response, null, 2));

    // Close the stream to ensure the data is written
    writeStream.end();

}

downloadData();