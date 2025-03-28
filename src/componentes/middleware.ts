// import useloggedStore from "@/app/store/LoggedStore";
// import { NextRequest, NextResponse } from "next/server";

// export default function middleware(request: NextRequest) {
//   let logged = useloggedStore((state) => state.logged);

//   if (request.nextUrl.pathname.startsWith("/home") && !logged) {
//     console.log("Acesso negado!!");
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   if (request.nextUrl.pathname.startsWith("/carrinho") && !logged) {
//     console.log("Acesso negado!!");
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   if (request.nextUrl.pathname.startsWith("/genero") && !logged) {
//     console.log("Acesso negado!!");
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   if (request.nextUrl.pathname.startsWith("/livro") && !logged) {
//     console.log("Acesso negado!!");
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }


//inflezmente nao funciona porque precisa de cookies e infelizmente ainda nao fiz as compras do mes :/