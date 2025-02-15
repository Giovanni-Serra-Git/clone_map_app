/* eslint-disable no-unused-vars */
// api/questions.js

import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    // Legge il file JSON dalla cartella 'data'
    const filePath = path.resolve('data', 'cities.json');
    const data = await fs.readFile(filePath, 'utf8'); // Usa fs.promises per la lettura asincrona

    res.status(200).json(JSON.parse(data)); // Risponde con i dati JSON
    console.log(data)
  } catch (error) {
    res.status(500).json({ message: 'Errore nel leggere il file JSON' });
  }
}
