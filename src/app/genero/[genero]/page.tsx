"use client"
import axios from "axios";
import { use, useEffect, useState } from "react";
import { livro } from "../../types/types";
import style from "./styles.module.css";
import { useRouter } from "next/navigation";
import Getlivros from "@/app/actions/actions";

export default function Genero({
  params,
}: {
  params: Promise<{ genero: string }>;
}) {
  const { genero } = use(params);
  const generoDecodificado = decodeURIComponent(genero);
  
  
  const router = useRouter();

  const [livros, setLivros] = useState<livro[]>([]);
  const [livroGenero, setlivroGenero] = useState<livro[]>([]);
  const [pesquisa, setPesquisa] = useState(false);
  const [livroEncontrado, setLivroEncontrado] = useState<livro>();
  function handleClick() {
    setPesquisa(true);
    setLivroEncontrado(BuscarLivro(Busca));
    console.log(BuscarLivro(Busca))
  }
  
  useEffect(() => {
    async function fetchData() {
      const data = await Getlivros(); // Espera pela função assíncrona
      setLivros(data); // Atualiza o estado com os dados
    }
    fetchData();
  }, []);
  
  useEffect(() => {

    setlivroGenero(livros.filter((livro) => livro.genero == generoDecodificado));
    
  }, [livros]);
  
  function HandleClickHome() {
    router.push("/home");
  }
  function HandleClickLivro(id: number) {
    router.push(`/Detalhe/${id}`);
  }
  const [Busca, setBusca] = useState("");
  let livroBusca;
  function BuscarLivro(titulo: string): livro | undefined {
    let tituloMin = titulo.toLowerCase();
    console.log(tituloMin);
  
    let livroBusca = livroGenero.find((livro) =>
      livro.titulo.toLowerCase().includes(tituloMin)
    );
  
    return livroBusca;
  }
  {
    /* este if faz com que caso a busca, ou seja input seja vazio, entao ele dirá que a pesquisa não esta ocorrendo.
        ou seja, caso input esteja vazio, em qualquer situação, então ele irá mostrar todos os livros normalmente*/
  }
  if (Busca == "" && pesquisa == true) {
    setLivroEncontrado(undefined);
    setPesquisa(false);
  }
  return (
    <>
      <form className={style.quadro} onSubmit={(e) => e.preventDefault()}>
        <button
          type="submit"
          onClick={handleClick}
          className={style.botaoBusca}
        ></button>
        <input
          type="text"
          className={style.inputBusca}
          placeholder="Pesquisar por título"
          value={Busca}
          onChange={(e) => {
            setBusca(e.target.value);
          }}
        />
      </form>
      {/* Nesta parte ele irá verificar se esta em pesquisa ou não, se não estiver ele mostra com map com todos livros daquele gênero
            mas se estiver em pesquisa ele irá ver outra condição.
            caso "livroencontrado" nao seja vazio, isso é, ele achou um livro que existe, então ele mostrará o livro pesquisado,
            caso contrário, ele irá exibir na tela que nã foi encotrado esse livro */}
      {pesquisa ? (
        livroEncontrado ? (
          <div style={{ marginLeft: "3rem", marginBottom: "6rem" }}>
            <div className={style.genero} style={{ marginLeft: "0px" }}>
              <h3 className={style.generoVoltar} onClick={HandleClickHome}>
                {" "}
                {generoDecodificado}
              </h3>
              <button className={style.botao} onClick={HandleClickHome}>
                &lt;
              </button>
            </div>
            <div
              onClick={() => HandleClickLivro(livroEncontrado.id)}
              className={style.cardLivro}
            >
              <img src={livroEncontrado.capa} alt="capa do livro" />
              <div className={style.texto}>
                <h4>{livroEncontrado.titulo}</h4>
                <div className={style.titulo}>
                  <p>{livroEncontrado.autor}</p>
                  <h3>R${livroEncontrado.preco.toFixed(2)}</h3>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10rem",
            }}
          >
            <h1 className={style.textoVazio}>Livro não encontrado.</h1>
          </div>
        )
      ) : (
        <div className={style.quadroLivros}>
          <div className={style.genero}>
            <h3 className={style.generoVoltar} onClick={HandleClickHome}>
              {" "}
              {generoDecodificado}
            </h3>
            <button className={style.botao} onClick={HandleClickHome}>
              &lt;
            </button>
          </div>
          <div className={style.listaLivro}>
            {livroGenero.map((livro) => (
              <div key={livro.id}>
                <div
                  onClick={() => HandleClickLivro(livro.id)}
                  className={style.cardLivro}
                >
                  <img src={livro.capa} alt="capa do livro" />
                  <div className={style.texto}>
                    <h4>{livro.titulo}</h4>
                    <div className={style.titulo}>
                      <p>{livro.autor}</p>
                      <h3>R${livro.preco.toFixed(2)}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
