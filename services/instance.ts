import axios from "axios";

export const Instace = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})