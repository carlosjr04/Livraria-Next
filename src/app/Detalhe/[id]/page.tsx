"use client";

import style from "./styles.module.css";
import { useEffect, useState, use } from "react";
import { livro } from "../../types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import useCartStore from "@/app/store/CartStore";
import Getlivros from "@/app/actions/actions";

export default function Livro({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  // 📌 Usando React.use() para resolver a Promise
  const { id } = use(params);

  const [livroUnd, setLivroUnd] = useState<livro | null>(null);
  const [livroLista, setLivroLista] = useState<livro[]>([]);

  // Buscar livros ao montar o componente
  useEffect(() => {
    async function fetchData() {
      const data = await Getlivros(); // Espera pela função assíncrona
      setLivroLista(data); // Atualiza o estado com os dados
    }
    fetchData();
  }, []);
  
  // Definir o livro correto quando `livroLista` estiver carregada
  useEffect(() => {
    if (livroLista.length > 0) {
      const livroEncontrado = livroLista.find((item) => item.id.toString() === id);
      console.log(livroEncontrado)
      setLivroUnd(livroEncontrado || null);
    }
  }, [livroLista]);

  function handleClickHome() {
    window.history.back()
  }
  console.log(livroLista)
  function compra() {
    if (!livroUnd) return;

    let livroRepetido = cart.find((element) => element.id.toString() === id);
    let confirmar = confirm(
      livroRepetido
        ? "Deseja adicionar esse livro novamente ao seu carrinho?"
        : "Deseja adicionar esse livro ao seu carrinho?"
    );

    if (confirmar) {
      addToCart(livroUnd);
    }
  }

  return (
    <>
      <div className={style.livro}>
        <div className={style.detalhe}>
          <h3 onClick={handleClickHome} className={style.voltarTexto}>
            Detalhe do livro
          </h3>
          <button onClick={handleClickHome} className={style.voltar}>
            &lt;
          </button>
        </div>
        <div className={style.quadro}>
          <div className={style.imagem}>
            <img src={livroUnd?.capa} alt="Capa do livro" />
          </div>
          <div className={style.texto}>
            <div className={style.titulo}>
              <h2>{livroUnd?.titulo}</h2>
              <p>{livroUnd?.autor}</p>
            </div>
            <div className={style.sinopse}>
              <strong>Sinopse</strong>
              <p>{livroUnd?.sinopse}</p>
            </div>
          </div>
        </div>
      </div>
      <button className={style.botao} onClick={compra} disabled={!livroUnd}>
        <p>R${livroUnd?.preco.toFixed(2)}</p>
        <p>Adicione ao carrinho</p>
      </button>
    </>
  );
}
