"use client"
import { Button, Drawer } from "@mui/material";
import React from 'react';
import { ROUTES } from "@/constants/routes"
import CloseIcon from '@mui/icons-material/Close';

import Image from "next/image";
import user from "@/assets/user.png"
import menu from '@/assets/menu.png'

export const HeaderLogged = () => {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

    const DrawerList = ['Vagas', 'Minhas candidaturas', 'Perfil']

    return(
        <>
        <div className="flex w-screen p-5 shadow-md items-center px-6 bg-[#ffffff]">
            <h1 className="text-[#036D3C] font-bold sm:text-xl pl-2">Darede</h1>
            <h1 className="text-[#F5991D] font-bold sm:text-xl">Recruit</h1>

            <div className="flex w-full justify-end gap-8">
                <a href="https://images.steamusercontent.com/ugc/2077889393106802801/509548242CA42145059BDA2532B670FCDAD3C050/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" className="hidden sm:flex text-black hover:text-[#036d3c]">Início</a>
                <a href="https://images.steamusercontent.com/ugc/2077889393106802801/509548242CA42145059BDA2532B670FCDAD3C050/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" className="hidden sm:flex text-black hover:text-[#036d3c]">Minhas Candidaturas</a>
                <a href={ROUTES.profile}  className="hidden sm:flex flex-row items-center gap-2">
                    <Image src={user} alt="user" className="w-4"></Image>
                  <p className="text-black hover:text-[#036d3c]">Perfil</p>
                </a>
            </div>

            <Image width={20} height={10} alt="menu" src={menu} onClick={toggleDrawer(true)} className="sm:hidden"></Image>
            <Drawer className="" open={open} onClose={toggleDrawer(false)}>
              <div className="bg-[#F9FAFB] h-full">
                <div className="flex w-full flex-row-reverse">
                  <CloseIcon sx={{ color: "#036d3c", margin: "4px"}}/>
                </div>

                <div className="flex gap-2 flex-col items-start py-4 px-4">
                  {DrawerList.map((item, index) =>
                    (
                      <div key={index} className="text-shadow-green-700 hover:text-shadow-xl text-lg font-semibold hover:text-green-700 hover:scale-110 transition duration-180 ease-in-out cursor-pointer">{item}</div>
                    )
                  )}
                </div>
              </div>
            </Drawer>

        </div>
        </>
    )
}
