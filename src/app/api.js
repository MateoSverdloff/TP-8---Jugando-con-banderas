"use client"
import axios from 'axios';


export const getCountriesFlags = async () => {
  try {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener los países y sus banderas', error);
    return [];
  }
};