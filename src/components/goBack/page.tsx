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
        <Button onClick={router.back} sx={{ padding: 4}}>
            <Image src={back} alt="seta" className="scale-40 md:scale-50 object-contain"></Image>
            <p className=" text-[#909192] text-xs md:text-md">Voltar</p>
        </Button>
        </>
    )
}

