"use client"
import React from 'react';
import { ROUTES } from "@/constants/routes"
import Link from "next/link";


import Image from "next/image";
import seta from "@/assets/seta.png"
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface CardProps {
    title: string;
    status: string;
    adress: string;
    description: string;
    date: Date;
    skills: string[];
}

export const Card: React.FC<CardProps> = ({ title, status, adress, description, date, skills }) => {
    const router = useRouter();

    return (
        <>
            <div className="shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.2)] transition-all duration-500 hover:shadow-[5px_5px_5px_0px_rgba(48,_160,_64,0.7)] hover:scale-107 rounded-lg bg-white p-8 w-full flex flex-col gap-5 ">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col md:flex-row justify-between">
                        <p className="text-[#036D3C] text-xl font-semibold">{title}</p>
                        <button className="bg-[#F5991D] px-4 hover:shadow-amber-400 hover:shadow rounded-2xl text-white font-medium">{status}</button>
                    </div>
                    <p className="text-[#949494] text-xs">Darede à nuvem | {adress}</p>
                </div>
                <p className="text-[#666666] max-w-11/12">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {skills.length > 3 ? (
                        <>
                            {skills.slice(0, 3).map((item, index) => {
                                return item.length > 15 ? (
                                    <p key={index} className="border-[#036D3C] rounded-2xl px-3 border-[1px] w-fit">{item.slice(0, 15)}...</p>
                                ) : (
                                    <p key={index} className="border-[#036D3C] rounded-2xl px-3 border-[1px] w-fit">{item}</p>
                                );
                            })}
                            <button className="border-[#036D3C] rounded-2xl px-2 border-[1px] w-fit hover:text-white hover:bg-[#036D3C] hover:cursor-pointer transition duration-200">+{skills.length - 3}</button>
                        </>
                    ) : (
                        skills.map((item, index) => {
                            return item.length > 15 ? (
                                <p key={index} className="border-[#036D3C] rounded-2xl px-3 border-[1px] w-fit">{item.slice(0, 15)}...</p>
                            ) : (
                                <p key={index} className="border-[#036D3C] rounded-2xl px-3 border-[1px] w-fit">{item}</p>
                            );
                        })
                    )}
                </div>
                <div className="flex flex-row justify-between items-center">
                    <p className="text-[#949494]">{date.toLocaleDateString()}</p>
                    <Button onClick={() => router.push(ROUTES.vacancydetails)} className="flex flex-row gap-2 items-center cursor-pointer ">
                        <p className="text-[#036D3C] ">Ver detalhes</p>
                        <Image src={seta} alt="seta" className="w-6"></Image>
                    </Button>
                </div>
            </div>
        </>
    )
}
