"use client";

import Image from "next/image"
//imports internos
import back from '@/assets/back.png'
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"


export const GoBack = () => {
    const router = useRouter();

    return(
        <>
        <Button onClick={() => window.history.back()} sx={{display: 'flex', gap:3, alignItems: 'center', alignSelf: 'start', marginLeft: 1, marginBottom: 2, margin: 5}}>
            <Image src={back} alt="seta" className="scale-40 md:scale-50 object-contain"></Image>
            <p className=" text-[#909192] text-xs md:text-md">Voltar</p>
        </Button>
        </>
    )
}

