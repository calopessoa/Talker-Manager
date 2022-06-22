// import { readFile, writeFile } from 'fs/promises';

const { readFile, writeFile } = require('fs/promises');

async function read() {
  try {
    const data = await readFile('talker.json', { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function write(content) {
  try {
    await writeFile('talker.json', JSON.stringify(content));
  } catch (err) {
    console.log(err);
  }
}

module.exports = { read, write };
