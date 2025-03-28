"use server"

import axios from "axios";
import { livro } from "../types/types";

export default async function Getlivros():Promise<livro[]> {
    const response = await axios.get("http://localhost:3001/livros");
    return response.data; 
  }