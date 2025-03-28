"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./style.module.css";
import Botao from "../Botao/Botao";
import { z } from "zod";
import { useRouter } from "next/navigation";
import useValidStore from "@/app/store/ButtonStore";
import useloggedStore from "@/app/store/LoggedStore";

const userSchema = z.object({
  senha: z
    .string()
    .nonempty("A senha não pode estar vazia")
    .min(6, "A senha deve haver ao menos 6 caracteres"),
  email: z
    .string()
    .nonempty("O Email não pode estar vazia")
    .email("O Email deve ser válido"),
});
type User = z.infer<typeof userSchema>;

export default function Form() {
  const router = useRouter();
  let logged = useloggedStore((state)=>state.logged)
  console.log(logged)
  let validPress = useValidStore((state)=>state.validPress)
  let loging = useloggedStore((state)=>state.loging)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  async function createUser(data: User) {
    console.log(data);
    reset();
    if (isValid){
      validPress()
      await new Promise((resolve) => setTimeout(resolve, 2000));
      validPress()
      loging()
      router.push("/home");
    }
    
  }
  return (
    <>
      <form onSubmit={handleSubmit(createUser)} className={style.forms}>
        <div>
          <strong>E-mail</strong>
          <input
            type="text"
            className={style.EmailInput}
            placeholder="Digite aqui seu E-mail"
            {...register("email")}
          />
          {errors.email && (
            <span className={style.ErrorEmail}>{errors.email.message}</span>
          )}
        </div>
        <div>
          <strong>Senha</strong>
          <input
            type="text"
            className={style.senha}
            placeholder="Digite aqui sua senha"
            {...register("senha")}
          />
          {errors.senha && (
            <span className={style.ErrorEmail}>{errors.senha.message}</span>
          )}
        </div>
          <Botao valid={isValid}/>
        
      </form>
    </>
  );
}
