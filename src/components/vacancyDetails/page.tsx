"use client"

import { GoBack } from "@/components/goBack/page"
import { HeaderLogged } from "@/components/headerUser/page"
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


import { Box, Button, ButtonGroup, Divider, StepContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { APIURL } from "@/constants/api";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
const VacancyDetails = ({id} : {id : string}) => {

    const [data, setData] = useState<any | null>(null)

    useEffect(() => {

        fetch(`${APIURL}/vacancy/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("AUTH")}`,
        }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.message);
            setData(data.value)
        })
        .catch((err) => {
            console.error("Erro ao buscar vaga:", err);
        });
    }, [])

    const CustomStepIcon = (props : any) => {
        const { active, completed, className } = props;
      
        let color = '#B0BEC5'; // cor default
        if (active) color = '#036D3C';
        if (completed) color = '#339d6c';
      
        return (
          <div
            className={className}
            style={{
              color: "#f0f0f0",
              borderRadius: '50%',
              backgroundColor: color,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}
          >
            ✓
          </div>
        );
      };
      

    const [activeStep, setActiveStep] = useState(2);

    return(
        <>
            <HeaderLogged/>
            {/* Titlw od card */}
            <div className="flex flex-col w-screen min-h-screen overflow-x-hidden p-2 lg:px-32 gap-5">
            <GoBack/>
                <div className="flex flex-wrap flex-col md:flex-row bg-white border-1 rounded-2xl border-gray-200 p-7 gap-9">
                    <div className="flex flex-col gap-2 justif">
                        <h1 className="text-xl font-semibold">
                            Desenvolvedor React Senior
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            <CorporateFareIcon/>
                            <p className='font-xs text-gray-600'>Darede à nuvem</p>
                            <AddLocationIcon/>
                            <p className='font-xs text-gray-600'>Curitiba, PR</p>
                        </div>
                        <div className="bg-orange-100 rounded-full border-1 w-28 border-amber-800">
                            <p className='font-xs text-amber-950 text-center'>Ativa</p>
                        </div>
                    </div>
                    <div className="ml-auto w-full md:w-auto flex items-center">
                    <Link style={{ backgroundColor: '#036D3C', width: '100%', maxWidth: '700px' }} href={`${ROUTES.sendcandidature}/${id}`}>
                        Candidate-se
                    </Link>
                    </div>
                </div>

                <div className="flex flex-col xl:grid xl:grid-cols-2 gap-9">
                    <div className="flex flex-col gap-9">
                        {/* detalhes da vaga */}
                        <div className="flex flex-wrap flex-col bg-white border-1 rounded-2xl border-gray-200 p-7 gap-5">
                            <h1 className="text-xl font-semibold">Deatlhes da vaga</h1>
                            <div className="md:flex sm:grid sm:grid-cols-2 flex-col md:flex-row gap-0.5 flex-wrap">
                                <Button variant="outlined" sx={{ color: '#036D3C', borderColor: "green", flexWrap: 'wrap' }}>Descrição</Button>
                                <Button variant="outlined" sx={{ color: '#036D3C', borderColor: "green", flexWrap: 'wrap' }}>Responsabilidades</Button>
                                <Button variant="outlined" sx={{ color: '#036D3C', borderColor: "green", flexWrap: 'wrap' }}>Requisitos</Button>
                                <Button variant="outlined" sx={{ color: '#036D3C', borderColor: "green", flexWrap: 'wrap' }}>Benefícios</Button>
                            </div>
                            <div className="bg-[#efffef] flex flex-wrap gap-4 rounded-r-sm">
                                <div className="bg-[#60a860] w-2 "></div>
                                <p className="m-2 flex flex-wrap">{data ? data.description : ""}</p>
                            </div>
                        </div>
                        {/* Etapas do  processo */}
                        <div className="flex flex-wrap flex-col bg-white border-1 rounded-2xl border-gray-200 p-7 gap-9">
                            <h2 className="text-xl font-semibold">Etapas do processo</h2>
                            <div className="flex flex-wrap  rounded-xl">
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {(data ? data.steps : []).map((step : any, index : number) => (
                                    <Step key={index}>
                                    <StepLabel
                                        StepIconComponent={CustomStepIcon}
                                        sx={{
                                        '& .MuiStepLabel-label.Mui-active': { color: '#036D3C' },
                                        '& .MuiStepLabel-label.Mui-completed': { color: '#339d6c' },
                                        }}
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography variant="caption"> {step.startDate} - {step.endDate}</Typography>
                                        <Box sx={{ mb: 2, backgroundColor: '#036D3C' }}></Box>
                                    </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-9">
                        {/*Informações da vaga */}
                        <div className="flex flex-wrap flex-col bg-white border-1 rounded-2xl border-gray-200 p-7 gap-9">
                            <h1 className="text-xl font-semibold">Informações da vaga</h1>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-sm text-gray-500">Data de publicação</h2>
                                <p>{data.creationDate}</p>
                                <Divider/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-sm text-gray-500">Local</h2>
                                <p>Curitiba, PR</p>
                                <Divider/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-sm text-gray-500">Empresa</h2>
                                <p>Darede à nuvem</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default VacancyDetails;