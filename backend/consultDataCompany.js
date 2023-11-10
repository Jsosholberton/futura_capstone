import { Client } from '@notionhq/client';
import fs from 'fs';
const notion = new Client({ auth: 'secret_Rq7XS1Rdgs3pcTx5uzmKRLzhy415RqJRHCnbHyyKi2Q' });
(async () => {
  const response = await notion.pages.retrieve({ 
    //database_id: 'a1192ee5fdc041ffb8710d720840735d',
    page_id: '6653cb1cf73444679c4005a64a973e3b',
});
  console.log(JSON.stringify(response, null, 2));
    fs.writeFileSync('response.json', JSON.stringify(response, null, 2));
})();
