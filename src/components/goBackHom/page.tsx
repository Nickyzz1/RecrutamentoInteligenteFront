import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import back from '@/assets/back.png'
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export const GoBackHome = () => {


    return(
        <>
        <Link href={ROUTES.home}>
            <Button  sx={{display: 'flex', gap:3, alignItems: 'center', alignSelf: 'start', marginLeft: 1, marginBottom: 2, margin: 5}}>
                <Image src={back} alt="seta" className="scale-40 md:scale-50 object-contain"></Image>
                <p className=" text-[#909192] text-xs md:text-md">Voltar</p>
            </Button>
        </Link>
        </>
    )
}