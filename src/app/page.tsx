
import style from "./styles.module.css";
import Form from "../componentes/Form/Form";
import { Metadata } from "next";
import { Barlow, Manrope } from "next/font/google";

export const metadata:Metadata = {
  title:"Home-Livraria",
  description:"Login para livraria"
}

export default function Home() {
  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ margin: "0px", overflow: "hidden" }}>
          <img
            src="/Picture.png"
            alt="livraria"
            style={{
              width: "50vw",
              height: "100vh",

              objectFit: "cover",
            }}
          />
        </div>
        <div className={style.login}>
          <div className={style.logo}>
            <img src="/Logo.png" alt="logo da livraria" />
          </div>
          <div className={style.CaixaLogin}>
            <div className={style.entre}>
              <p>Bem vindo(a)!</p>
              <h2>Entre na sua conta</h2>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}
