"use client"
import React from 'react';
import { ROUTES } from "@/constants/routes"


interface SkillProps {
    title: string;
}

export const Skill: React.FC<SkillProps> = ({ title }) => {

    const menor = []
    for (let index = 0; index < 15; index++) {
        menor[index] = title[index]
    }

    return (
        <>
            {title.length < 12 ?
                <p className="border-[#036D3C] rounded-2xl px-3 border-[1px] w-fit">{title}</p> :
                <p className="border-[#036D3C] rounded-2xl px-3 border-[1px] w-fit">{menor}...</p>
            }

        </>
    )
}
