"use client"
import { livro } from "../../types/types";
import style from "./style.module.css";
import Link from "next/link";

export default function Livros(livro: livro) {
  
  
  return (
    <Link href={`/Detalhe/${livro.id}`}>
      <div className={style.quadro}>
      <img src={livro.capa} alt="capa do livro" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div className={style.titulo}>
          <h3>{livro.titulo}</h3>
          <p>{livro.autor}</p>
        </div>
        <h2 className={style.preco}>R${livro.preco.toFixed(2)}</h2>
      </div>
    </div>
    </Link>
    
  );
}
