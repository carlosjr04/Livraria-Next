"use client"
import style from "./style.module.css";
import { NextResponse } from "next/server";


import { usePathname, useRouter } from "next/navigation";
import useloggedStore from "@/app/store/LoggedStore";

export default function Header() {
  let unloged = useloggedStore((state)=>state.unloged)

  const router = useRouter();
  function handleClickHome() {
    router.push("/home");
  }

  function handleClickPerfil() {
    unloged()
    router.push("/");
  }

  function handleClickCarrinho() {
    router.push("/carrinho");
  }
    const pathname = usePathname();
  
  return (
    <>
    {pathname==="/"?null:<div className={style.header}>
        <img src="/Logo (Stroke).png" alt="Logo da livraria" onClick={handleClickHome} />
        <div className={style.imagens}>
          <div className={style.perfil} onClick={handleClickPerfil}>
            <img
              className={style.perfilImg}
              src="/user.png"
              alt="Imagem de perfil"
            />
          </div>
          <div className={style.carrinho} onClick={handleClickCarrinho}>
            <img
              className={style.carrinhoImg}
              src="/shopping-cart.png"
              alt="Imagem de um carrinho"
            />
          </div>
        </div>
      </div>}
      
    </>
  );
}
