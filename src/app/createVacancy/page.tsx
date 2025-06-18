"use client"
import * as React from 'react';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { HeaderLoggedAdmin } from "@/components/headerAdmin/page"
import { GoBack } from "@/components/goBack/page"
import {Box, Button, Checkbox, ListItemText, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';


const createVacancy = () => {


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState("Escreva uma descrição aqui!")
    const [benefit, setBenefit] = useState('')
    const [requirement, setRequirement] = useState('')
    const [responsability, setResponsability] = useState('')
    const [skill, setSkill] = useState('')
    const [workStart, setWorkStart] = useState<Dayjs>(dayjs(""));
    const [workEnd, setWorkEnd] = useState<Dayjs>(dayjs(""));
    const [stepValue, setStepValue] = useState('')
    
    const [listSteps, setListSteps] = useState<string[]>([])
    const [listResponsabilities, setListResponsabilities] = useState<string[]>([])
    const [listRequeriments, setListRequiriments] = useState<string[]>([])
    const [listBenefits, setListBenefits] = useState<string[]>([])
    const [listSkills, setListSkills] = useState<string[]>([])
    const [selectedWorkDays, setSelectedWorkDays] = useState<number[]>([]);

    const router = useRouter()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    const workDaysOptions = [
    { label: 'Segunda', value: 1 },
    { label: 'Terça', value: 2 },
    { label: 'Quarta', value: 4 },
    { label: 'Quinta', value: 8 },
    { label: 'Sexta', value: 16 },
    { label: 'Sábado', value: 32 },
    { label: 'Domingo', value: 64 },
    ];

    const handleWorkDaysChange = (event: any) => {
    const { value } = event.target;
    setSelectedWorkDays(typeof value === 'string' ? value.split(',').map(Number) : value);
    };

    const workDaysSum = selectedWorkDays.reduce((acc, curr) => acc + curr, 0);
    const [page, setPage] = useState(2)
    
    interface IVacancyFirstDataToEdit {
        
        "title" : string,
        "description" : string,
        "workDays" : number,
        "workStart" : Date,
        "workEnd" : Date,
        "canApply" : boolean
    }

    // ------- Dados da segunda etapa
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
        workDays : workDaysSum,
        workStart: workStart ? workStart.toDate() : new Date(),
        workEnd: workEnd ? workEnd.toDate() : new Date(),
        canApply : true
    }

    // ------- segundo json para requisição de update
    const secondPageData : IVacancySecondDataToEdit = {
        Etapas_da_Vaga: listSteps,
        Responsabilidades_e_atribuições: listResponsabilities,
        Requisitos: listRequeriments,
        Benefícios: listBenefits,
        Habilidades: listSkills,
    };
      
    // testando primeiro post para api
    console.log(JSON.stringify(firstPageData, null, 2));
    // testando segundo post par api
    console.log(JSON.stringify(secondPageData, null, 2));

    const handleRemove = () => {
        setIsDeleteModalOpen(false);
        // fazer requisição para deletar vaga aqui
        console.log("Vaga excluída");
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        maxWidth: 400,
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 10,
        p: 3,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
    }

    return(
        <>
            <HeaderLoggedAdmin />
            <GoBack/>
            <div className="h-screen flex flex-col bg-[#F9FAFB] items-center pb-6">
                {/* page 1 */}
                {page === 1 && (
                    // header
                    <div className="bg-white flex flex-col max-w-[1200px] w-4/5 rounded-xl shadow p-6 word gap-6">
                        <h1 className="text-2xl font-semibold">{title}</h1>
                        <h2>Edite as informações da vaga</h2>

                        <div className='flex flex-col gap-3'>
                            <h2 className="font-semibold">Título da vaga</h2>
                            <TextField onChange={(e) => setTitle(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} value={title} id="outlined-basic" label="ex: Assistente de RH" variant="outlined" />
                        </div>

                        <h2 className="font-semibold">Horário de trabalho</h2>
                            {/* container horários*/}
                            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
                                {/* horário de trabalho semanal */}
                                <div className=" flex flex-col gap-3 lg:flex-row lg:items-center">
                                    <p>Semanal</p>
                                    <div className="flex flex-col gap-5 lg:flex-row">

                                        <Select
                                            multiple
                                            value={selectedWorkDays}
                                            onChange={handleWorkDaysChange}
                                            renderValue={(selected) => 
                                                selected.map(
                                                (val) => workDaysOptions.find((opt) => opt.value === val)?.label
                                                ).join(', ')
                                            }
                                            sx={{ maxWidth: 200 }}
                                            >
                                            {workDaysOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                <Checkbox checked={selectedWorkDays.indexOf(option.value) > -1} />
                                                <ListItemText primary={option.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                {/* horário de trabalho Diário */}
                                <div className=" flex flex-col gap-3 lg:flex-row lg:items-center">
                                    <p>Diário</p>
                                    <div className="flex flex-col gap-3 lg:flex-row">
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
                                value={description}
                                    onChange={(e) => setDescription(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                                    id="filled-multiline-static"
                                    label=""
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    sx={{width: '100%'}}
                                    />
                            </div>
                            {/* btn de próximo*/}
                            <Button onClick={() => setPage(2)} variant='contained' className="flex gap-3 max-w-80 self-center" sx={{backgroundColor: '#0AA851FF'}}>
                                Próximo
                            </Button>
                    </div>
                    )}
                    {/* fim */}
                    {/* page 2 */}
                    {page === 2 && (
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

                                <div className='flex w-full flex-col gap-3 '>
                                    {listSteps.map((i, index) => {
                                        return(
                                            <div key={index} className='flex w-full gap-3 items-center'>
                                                <p className='rounded-full w-6 h-6 text-white flex items-center justify-center bg-[#0AA851FF] p-2'>{index + 1}</p>
                                                <p className='w-full m-2'>{i}</p>
                                                <div className='flex w-full justify-end'>
                                                    <IconButton onClick={() => setIsDeleteModalOpen(true)} className=''><DeleteIcon color='error'/></IconButton>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                        </div>
                        {/* responsabilidades e atribuições */}
                        <div className='flex flex-col gap-3'>
                            <h2 className="font-semibold">Responsabilidades e atribuições</h2>
                            <TextField value={responsability} id="outlined-basic" label="ex: Líderar equipe" variant="outlined"
                                onChange={(e) => setResponsability(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter' && responsability.trim() !== '') {
                                        setListResponsabilities((prev) => [...prev, responsability.trim()])
                                        setResponsability('')
                            }}}/>
                            <div className='flex w-full flex-col gap-3 '>
                                    {listResponsabilities.map((i, index) => {
                                        return(
                                            <div key={index} className='flex w-full gap-3 items-center'>
                                                <p className='rounded-full w-6 h-6 text-white flex items-center justify-center bg-[#0AA851FF] p-2'>{index + 1}</p>
                                                <p className='w-full m-2'>{i}</p>
                                                <div className='flex w-full justify-end'>
                                                    <IconButton onClick={() => setIsDeleteModalOpen(true)} className=''><DeleteIcon color='error'/></IconButton>
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
                            <div className='flex w-full flex-col gap-3 '>
                                    {listRequeriments.map((i, index) => {
                                        return(
                                            <div key={index} className='flex w-full gap-3 items-center'>
                                                <p className='rounded-full w-6 h-6 text-white flex items-center justify-center bg-[#0AA851FF] p-2'>{index + 1}</p>
                                                <p className='w-full m-2'>{i}</p>
                                                <div className='flex w-full justify-end'>
                                                    <IconButton onClick={() => setIsDeleteModalOpen(true)} className=''><DeleteIcon color='error'/></IconButton>
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
                            <div className='flex wrap flex-wrap gap-3 mt-3'>
                                {listBenefits.map((i, index) => {
                                    return(
                                        <div key={index} className='flex gap-3 items-center'>
                                            <div className='border border-green-600 bg-green-100 text-black px-2 rounded-full flex items-center' >
                                                <p >{i}</p>
                                                <IconButton onClick={() => setIsDeleteModalOpen(true)} className=''><HighlightOffIcon/></IconButton>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {/* Habilidades relevantes */}
                        <div className='flex  flex-col gap-3'>
                            <h2 className="font-semibold">Habilidades relevantes</h2>
                            <TextField value={skill} id="outlined-basic" label="ex: Líderar equipe" variant="outlined"
                                onChange={(e) => setSkill(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter' && skill.trim() !== '') {
                                        setListSkills((prev) => [...prev, skill.trim()])
                                        setSkill('')
                            }}}/>
                            <div className='flex wrap flex-wrap mb-10 gap-3 mt-3'>
                                {listSkills.map((i, index) => {
                                    return(
                                        <div key={index} className='flex gap-3 items-center'>
                                                <div className='border border-green-600 bg-green-100 text-black px-2 rounded-full flex items-center' >
                                                <p >{i}</p>
                                                <IconButton onClick={() => setIsDeleteModalOpen(true)} className=''><HighlightOffIcon/></IconButton>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='flex gap-3 items-center justify-center w-full'>
                                <Button onClick={() =>setPage(1)} variant='contained' className="flex items-center justify-center gap-3 w-40 self-center" sx={{backgroundColor: '#747882FF'}}>
                                    <ArrowBackIcon/>
                                    <p>Anterior</p>
                                </Button>
                                <Button onClick={() => setPage(3)} variant='contained' className="flex items-center justify-center gap-3 w-40 self-center" sx={{backgroundColor: '#0AA851FF'}}>
                                    <p>Próximo</p>
                                    <ArrowForwardIcon/>
                                </Button>
                            </div>
                        </div>
                        {/* fim */}
                        {/* modal 3 definir perfil */}
                        {/* modal para excluir */}
                        <Modal
                            open={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={style}>

                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Deseja mesmo excluir esse atributo?
                                </Typography>

                                <div className="flex items-center justify-center flex-row gap-3 mt-4">
                                    <Button sx={{width: 100}} onClick={() => setIsDeleteModalOpen(false)} variant="contained" color="primary">Cancelar</Button>
                                    <Button sx={{width: 100}} onClick={handleRemove} variant="contained" color="error">Excluir</Button>
                                </div>
                            </Box>
                        </Modal>
                    </div> 
                    )}
              
            
            </div> 
        </>
    )
}

export default createVacancy
