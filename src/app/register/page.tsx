import { ROUTES } from "@/constants/routes"
import Image from "next/image";
import Link from "next/link"

// imports internos
import logo from "@/assets/logo.png"
import email from "@/assets/email.png"
import cadeado from "@/assets/cadeado.png"
import user from "@/assets/user.png"
import phone from '@/assets/phone.png'
import { Button, TextField } from "@mui/material";


export default function Login() {
  return (
    <div className="flex flex-col min-h-screen bg-white w-screen sm:bg-[#036D3C] ">
      <div className="bg-white mt-18 sm:mt-0 lg:w-4/6 sm:fixed flex flex-col items-center sm:w-5/6 sm:right-0 md:rounded-tl-[600px] lg:rounded-tl-[700px] sm:justify-start md:p-32 gap-18">
        
        <div className="flex flex-col items-center gap-4">
          <Image width={1000} height={1000} priority src={logo} alt="Logo" className="flex flex-col w-60 sm:mt-60 md:mt-0 md:w-80 lg:w-92" />
          <p className="text-sm sm:text-lg text-[#666666] max-w-80 text-center">Logue-se para encontrar as melhores oportunidades</p>
        </div>

        <div className="md:w-2/3 w-2/3 flex flex-col">

          <div className="flex flex-row items-center gap-8 justify-start w-full p-2">
            <TextField
              label="Nome" variant="standard" fullWidth
              InputProps={{
                disableUnderline: false, 
              }} sx={{"& label": {color: "#949494",}, "& label.Mui-focused": {color: "green",}, "& .MuiInput-underline:after": {borderBottomColor: "green",}, maxWidth:'600px'}}
            />
          </div>

          <div className="flex flex-row items-center gap-8 justify-start w-full p-2">
            <TextField
              label="Email" variant="standard" fullWidth
              InputProps={{
                disableUnderline: false, 
              }} sx={{"& label": {color: "#949494",}, "& label.Mui-focused": {color: "green",}, "& .MuiInput-underline:after": {borderBottomColor: "green",}, maxWidth:'600px'}}
            />
          </div>

          <div className="flex flex-row items-center gap-8 justify-start w-full p-2">
            <TextField
              label="Senha" variant="standard" fullWidth
              InputProps={{
                disableUnderline: false, 
              }} sx={{"& label": {color: "#949494",}, "& label.Mui-focused": {color: "green",}, "& .MuiInput-underline:after": {borderBottomColor: "green",}, maxWidth:'600px'}}
            />
          </div>

          <div className="flex flex-row items-center gap-8 justify-start w-full p-2">
            <TextField
              label="Confirme a senha" variant="standard" fullWidth
              InputProps={{
                disableUnderline: false, 
              }} sx={{"& label": {color: "#949494",}, "& label.Mui-focused": {color: "green",}, "& .MuiInput-underline:after": {borderBottomColor: "green",}, maxWidth:'600px'}}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-7">
          <a href={ROUTES.start}>
            <Button variant="contained" style={{backgroundColor: '#036D3C'}}>Cadastre-se</Button>
          </a>
          <div className="flex flex-row gap-1">
            <p>Já tem uma conta?</p>
            <Link href={ROUTES.login} className="text-[#036D3C]">Logue-se</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
