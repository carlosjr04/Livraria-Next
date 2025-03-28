"use client"

import style from "./style.module.css";
import useCartStore from "../store/CartStore";
export default function Carrinho() {
  const cart = useCartStore((state)=>state.cart)
  const removeFromCart = useCartStore((state)=>state.removeFromCart)

  function Comprar(id: number) {
    let confirmar = confirm("Deseja comprar este livro?");
    
    if (confirmar) {
      removeFromCart(id)
      alert("Livro comprado com sucesso!");
    }
  }
  function Deletar(id: number) {
    let confirmar = confirm("Deseja retirar este livro de seu carrinho?");
    
    if (confirmar) {
      removeFromCart(id)
    }
  }
  return (
    <>
      {cart.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10rem",
          }}
        >
          <h1 className={style.textoVazio}>
            Não possui nenhum livro em seu carrinho
          </h1>
        </div>
      ) : (
        <div className={style.lista}>
          {cart.map((livro) => (
            <div key={livro.id}>
              <div className={style.cardLivro}>
                <img src={livro.capa} alt="capa do livro" />
                <div className={style.texto}>
                  <h4>{livro.titulo}</h4>
                  <div className={style.titulo}>
                    <p>{livro.autor}</p>
                    <h3>R${livro.preco.toFixed(2)}</h3>
                  </div>
                </div>
                <div className={style.botoes}>
                  <button
                    onClick={() => Comprar(livro.id)}
                    className={style.comprar}
                  >
                    Comprar
                  </button>
                  <button
                    onClick={() => Deletar(livro.id)}
                    className={style.excluir}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
