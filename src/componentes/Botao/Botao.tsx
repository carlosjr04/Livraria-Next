"use client"

import {  useState } from "react";
import style from "./style.module.css";
import { botao } from "@/app/types/types";
import { useRouter } from "next/navigation";
import useValidStore from "@/app/store/ButtonStore";



export default function Botao(isValid:botao) {
  const router = useRouter();
  let valid = useValidStore((state)=>state.valid)

  const [isSubimiting, setSubmit] = useState<boolean>(false)
  async function handleClick() {
    setSubmit(true)
    
  }
  return (
    <>
      <div className={style.botao}>
        <button onClick={handleClick} className={style.entrar}>
          {!valid ? "Login" : "Carregando..."}
        </button>
        <button className={style.cadastro}>Cadastrar</button>
      </div>
    </>
  );
}
