"use client"
// imports internos
import { HeaderLoggedAdmin } from '@/components/headerAdmin/page';

import {Card} from '@/components/vacancyCard/page'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import { Button, Pagination } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useEffect, useState } from 'react';
import { APIURL } from '@/constants/api';

interface IVacancyData {
    "id" : number,
    "title" : string,
    "description" : string,
    "canApply" : boolean,
    "createdAt" : string,
    "skills" : string[]
}

interface IVacancyStats {
    totalVacancies : number,
    totalActiveVacancies : number,
    totalApplications : number,
    averageApplications : number
}

const manageAplication = () => {

    useEffect(() => {
        fetch(`${APIURL}/vacancy`, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`
            }
        })
        .then(response => response.json())
        .then(data => setVacancies(data.value))

        fetch(`${APIURL}/vacancy/stats`, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`
            }
        })
        .then(response => response.json())
        .then(data => setStats(data.value))

    }, [])

    const [vacancies, setVacancies] = useState<IVacancyData[]>([])
    const [stats, setStats] = useState<IVacancyStats>({totalActiveVacancies : 0, totalApplications : 0, totalVacancies : 0, averageApplications : 0})

    const router = useRouter();

    return(
        <>
        <div className="h-screen flex flex-col bg-[#F9FAFB] ">
            <HeaderLoggedAdmin/>
                <div className="flex flex-col px-5 md:px-20 gap-12">
                    <div className="flex items-center justify-between mt-12">
                        <div className="flex flex-col gap-0.5">
                            <h1 className="text-[#036D3C] text-2xl font-semibold">Gerenciar vagas</h1>
                            <p className="text-gray-500 text-sm">Veja um painel geral das suas vagas!</p>
                        </div>
                        {/* Adicionar nova vaga */}
                        <div className="md:flex hidden">
                            <Button onClick={() => {router.push(ROUTES.createVacancy)}} variant="contained" className="flex gap-3 max-w-60" sx={{backgroundColor: '#0AA851FF'}}>
                                <AddCircleOutlineIcon/>
                                <p>Nova vaga</p>
                            </Button>
                        </div>
                    </div>
                    {/* card de detalhes */}
                    <div className="flex flex-col lg:flex-row md:gap-4 gap-3 justify-between">
                        <div className="bg-white lg:w-full border max-4/5 border-gray-100 shadow flex items-center gap-6 rounded-xl p-2">
                        <div className="flex items-center bg-[#dbeafe] p-1 rounded-lg">
                            <WorkOutlineOutlinedIcon sx={{color: '#4379ee', width:'35px', height: '35px'}}/>
                        </div>
                            <div>
                                <h1 className="text-md text-gray-500">Total de vagas</h1>
                                <h2 className="text-3xl font-bold text-black">{stats.totalVacancies}</h2>
                            </div>
                        </div>
                        <div className="bg-white lg:w-full border max-4/5 border-gray-100 shadow flex items-center gap-6 rounded-xl p-2">
                        <div className="flex items-center bg-[#dcfce7] p-1 rounded-lg">
                            <TrendingUpOutlinedIcon sx={{color: '#61c585', width:'35px', height: '35px'}}/>

                        </div>
                            <div>
                                <h1 className="text-md text-gray-500">Vagas ativas</h1>
                                <h2 className="text-3xl font-bold text-black">{stats.totalActiveVacancies}</h2>
                            </div>
                        </div>
                        <div className="bg-white lg:w-full border max-4/5 border-gray-100 shadow flex items-center gap-6 rounded-xl p-2">
                        <div className="flex items-center bg-[#f3e8ff] p-1 rounded-lg">
                            <PeopleOutlineOutlinedIcon sx={{color: '#a24fed', width:'35px', height: '35px'}}/>

                        </div>
                            <div>
                                <h1 className="text-md text-gray-500">Candidaturas</h1>
                                <h2 className="text-3xl font-bold text-black">{stats.totalApplications}</h2>
                            </div>
                        </div>
                        <div className="bg-white lg:w-full border max-4/5 border-gray-100 shadow flex items-center gap-6 rounded-xl p-2">
                        <div className="flex items-center bg-[#fef9c3] p-1 rounded-lg">
                            <FunctionsOutlinedIcon sx={{color: '#ca8a04', width:'35px', height: '35px'}}/>

                        </div>
                            <div>
                                <h1 className="text-md text-gray-500">Média de candidaturas</h1>
                                <h2 className="text-3xl font-bold text-black">{stats.averageApplications}</h2>
                            </div>
                        </div>
                    </div>
                    {/* Adicionar nova vaga */}
                    <div className="flex md:hidden">
                        <Button variant="contained" className="flex gap-3 max-w-60" sx={{backgroundColor: '#0AA851FF'}}>
                            <AddCircleOutlineIcon/>
                            <p>Nova vaga</p>
                        </Button>
                    </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
                    {vacancies.map((item, index) => (
                        <Card
                            key={index}
                            skills={item.skills}
                            date={new Date(item.createdAt)}
                            title={item.title}
                            status={item.canApply ? "Ativa" : "Inativa"}
                            adress={""}
                            description={item.description}
                            onClick={() => router.push(`${ROUTES.viewCandidates}/${item.id}`)}
                        ></Card>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default manageAplication;