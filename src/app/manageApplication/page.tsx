"use client"
// imports internos
import {HeaderLogged} from "@/components/header2/page"
import {Card} from '@/components/vacancyCard/page'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import { Button, Pagination } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const manageAplication = () => {

 const data = [
    {
    title : "Desenvolvedor react",
    startDate: "15/02/2025",
    status: 1,
    candidates : []
    },
]

    return(
        <>
        <div className="h-screen flex flex-col bg-[#F9FAFB] ">
            <HeaderLogged/>
                <div className="flex flex-col px-5 md:px-20 gap-12">
                    <div className="flex items-center justify-between mt-12">
                        <h1 className="text-[#036D3C] text-2xl font-semibold ">Gerenciar vagas</h1>
                        {/* Adicionar nova vaga */}
                        <div className="md:flex hidden">
                            <Button variant="contained" className="flex gap-3 max-w-60" sx={{backgroundColor: '#0AA851FF'}}>
                                <AddCircleOutlineIcon/>
                                <p>Nova vaga</p>
                            </Button>
                        </div>
                    </div>
                    {/* card de detalhes */}
                    <div className="flex flex-col lg:flex-row gap-9 justify-between">
                        <div className="bg-white lg:w-full border max-4/5 border-gray-100 shadow flex items-center gap-6 rounded-xl p-2">
                            <WorkOutlineOutlinedIcon sx={{color: '#4379ee', width:'40px', height: '40px', backgroundColor: '#dbeafe', borderRadius: '4px'}}/>
                            <div>
                                <h1 className="text-md">Total de vagas</h1>
                                <h2 className="text-3xl font-bold">6</h2>
                            </div>
                        </div>
                        <div className="bg-white lg:w-full border max-4/5 border-gray-100 shadow flex items-center gap-6 rounded-xl p-2">
                            <TrendingUpOutlinedIcon sx={{color: '#61c585', width:'40px', height: '40px', backgroundColor: '#dcfce7', borderRadius: '4px'}}/>
                            <div>
                                <h1 className="text-md">Vagas ativas</h1>
                                <h2 className="text-3xl font-bold">6</h2>
                            </div>
                        </div>
                        <div className="bg-white lg:w-full border max-4/5 border-gray-100 shadow flex items-center gap-6 rounded-xl p-2">
                            <PeopleOutlineOutlinedIcon sx={{color: '#a24fed', width:'40px', height: '40px', backgroundColor: '#f3e8ff', borderRadius: '4px'}}/>
                            <div>
                                <h1 className="text-md">Candidaturas</h1>
                                <h2 className="text-3xl font-bold">6</h2>
                            </div>
                        </div>
                        <div className="bg-white lg:w-full border max-4/5 border-gray-100 shadow flex items-center gap-6 rounded-xl p-2">
                            <FunctionsOutlinedIcon sx={{color: '#ca8a04', width:'40px', height: '40px', backgroundColor: '#fef9c3', borderRadius: '4px'}}/>
                            <div>
                                <h1 className="text-md">Média de candidaturas</h1>
                                <h2 className="text-3xl font-bold">6</h2>
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
                    {/* card de vagas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center rounded justify-center gap-9">
                        <Card title="Desenvolvedor React Senior" status='Ativa' created='26/02/2015' quantityCandidates={26}/>
                        <Card title="Desenvolvedor React Senior" status='Ativa' created='26/02/2015' quantityCandidates={6}/>
                        <Card title="Desenvolvedor React Senior" status='Ativa' created='26/02/2015' quantityCandidates={6}/>
                        <Card title="Desenvolvedor React Senior" status='Ativa' created='26/02/2015' quantityCandidates={6}/>
                        <Card title="Desenvolvedor React Senior" status='Ativa' created='26/02/2015' quantityCandidates={6}/>
                    </div>

                    {/* <Pagination count={10} variant="outlined" shape="rounded" className="self-center" /> */}
                    <Pagination count={10} variant="outlined" className="self-center" color="primary" />
            </div>
        </div>
        </>
    )
}

export default manageAplication;