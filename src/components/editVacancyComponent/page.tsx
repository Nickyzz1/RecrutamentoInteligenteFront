"use client"
import * as React from 'react';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { HeaderLoggedAdmin } from "@/components/headerAdmin/page"
import { GoBack } from "@/components/goBack/page"
import {Button, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react";
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import dayjs, { Dayjs } from 'dayjs';

type EditVacancyProps = {
    id: string;
}

const EditVacancyComponent = ({ id }: EditVacancyProps) => {

    const [startDayWeek, setStartDayWeek] = useState(1);
    const [endDayWeek, setEndDayWeek] = useState(16);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [benefit, setBenefit] = useState('')
    const [requirement, setRequirement] = useState('')
    const [responsabilityValue, setResponsabilityValue] = useState('')
    const [ability, setAbility] = useState('')
    const [workStart, setWorkStart] = useState<Dayjs>(dayjs('2022-04-17T08:30'));
    const [workEnd, setWorkEnd] = useState<Dayjs>(dayjs('2022-04-17T17:30'));
    const [stepValue, setStepValue] = useState('')
    
    const [listSteps, setListSteps] = useState<string[]>([])
    const [listResponsabilities, setListResponsabilities] = useState<string[]>([])
    const [listRequeriments, setListRequiriments] = useState<string[]>([])
    const [listBenefits, setListBenefits] = useState<string[]>([])
    const [listAbilities, setListAbilities] = useState<string[]>([])
    
    const [modal, setModal] = useState(1)

    enum EWorkDays
    {
        Monday = 1,
        Tuesday = 2,
        Wednesday = 4,
        Thursday = 8,
        Friday = 16,
        Saturday = 32,
        Sunday = 64
    }

    enum EProficiencyLevel
    {
        Beginner = 0,
        Intermediate = 1,
        Advanced = 2,
        Fluent = 3
    }

    enum EEducationType
    {
    BasicEducation = 0,
    TechnicalCourse = 1,
    Graduation = 2,
    PostGraduation = 3
    }

    // fazer requisição get para conseguir dados da vaga
    
    interface fullData {
        "id" : number,
        "title" : string,
        "description" : string,
        "workDays" : EWorkDays,
        "workStart" : Date,
        "workEnd" : Date,
        "createdAt" : Date,
        "canApply" : boolean,
        "requirements" : {
            "id" : number,
            "title" : string
        }[],
        "benefits" : {
            "id" : number,
            "title" : string
        }[],
        "assignments" : {
            "id" : number,
            "title" : string
        }[],
        "stages" : {
            "id" : number,
            "description" : string,
            "startDate" : Date,
            "endDate" : Date
        }[],
        "desiredExperiences" : {
            "id" : number,
            "name" : string,
            "time" : number,
            "required" : boolean
        }[],
        "desiredEducations" : {
            "id" : number,
            "name" : string,
            "type" : EEducationType,
            "required" : boolean
        }[],
        "desiredLanguages" : {
            "id" : number,
            "name" : string,
            "level" : EProficiencyLevel,
            "required" : boolean
        }[],
        "desiredSkills" : {
            "id" : number,
            "name" : string,
            "required" : boolean
        }[],

    }
    // a edição da vaga é feita em blocos, cada página é um bloco
    // dados da primeira página
    interface IVacancyFirstDataToEdit {
        
        "title" : string,
        "description" : string,
        "workDays" : number,
        "workStart" : Date,
        "workEnd" : Date,
        "canApply" : boolean
    }

    // dados da segunda página
    interface IVacancySecondDataToEdit {
        
        "Etapas_da_Vaga": string[],
        "Responsabilidades_e_atribuições": string[],
        "Requisitos": string[],
        "Benefícios": string[],
        "Habilidades": string[],
    }

    const firstPageData : IVacancyFirstDataToEdit = {
        title : title,
        description : description,
        workDays : startDayWeek + endDayWeek,
        workStart: workStart ? workStart.toDate() : new Date(),
        workEnd: workEnd ? workEnd.toDate() : new Date(),
        canApply : true
    }

    const secondPageData : IVacancySecondDataToEdit = {
        Etapas_da_Vaga: listSteps,
        Responsabilidades_e_atribuições: listResponsabilities,
        Requisitos: listRequeriments,
        Benefícios: listBenefits,
        Habilidades: listAbilities,
    };
      
    // testando primeiro edit para api
    console.log(JSON.stringify(firstPageData, null, 2));
    // testando segundo edit par api
    console.log(JSON.stringify(secondPageData, null, 2));

    const editPart1 = () => {
        //requisição para editar a primeria parte
    }

    const editPart2 = () => {
        //requisição para editar a segunda parte
    }

    const editPart3 = () => {
        //requisição para editar a terceira parte
    }

    return(
        <>
        {/* modal 1 */}
        {modal === 1 && (
            // header
            <div className="bg-white flex flex-col max-w-[1200px] w-4/5 rounded-xl shadow p-6 word gap-6">
                <h1 className="text-2xl font-semibold">Crie uma nova vaga</h1>
                <h2>Prencha as informações para criar uma nova vaga</h2>

                <div className='flex flex-col gap-3'>
                    <h2 className="font-semibold">Título da vaga</h2>
                    <TextField onChange={(e) => setTitle(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} value={title} id="outlined-basic" label="ex: Assistente de RH" variant="outlined" />
                </div>

                <h2 className="font-semibold">Horário de trabalho</h2>
                    {/* container horários*/}
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
                        {/* horário de trabalho semanal */}
                        <div className=" flex flex-col gap-3 md:flex-row md:items-center">
                            <p>Semanal</p>
                            <div className="flex flex-col gap-5 md:flex-row">
                                    <Select
                                        sx={{ minWidth: 110, maxWidth: 200}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={startDayWeek}
                                        label="Início"
                                        onChange={(e) => {setStartDayWeek(e.target.value)}}
                                    >
                                        <MenuItem value={1}>Segunda</MenuItem>
                                        <MenuItem value={2}>Terça</MenuItem>
                                        <MenuItem value={4}>Quarta</MenuItem>
                                        <MenuItem value={8}>Quinta</MenuItem>
                                        <MenuItem value={16}>Sexta</MenuItem>
                                        <MenuItem value={32}>Sábado</MenuItem>
                                        <MenuItem value={64}>Domingo</MenuItem>
                                    </Select>
                                        <Select
                                        sx={{ minWidth: 110, maxWidth: 200}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={endDayWeek}
                                        label="Início"
                                        onChange={(e) => {setEndDayWeek(e.target.value)}}
                                    >
                                        <MenuItem value={1}>Segunda</MenuItem>
                                        <MenuItem value={2}>Terça</MenuItem>
                                        <MenuItem value={4}>Quarta</MenuItem>
                                        <MenuItem value={8}>Quinta</MenuItem>
                                        <MenuItem value={16}>Sexta</MenuItem>
                                        <MenuItem value={32}>Sábado</MenuItem>
                                        <MenuItem value={64}>Domingo</MenuItem>
                                    </Select>
                            </div>
                        </div>
                        {/* horário de trabalho Diário */}
                        <div className=" flex flex-col gap-3 md:flex-row md:items-center">
                            <p>Diário</p>
                            <div className="flex flex-col gap-3 md:flex-row">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileTimePicker
                                            onChange={(newValue) => setWorkStart(newValue? newValue : dayjs())}
                                            label="Início"
                                            value={workStart}
                                            slotProps={{
                                            textField: {
                                                sx: {
                                                width: 150, 
                                                },
                                            },
                                            }}
                                        />
                                    </LocalizationProvider>

                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileTimePicker
                                            label="Fim"
                                            value={workEnd}
                                            onChange={(newValue) => setWorkEnd(newValue? newValue : dayjs())}
                                            slotProps={{
                                            textField: {
                                                sx: {
                                                width: 150, 
                                                },
                                            },
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Descrição da vaga */}
                    <div  className='w-full flex flex-col gap-3'>
                        <h2 className="font-semibold">Descrição da vaga</h2>
                        <TextField
                            onChange={(e) => setDescription(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                            id="filled-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            defaultValue="Escreva uma descrição aqui!"
                            variant="filled"
                            sx={{width: '100%'}}
                            />
                    </div>
                    {/* btn de próximo*/}
                    <Button onClick={() => setModal(2)} variant='contained' className="flex gap-3 max-w-80 self-center" sx={{backgroundColor: '#0AA851FF'}}>
                        Próximo
                    </Button>
            </div>
            )}
            {/* fim */}
            {/* modal 2 */}
            {modal === 2 && (
            <div className="bg-white flex flex-col max-w-[1200px] w-4/5 rounded-xl shadow p-6 word gap-6">
                {/* etapas da vaga */}
                <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-3'>
                            <h2 className="font-semibold">Etapas da vaga</h2>
                            <TextField value={stepValue} id="outlined-basic" label="ex: Inscrições" variant="outlined"
                            onChange={(e) => setStepValue(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                            onKeyDown={(e) => {
                                if (e.key == 'Enter' && stepValue.trim() !== '') {
                                    setListSteps((prev) => [...prev, stepValue.trim()])
                                    setStepValue('')
                            }}}/>
                        </div>

                        <div className='flex flex-col gap-3 '>
                            {listSteps.map((i, index) => {
                                return(
                                    <div key={index} className='flex gap-3 items-center'>
                                        <p className='rounded-full w-6 h-6 text-white flex items-center justify-center bg-[#0AA851FF] p-2'>{index + 1}</p>
                                        <p>{i}</p>
                                        <div className='flex w-full justify-end'>
                                            <IconButton className=''><DeleteIcon color='error'/></IconButton>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                </div>
                {/* responsabilidades e atribuições */}
                <div className='flex flex-col gap-3'>
                    <h2 className="font-semibold">Responsabilidades e atribuições</h2>
                    <TextField value={responsabilityValue} id="outlined-basic" label="ex: Líderar equipe" variant="outlined"
                        onChange={(e) => setResponsabilityValue(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter' && responsabilityValue.trim() !== '') {
                                setListResponsabilities((prev) => [...prev, responsabilityValue.trim()])
                                setResponsabilityValue('')
                    }}}/>
                    <div className='flex gap-3 mt-3'>
                        {listResponsabilities.map((i, index) => {
                            return(
                                <div key={index} className='flex gap-3 items-center'>
                                    <div className='border border-green-600 bg-green-100 text-black px-2 rounded-full flex items-center' >
                                        <p >{i}</p>
                                        <IconButton className=''><HighlightOffIcon/></IconButton>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* Requisitos */}
                <div className='flex flex-col gap-3'>
                    <h2 className="font-semibold">Requisitos</h2>
                    <TextField value={requirement} id="outlined-basic" label="ex: Líderar equipe" variant="outlined"
                        onChange={(e) => setRequirement(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter' && requirement.trim() !== '') {
                                setListRequiriments((prev) => [...prev, requirement.trim()])
                                setRequirement('')
                    }}}/>
                    <div className='flex gap-3 mt-3'>
                        {listRequeriments.map((i, index) => {
                            return(
                                <div key={index} className='flex gap-3 items-center'>
                                        <div className='border border-green-600 bg-green-100 text-black px-2 rounded-full flex items-center' >
                                        <p >{i}</p>
                                        <IconButton className=''><HighlightOffIcon/></IconButton>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* Benefícios */}
                <div className='flex flex-col gap-3'>
                    <h2 className="font-semibold">Benefícios</h2>
                    <TextField value={benefit} id="outlined-basic" label="ex: Líderar equipe" variant="outlined"
                        onChange={(e) => setBenefit(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter' && benefit.trim() !== '') {
                                setListBenefits((prev) => [...prev, benefit.trim()])
                                setBenefit('')
                    }}}/>
                    <div className='flex gap-3 mt-3'>
                        {listBenefits.map((i, index) => {
                            return(
                                <div key={index} className='flex gap-3 items-center'>
                                    <div className='border border-green-600 bg-green-100 text-black px-2 rounded-full flex items-center' >
                                        <p >{i}</p>
                                        <IconButton className=''><HighlightOffIcon/></IconButton>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* Habilidades relevantes */}
                <div className='flex flex-col gap-3'>
                    <h2 className="font-semibold">Habilidades relevantes</h2>
                    <TextField value={ability} id="outlined-basic" label="ex: Líderar equipe" variant="outlined"
                        onChange={(e) => setAbility(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter' && ability.trim() !== '') {
                                setListAbilities((prev) => [...prev, ability.trim()])
                                setAbility('')
                    }}}/>
                    <div className='flex gap-3 mt-3'>
                        {listAbilities.map((i, index) => {
                            return(
                                <div key={index} className='flex gap-3 items-center'>
                                        <div className='border border-green-600 bg-green-100 text-black px-2 rounded-full flex items-center' >
                                        <p >{i}</p>
                                        <IconButton className=''><HighlightOffIcon/></IconButton>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <Button onClick={() => setModal(2)} variant='contained' className="flex gap-3 max-w-80 self-center" sx={{backgroundColor: '#0AA851FF'}}>
                        Próximo
                    </Button>
                </div>
                {/* fim */}
            </div> 
            )}
        </>
    )
}
export default EditVacancyComponent;