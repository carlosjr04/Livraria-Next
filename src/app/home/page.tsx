"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { livro } from "../types/types";
import style from "./styles.module.css";
import Livros from "../../componentes/livros/Livros";
import Link from "next/link";
import Getlivros from "../actions/actions";

export default function Home() {
  const [livros, setLivros] = useState<livro[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await Getlivros(); 
      setLivros(data);
    }
    fetchData();
  }, []);
  {
    /* esta função gera números aleatórios dentro da lista dos livros do genero.
        Vendo se eles já foram postos na lista para não se repetir*/
  }
  function gerarLivroaleatorio(genero: string): livro[] {
    let livrosValidos: livro[] = [];
    const livrosGenero: livro[] = livros.filter(
      (livro) => livro.genero === genero
    );
    while (
      livrosValidos.length < 4 &&
      livrosValidos.length < livrosGenero.length
    ) {
      let numAleatorio = Math.floor(Math.random() * livrosGenero.length);
      const livroEscolhido = livrosGenero[numAleatorio];

      if (!livrosValidos.find((livro) => livro.id === livroEscolhido.id)) {
        livrosValidos.push(livroEscolhido);
      }
    }
    return livrosValidos;
  }
  const generos = [
    "Clássicos",
    "Infantil",
    "Fantasia",
    "Suspense",
    "Distopia",
    "Ficção Científica",
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center",marginBottom:"5rem" }}>
        <img src="/Banner Area.png" alt="" />
      </div>
      {generos.map((genero) => (
        <div key={genero} className={style.headerContainer}>
          <div className={style.header}>
            <h2>{genero}</h2>
            <Link href={`/genero/${genero}`} className={style.verMais}>
              Ver mais
            </Link>
          </div>
          <ul className={style.listalivro}>
            {gerarLivroaleatorio(genero).map((livro) => (
              <Livros
                key={livro.id}
                id={livro.id}
                autor={livro.autor}
                capa={livro.capa}
                genero={livro.genero}
                preco={livro.preco}
                sinopse={livro.sinopse}
                titulo={livro.titulo}
              />
            ))}
          </ul>
        </div>
      ))}
      <br />
      <br />
    </>
  );
}
