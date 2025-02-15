/* eslint-disable no-unused-vars */
// api/cities.js

import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.resolve('data/cities.json'); // Modifica questo percorso se necessario

export const handler = async (event, context) => {
  try {
    const method = event.httpMethod;  // Ottieni il metodo HTTP (GET, POST, PUT, DELETE)

    // Gestione del metodo GET (recupero delle città)
    if (method === 'GET') {
      const data = await fs.readFile(filePath, 'utf8');
      return {
        statusCode: 200,
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    // Gestione del metodo POST (aggiunta di una nuova città)
    if (method === 'POST') {
      const newCity = JSON.parse(event.body);
      const data = await fs.readFile(filePath, 'utf8');
      const cities = JSON.parse(data);

      cities.push(newCity);

      await fs.writeFile(filePath, JSON.stringify(cities, null, 2));

      return {
        statusCode: 201,
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    // Gestione del metodo DELETE (eliminazione di una città)
    if (method === 'DELETE') {
      const { id } = JSON.parse(event.body);
      const data = await fs.readFile(filePath, 'utf8');
      let cities = JSON.parse(data);

      // Filtra la città con l'ID specificato
      cities = cities.filter((city) => city.id !== id);

      await fs.writeFile(filePath, JSON.stringify(cities, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'City deleted successfully' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    // Gestione del metodo PUT (modifica di una città)
    if (method === 'PUT') {
      const updatedCity = JSON.parse(event.body);
      const data = await fs.readFile(filePath, 'utf8');
      let cities = JSON.parse(data);

      // Trova l'indice della città da modificare
      const cityIndex = cities.findIndex((city) => city.id === updatedCity.id);
      if (cityIndex === -1) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'City not found' }),
        };
      }

      // Aggiorna la città
      cities[cityIndex] = updatedCity;

      await fs.writeFile(filePath, JSON.stringify(cities, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify(updatedCity),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing request', error: error.message }),
    };
  }
};
