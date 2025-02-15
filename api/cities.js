/* eslint-disable no-unused-vars */
import { promises as fs } from 'fs';
import path from 'path';

export const handler = async (req, res) => {
  try {
    // Legge il file 'cities.json' dalla cartella 'data'
    const filePath = path.resolve('data/cities.json');
    const data = await fs.readFile(filePath, 'utf8'); // Usa fs.promises per la lettura asincrona

    res.status(200).json(JSON.parse(data)); // Restituisci i dati letti dal file JSON
  } catch (error) {
    res.status(500).json({ message: 'Errore nel leggere il file JSON' });
  }
};
