"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { APIURL } from "@/constants/api"
import jwt from "jsonwebtoken"

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // ✅ Hook do Next para redirecionamento

  const handleLogin = () => {
    fetch(`${APIURL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email: user,
        password: password
      })
    })
    .then(response => {
      if(response.status != 200){
        response.json().then((data) => console.log(data.message))
      }else{
        response.json().then((data) => {
          localStorage.setItem("AUTH", data.token)
          document.cookie = `token=${data.token}; path=/; max-age=86400; Secure; SameSite=Strict`;
          let userData = jwt.decode(data.token)
          localStorage.setItem("UserData", JSON.stringify(userData))
          const tokenData = JSON.parse(JSON.stringify(userData))
          if(tokenData.Admin == "True"){
            router.push(ROUTES.homeAdmin)
          }else{
            router.push(ROUTES.home)
          }
        })
      }
    })
  };

  return (
    <div className="flex-col flex h-screen w-screen bg-[#036D3C]">
      <div className="bg-white lg:w-4/6 fixed h-screen flex flex-col items-center w-11/12 sm:w-5/6 right-0 rounded-tl-[600px] lg:rounded-tl-[700px] flex-1/4 justify-start md:p-32 p-3 gap-28">
        <div className="flex flex-col items-center gap-4">
          <Image
            width={1000}
            height={1000}
            priority
            src={logo}
            alt="Logo"
            className="flex flex-col md:w-80 w-60 mt-50 sm:mt-60 md:mt-10 xl:w-[380px]"
          />
          <p className="text-sm sm:text-lg text-[#666666] max-w-80 text-center">
            Logue-se para encontrar as melhores oportunidades
          </p>
        </div>

        <div className="md:w-2/3 w-2/3 flex flex-col">
          <div className="flex flex-row items-center gap-8 justify-start w-full p-2">
            <TextField
              onChange={(e) => setUser(e.target.value)}
              label="Email"
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: false,
              }}
              sx={{
                "& label": { color: "#949494" },
                "& label.Mui-focused": { color: "green" },
                "& .MuiInput-underline:after": { borderBottomColor: "green" },
                maxWidth: "600px",
              }}
            />
          </div>

          <div className="flex flex-row items-center gap-8 justify-start w-full p-2">
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              label="Senha"
              type="password"
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: false,
              }}
              sx={{
                "& label": { color: "#949494" },
                "& label.Mui-focused": { color: "green" },
                "& .MuiInput-underline:after": { borderBottomColor: "green" },
                maxWidth: "600px",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-7">
          <Button
            onClick={handleLogin}
            variant="contained"
            style={{ backgroundColor: "#036D3C" }}
          >
            Logar
          </Button>

          <div className="flex flex-row gap-1">
            <p>Não tem uma conta?</p>
            <Link href={ROUTES.register} className="text-[#036D3C]">
              Cadastrar-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
