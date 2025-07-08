"use client"
import { Button, Drawer } from "@mui/material";
import React from 'react';
import { ROUTES } from "@/constants/routes"
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import Image from "next/image";
import user from "@/assets/user.png"
import menu from '@/assets/menu.png'
import Link from "next/link";
import { useRouter } from "next/navigation";



export const HeaderLoggedAdmin = () => {
  const router = useRouter();

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

    const DrawerList = ['Vagas', 'Minhas candidaturas', 'Perfil']

    return(
        <>
          <div className="flex  p-5 shadow-md items-center px-6 bg-[#ffffff]">
                <Link href={ROUTES.homeAdmin} className="flex items-center gap-0.5">
                  <h1 className="text-[#036D3C] font-bold sm:text-xl pl-2">Darede</h1>
                  <h1 className="text-[#F5991D] font-bold sm:text-xl">Recruit</h1>
                </Link>

              <div className="flex w-full justify-end gap-4 mx-4">
                  <Link href={ROUTES.homeAdmin} className="hidden sm:flex text-black hover:text-[#036d3c]">Início</Link>
                  {/* <Link href={ROUTES.dashboard} className="hidden sm:flex text-black hover:text-[#036d3c]">Dashboard</Link> */}
                  {/* <Link href={ROUTES.profile} className="hidden sm:flex text-black hover:text-[#036d3c]">Perfil</Link> */}
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
