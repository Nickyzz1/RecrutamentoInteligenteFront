"use client"

import { GoBack } from "@/components/goBack/page"
import { HeaderLogged } from "@/components/header2/page"
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


import { Box, Button, ButtonGroup, Divider, StepContent, Typography } from "@mui/material";
import { useState } from "react";
const VacancyDetails : React.FC = () => {

    const data = {

        title : 'Desenvolvedor React Sênior',
        creationDate: '05/02/2025',
        description: 'Estamos em busca de um(a) Desenvolvedor(a) Front-end Sênior com expertise em React.js para atuar em projetos de alta complexidade, contribuindo para a construção de interfaces modernas, escaláveis e com foco em performance. Se você é apaixonado(a) por tecnologia, tem pensamento crítico, atenção aos detalhes e quer fazer parte de um time colaborativo, essa vaga é pra você!',
        requisits: ['Ter experiência com React por mais de 4 anos', 'Ter formação superior em Ciencia da computação, Analise e desenvolvimento de sistemas, ou áreas afins', 'Possuir github atualizado'],
        benefits:['Assistência médica','PLR','Plano odontológico','Vale mercado', 'Vale combustível'],
        responsabilities:['Realizar versionamento de código', 'Desenvolver telas'],
        steps : [
            {
                label :'Incrições',
                startDate : '12/05/25',
                endDate : '22/05/2025'
            },
            {
                label :'Incrições',
                startDate : '12/05/25',
                endDate : '22/05/2025'
            },
            {
                label :'Incrições',
                startDate : '12/05/25',
                endDate : '22/05/2025'
            },
            {
                label :'Incrições',
                startDate : '12/05/25',
                endDate : '22/05/2025'
            },
        ]
    }

    

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
            <GoBack/>
            {/* Titlw od card */}
            <div className="flex flex-col w-screen min-h-screen overflow-x-hidden p-2 lg:px-32 gap-5">
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
                    <Button variant="contained" sx={{ backgroundColor: '#036D3C', width: '100%', maxWidth: '700px' }}>
                        Candidate-se
                    </Button>
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
                                <p className="m-2 flex flex-wrap">{data.description}</p>
                            </div>
                        </div>
                        {/* Etapas do  processo */}
                        <div className="flex flex-wrap flex-col bg-white border-1 rounded-2xl border-gray-200 p-7 gap-9">
                            <h2 className="text-xl font-semibold">Etapas do processo</h2>
                            <div className="flex flex-wrap  rounded-xl">
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {data.steps.map((step, index) => (
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
                                <Divider/>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default VacancyDetails;