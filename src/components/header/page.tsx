"use client"
import { Button } from "@mui/material";
import React from 'react';
import { ROUTES } from "@/constants/routes"

export const HeaderNotLogged = () => {

    return(
        <>
            <div className="flex w-full h-15 fixed shadow-md items-center md:px-6 px-2 bg-[#ffffff]">
                <h1 className="text-[#036D3C] font-bold text-xl hidden sm:flex">Darede</h1>
                <h1 className="text-[#F5991D] font-bold text-xl hidden sm:flex">Recruit</h1>
                <h1 className="text-[#036D3C] font-bold text-xl flex sm:hidden">D</h1>
                <h1 className="text-[#F5991D] font-bold text-xl flex sm:hidden">R</h1>
                <div className="flex w-full justify-end gap-2">
                    <Button variant="outlined" href={ROUTES.login}>Entrar</Button>
                    <Button variant="contained" href={ROUTES.register} sx={{ color: 'white', backgroundColor: '#036D3C' }}>Cadastrar</Button>
                </div>
            </div>
            <div className="h-15"></div>
        </>
    )
}
