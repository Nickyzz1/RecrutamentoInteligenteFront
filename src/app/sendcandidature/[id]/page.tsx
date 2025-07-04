import Image from "next/image";
import Link from "next/link";

// imports internos
import { ROUTES } from "@/constants/routes"
import { HeaderLogged } from "@/components/headerUser/page";
import seta from "@/assets/next.png"
import back from "@/assets/back.png"
import { SendCandidatureRequest } from "@/components/request/page";

export default async function Start({params} : any) {

    const {id} = await params;
    return (
        <SendCandidatureRequest id={id}/>
    );
}
