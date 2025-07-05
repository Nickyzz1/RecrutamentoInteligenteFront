"use client"
import React from 'react';
import { ROUTES } from "@/constants/routes"
import Link from "next/link";


import Image from "next/image";
import seta from "@/assets/seta.png"
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface CardProps {
    id: number,
    title: string;
    status: string;
    adress: string;
    description: string;
    date: Date;
    skills: string[];
}

export const Card: React.FC<CardProps> = ({id, title, status, adress, description, date, skills }) => {

    const router = useRouter();
    return (
        <>
            <div className="shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.2)] h-[380px] md:w-[480px] w-full transition-all duration-500 hover:shadow-[0px_0px_5px_1px_rgba(48,_160,_64,0.7)] hover:scale-101 rounded-lg bg-white p-8 flex flex-col gap-5 ">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col md:flex-row justify-between">
                        <p className="text-[#036D3C] text-xl font-semibold">{title}</p>
                        <button className="bg-[#F5991D] px-4 hover:shadow-amber-400 hover:shadow rounded-2xl text-white font-medium">{status}</button>
                    </div>
                    <p className="text-[#949494] text-xs">Darede à nuvem | {adress}</p>
                </div>
                <p className="text-[#666666] max-w-11/12">{description.substring(0, 40)} ...</p>
                <div className="flex flex-wrap gap-2 items-center">
                
                {skills.length == 0? (<p className='text-xs text-gray-600 my-4'>Não há hábilidades relevantes nessa vaga</p>) :
                skills.slice(0, 3).map((item, index) => (
                    <p
                    key={index}
                    className="border-[#036D3C] rounded-2xl px-3 border-[1px] w-fit"
                    >
                    {item.length > 10 ? `${item.slice(0, 10)}...` : item}
                    </p>
                ))}

                {skills.length > 3 && (
                    <button
                    className="border-[#036D3C] rounded-2xl px-2 border-[1px] w-fit hover:text-white hover:bg-[#036D3C] hover:cursor-pointer transition duration-200"
                    disabled
                    >
                    +{skills.length - 3}
                    </button>
                )}
                </div>
                <div className="flex flex-row justify-between items-center">
                    <p className="text-[#949494]">{date.toLocaleDateString()}</p>
                    <Button onClick={() => router.push(`${ROUTES.vacancy}/${id}`)} className="flex flex-row gap-2 items-center cursor-pointer ">
                        <p className="text-[#036D3C] ">Ver detalhes</p>
                        <Image src={seta} alt="seta" className="w-6"></Image>
                    </Button>
                </div>
            </div>
        </>
    )
}
