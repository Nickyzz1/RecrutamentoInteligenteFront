import Image from "next/image";
import Link from "next/link";

// imports internos
import { ROUTES } from "@/constants/routes"
import { HeaderLogged } from "@/components/headerUser/page";
import seta from "@/assets/next.png"
import back from "@/assets/back.png"

export default function Start() {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderLogged />
            <div className="flex flex-col flex-grow bg-[#F9FAFB] pt-8 px-16">
                <div className="flex flex-row gap-4 items-center">
                    <Image src={back} alt="seta" className="scale-75"></Image>
                    <p className="font-semibold text-[#909192]">Voltar</p>
                </div>
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col bg-white border-[1px] border-gray-200 p-10 px-12 gap-7 max-w-[1000px] w-5/6 rounded-2xl">
                        <p className="text-3xl font-bold">Desenvolvedor React Senior</p>

                        <div className="flex flex-col gap-2">
                            <p className="text-[#909192]">Preencha seu currículo para se candidatar a esta vaga</p>
                            <div className="flex justify-between bg-[#F6F6F6] border-[1px] border-gray-200 p-4 px-6 gap-4 rounded-2xl flex-row">
                                <p className="font-semibold">Seu currículo</p>
                                <Image src={seta} alt="seta" className=" object-contain w-6"></Image>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <input type="checkbox"></input>
                            <p className="font-semibold">Usar currículo atual</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[#909192]">Descreva sua motivação</p>
                            <textarea className="bg-white border-[1px] border-gray-200 p-5 px-6 h-60 rounded-2xl resize-none" />
                        </div>
                        <Link href={ROUTES.vacancydetails} className="bg-[#036D3C] text-white p-2 flex justify-center items-center rounded-xl">Candidatar-se</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
