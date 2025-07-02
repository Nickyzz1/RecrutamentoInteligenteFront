"use client"
import * as React from 'react';

import { HeaderLoggedAdmin } from "@/components/headerAdmin/page"
import { GoBack } from "@/components/goBack/page"
import { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';

//mui imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {Button, Checkbox, Divider, FormControl, InputLabel, ListItemText, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// icons
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { APIURL } from '@/constants/api';
import { EEducationType, EProficiencyLevel } from '@/constants/enums';

interface IEducation {
    "name": string,
    "type": string
}

interface IExperience {
    "name": string,
    "time": number
}

interface ILanguage {
    "name" : string,
    "level": string
}

interface IStep {
    "step": string,
    "date": Date
}

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
    const [date, setDate] = useState(dayjs(""))

    const [education, setEducation] = useState('')
    const [level, setLevel] = useState('')
    const [experienceRole, setExperienceRole] = useState('')
    const [experienceTime, setExperienceTime] = useState(0)
    const [language, setLanguage] = useState('')
    const [languageLevel, setLanguageLevel] = useState('')
    const [skip, setSkip] = useState(false)

    const [listSteps, setListSteps] = useState<IStep[]>([])
    const [listResponsabilities, setListResponsabilities] = useState<string[]>([])
    const [listRequeriments, setListRequiriments] = useState<string[]>([])
    const [listBenefits, setListBenefits] = useState<string[]>([])
    const [listSkills, setListSkills] = useState<string[]>([])
    const [selectedWorkDays, setSelectedWorkDays] = useState<number[]>([]);

    const [listEducation, setListEducation] = useState<IEducation[]>([])
    const [listExperience, setListExperience] = useState<IExperience[]>([])
    const [listLanguages, setListlanguages] = useState<ILanguage[]>([])

    const router = useRouter()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    // controla a página de iniciação
    const [page, setPage] = useState(1)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    function create()
    {
        const vacancy: IVacancyFirstData = {
            title: title,
            description: description,
            workDays: workDaysSum,
            workStart: (workStart ? workStart.toDate() : new Date()),
            workEnd: (workEnd ? workEnd.toDate() : new Date()),
            canApply: true
        }
        fetch(`${APIURL}/vacancy`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`,
                "Content-type" : "application/json"
            },
            body: JSON.stringify(vacancy)
        })
        .then((res) => res.json())
        .then((vacancyData) => {
            listResponsabilities.forEach((item) => {
                let data : any = {name: item, vacancyId: vacancyData.value.id}
                fetch(`${APIURL}/vacancy/assignment`,{
                    method: `POST`,
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`,
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            })
            listRequeriments.forEach((item) => {
                let data : any = {name: item, vacancyId: vacancyData.value.id}
                fetch(`${APIURL}/vacancy/requirement`,{
                    method: `POST`,
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`,
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            })
            listBenefits.forEach((item) => {
                let data : any = {name: item, vacancyId: vacancyData.value.id}
                fetch(`${APIURL}/vacancy/benefit`,{
                    method: `POST`,
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`,
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            })
            listSkills.forEach((item) => {
                let data : any = {name: item, vacancyId: vacancyData.value.id}
                fetch(`${APIURL}/vacancy/desiredSkill`,{
                    method: `POST`,
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`,
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            })
            listEducation.forEach((item) => {
                let data : any = item
                data["vacancyId"] = vacancyData.value.id
                fetch(`${APIURL}/vacancy/desiredEducation`,{
                    method: `POST`,
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`,
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            })
            listExperience.forEach((item) => {
                let data : any = item
                data["vacancyId"] = vacancyData.value.id
                fetch(`${APIURL}/vacancy/desiredExperience`,{
                    method: `POST`,
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`,
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            })
            listLanguages.forEach((item) => {
                let data : any = item
                data["vacancyId"] = vacancyData.value.id
                fetch(`${APIURL}/vacancy/desiredLanguage`,{
                    method: `POST`,
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`,
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            })
        })
    }

    const workDaysOptions = [
        { label: 'Segunda', value: 1 },
        { label: 'Terça', value: 2 },
        { label: 'Quarta', value: 4 },
        { label: 'Quinta', value: 8 },
        { label: 'Sexta', value: 16 },
        { label: 'Sábado', value: 32 },
        { label: 'Domingo', value: 64 },
    ];

    const addSteps = () => {
        if (stepValue.trim() !== '' && date.toString() !== '') {
            let step: IStep = {
                step: stepValue,
                date: date.toDate()
            };
            setListSteps([...listSteps, step])
            setEducation('')
            setLevel('')
        }
    }

    const addEducation = () => {
        if (education.trim() !== '' && level.trim() !== '') {
            let educ: IEducation = {
                name: education,
                type: level
            };
            setListEducation([...listEducation, educ])
            setEducation('')
            setLevel('')
        }
    }

    const addExperience = () => {
        if (experienceRole.trim() !== '' && experienceTime !== 0) {
            let exp: IExperience = {
                name: experienceRole,
                time: experienceTime
            };
            setListExperience([...listExperience, exp])
            setExperienceRole('')
            setExperienceTime(0)
        }
    }

    const addLanguages = () => {
        if (language.trim() !== '' && languageLevel.trim() !== '') {
            let lan: ILanguage = {
                name: language,
                level: languageLevel
            };
            setListlanguages([...listLanguages, lan])
            setLanguage('')
            setLanguageLevel('')
        }
    }

    const handleWorkDaysChange = (event: any) => {
        const { value } = event.target;
        setSelectedWorkDays(typeof value === 'string' ? value.split(',').map(Number) : value);
    };
    const workDaysSum = selectedWorkDays.reduce((acc, curr) => acc + curr, 0);
    interface IVacancyFirstData {

        "title": string,
        "description": string,
        "workDays": number,
        "workStart": Date,
        "workEnd": Date,
        "canApply": boolean
    }

    // ------- Dados da segunda etapa
    interface IVacancySecondData {

        Etapas_da_Vaga: IStep[],
        Responsabilidades_e_atribuições: string[],
        Requisitos: string[],
        Benefícios: string[],
        Habilidades: string[],
    }

    interface IProfileData {
        educations: IEducation[],
        experiences: IExperience[],
        languages: ILanguage[],
    }

    const firstPageData: IVacancyFirstData = {
        title: title,
        description: description,
        workDays: workDaysSum,
        workStart: workStart ? workStart.toDate() : new Date(),
        workEnd: workEnd ? workEnd.toDate() : new Date(),
        canApply: true
    }

    // ------- segundo json para requisição de update
    const secondPageData: IVacancySecondData = {
        Etapas_da_Vaga: listSteps,
        Responsabilidades_e_atribuições: listResponsabilities,
        Requisitos: listRequeriments,
        Benefícios: listBenefits,
        Habilidades: listSkills,
    };

    const thirdPageData: IProfileData = {
        educations: listEducation,
        experiences: listExperience,
        languages: listLanguages,
    }

    function removeItem<T>(
        index: number,
        list: T[],
        setList: React.Dispatch<React.SetStateAction<T[]>>
      ) {
        const updatedList = list.filter((_, i) => i !== index);
        setList(updatedList);
    }

    return (
        <>
            <HeaderLoggedAdmin />
            <GoBack />
            <div className="h-screen flex flex-col bg-[#F9FAFB] items-center pb-6">
                {/* page 1 */}
                {page === 1 && (
                    // header
                    <div className="bg-white flex flex-col max-w-[1200px] w-4/5 rounded-xl shadow p-6 word gap-6">
                        <h1 className="text-2xl font-semibold">{title}</h1>
                        <h2>Cria uma vaga para sua empresa!</h2>

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
                                            onChange={(newValue) => setWorkStart(newValue ? newValue : dayjs())}
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
                                                onChange={(newValue) => setWorkEnd(newValue ? newValue : dayjs())}
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
                        <div className='w-full flex flex-col gap-3'>
                            <h2 className="font-semibold">Descrição da vaga</h2>
                            <TextField
                                value={description}
                                onChange={(e) => setDescription(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                                id="filled-multiline-static"
                                label=""
                                multiline
                                rows={4}
                                variant="filled"
                                sx={{ width: '100%' }}
                            />
                        </div>
                        {/* btn de próximo*/}
                        <Button onClick={() => setPage(2)} variant='contained' className="flex gap-3 max-w-80 self-center" sx={{ backgroundColor: '#0AA851FF' }}>
                            Próximo
                        </Button>
                    </div>
                )}
                {/* fim */}
                {/* page 2 */}
                {page === 2 &&
                    (
                        <div className="bg-white flex flex-col max-w-[1200px] w-4/5 rounded-xl shadow p-6 word gap-6">
                            {/* etapas da vaga */}
                            <div className='flex flex-col gap-3'>
                                
                                <div className='flex w-full flex-col gap-3'>
                                    <h2 className="font-semibold">Etapas da vaga</h2>
                                    <div className='flex items-center md:flex-row flex-col gap-3'>
                                        <TextField value={stepValue} sx={{ marginTop: "8px", width: "100%" }} id="outlined-basic" label="ex: Inscrições" variant="outlined"
                                        onChange={(e) => setStepValue(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                                        />
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['DatePicker']} sx={{ width: "100%" }}>
                                                <DatePicker onChange={(newValue) => setDate(newValue ? newValue : dayjs())}
                                                value={date} 
                                                label="ex:12/12/2012"/>
                                            </DemoContainer>
                                        </LocalizationProvider>

                                        <div className='hidden md:flex items-center'>
                                            <IconButton onClick={() => addSteps()} >
                                                <AddCircleIcon fontSize='large' color='success' />
                                            </IconButton>
                                        </div>

                                    </div>
                                </div>

                                <div className='flex w-full flex-col gap-3 '>
                                    {listSteps.map((i, index) => {
                                        return (
                                            <div key={index} className='flex w-full gap-3 items-center'>
                                                <p className='rounded-full w-6 h-6 text-white flex items-center justify-center bg-[#0AA851FF] p-2'>{index + 1}</p>
                                                <p className='w-full m-2'>{i.step} - {i.date.toString()}</p>
                                                <div className='flex w-full justify-end'>
                                                    <IconButton onClick={() => removeItem(index, listSteps, setListSteps)} className=''><DeleteIcon color='error' /></IconButton>
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
                                        }
                                    }} />
                                <div className='flex w-full flex-col gap-3 '>
                                    {listResponsabilities.map((i, index) => {
                                        return (
                                            <div key={index} className='flex w-full gap-3 items-center'>
                                                <p className='rounded-full w-6 h-6 text-white flex items-center justify-center bg-[#0AA851FF] p-2'>{index + 1}</p>
                                                <p className='w-full m-2'>{i}</p>
                                                <div className='flex w-full justify-end'>
                                                    <IconButton onClick={() => removeItem(index, listResponsabilities, setListResponsabilities)} className=''><DeleteIcon color='error' /></IconButton>
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
                                        }
                                    }} />
                                <div className='flex w-full flex-col gap-3 '>
                                    {listRequeriments.map((i, index) => {
                                        return (
                                            <div key={index} className='flex w-full gap-3 items-center'>
                                                <p className='rounded-full w-6 h-6 text-white flex items-center justify-center bg-[#0AA851FF] p-2'>{index + 1}</p>
                                                <p className='w-full m-2'>{i}</p>
                                                <div className='flex w-full justify-end'>
                                                    <IconButton onClick={() => removeItem(index, listRequeriments, setListRequiriments)} className=''><DeleteIcon color='error' /></IconButton>
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
                                        }
                                    }} />
                                <div className='flex wrap flex-wrap gap-3 mt-3'>
                                    {listBenefits.map((i, index) => {
                                        return (
                                            <div key={index} className='flex gap-3 items-center'>
                                                <div className='border border-green-600 bg-green-100 text-black px-2 rounded-full flex items-center' >
                                                    <p >{i}</p>
                                                    <IconButton onClick={() => removeItem(index, listBenefits, setListBenefits)} className=''><HighlightOffIcon /></IconButton>
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
                                        }
                                    }} />
                                <div className='flex wrap flex-wrap mb-10 gap-3 mt-3'>
                                    {listSkills.map((i, index) => {
                                        return (
                                            <div key={index} className='flex gap-3 items-center'>
                                                <div className='border border-green-600 bg-green-100 text-black px-2 rounded-full flex items-center' >
                                                    <p >{i}</p>
                                                    <IconButton onClick={() => removeItem(index, listSkills, setListSkills)} className=''><HighlightOffIcon /></IconButton>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='flex gap-3 items-center justify-center w-full'>
                                    <Button onClick={() => setPage(1)} variant='contained' className="flex items-center justify-center gap-3 w-40 self-center" sx={{ backgroundColor: '#747882FF' }}>
                                        <ArrowBackIcon />
                                        <p>Anterior</p>
                                    </Button>
                                    <Button onClick={() => setPage(3)} variant='contained' className="flex items-center justify-center gap-3 w-40 self-center" sx={{ backgroundColor: '#0AA851FF' }}>
                                        <p>Próximo</p>
                                        <ArrowForwardIcon />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                {/* fim */}
                {/* page 3 definir perfil */}

                {page === 3 && (
                    <div className="bg-white flex flex-col max-w-[1200px] w-4/5 rounded-xl shadow p-6 word gap-6">

                        <h1 className="text-2xl font-semibold">Crie o perfil do candidato</h1>
                        <h2>Crie o perfil do candidato para a vaga</h2>
                        {/* formações desejadas */}
                        <div className='flex flex-col md:flex-row md:items-center gap-3'>
                            {/* input formação desejada */}
                            <div className='flex md:w-3/4 flex-col gap-3'>
                                <h2 className="font-semibold">Fomação desejada</h2>
                                <TextField fullWidth onChange={(e) => setEducation(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} value={education} id="outlined-basic" label="ex: Administração" variant="outlined" />
                            </div>
                            {/* input nivel e icone de add */}
                            <div className='flex gap-3 md:w-2/4'>
                                <div className='flex w-full flex-col gap-3'>
                                    <h2 className="font-semibold">Nível</h2>
                                    <div className='flex items-center gap-3 w-full'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Ens.Superior</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={level}
                                                label="Ens.Superior"
                                                onChange={(e) => setLevel(e.target.value)}
                                            >
                                                <MenuItem value={EEducationType.BasicEducation}>Educação Básica</MenuItem>
                                                <MenuItem value={EEducationType.TechnicalCourse}>Técnico</MenuItem>
                                                <MenuItem value={EEducationType.Graduation}>Ensino Superior</MenuItem>
                                                <MenuItem value={EEducationType.PostGraduation}>Pós Graduação</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {/* icone de add */}
                                        <div className='hidden md:flex items-center'>
                                            <IconButton onClick={() => addEducation()} >
                                                <AddCircleIcon fontSize='large' color='success' />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* btn de add */}
                            <div className='flex mt-5 md:hidden w-full items-center'>
                                <Button onClick={() => addEducation()} fullWidth variant='outlined' color='success' sx={{ display: 'flex', gap: 3 }} >
                                    <AddCircleIcon fontSize='small' color='success' />
                                    <p>Adicionar</p>
                                </Button>
                            </div>
                            {/* fazer exibição de itens abaixo*/}
                            <div className='flex mt-5 md:hidden w-full items-center'>
                                <Button onClick={() => addEducation()} fullWidth variant='outlined' color='success' sx={{ display: 'flex', gap: 3 }} >
                                    <AddCircleIcon fontSize='small' color='success' />
                                    <p>Adicionar</p>
                                </Button>
                            </div>

                        </div>
                        {listEducation.map((i, index) => {
                            return (
                                    <div key={index} className='flex flex-col gap-3'>
                                        <div className='flex gap-3 items-center'>
                                            <div className='bg-green-800 rounded-full h-3 w-3'></div>
                                            <p>{i.name} - {i.type}</p>
                                            <IconButton onClick={() => removeItem(index, listEducation, setListEducation)} className=''><HighlightOffIcon /></IconButton>
                                        </div>
                                    </div>
                            )
                        })}

                        

                        {/* Experiencia busca cargo, categoria: anos, tempo */}
                        <h2 className="font-semibold">Experiências</h2>

                        <div className='flex flex-col w-full md:flex-row md:items-center gap-3'>
                            <div className='flex md:w-3/4 flex-col gap-3'>
                                <h2 className="font-semibold">Cargo</h2>
                                <TextField onChange={(e) => setExperienceRole(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} value={experienceRole} id="outlined-basic" label="ex: Assistente de RH" variant="outlined" />
                            </div>
                            <div className='flex md:w-2/4 flex-col gap-3'>
                                <h2 className="font-semibold">Tempo em meses</h2>
                                <div className='flex gap-3 w-full'>
                                    <TextField fullWidth inputProps={{ min: 0 }} type='number' onChange={(e) => setExperienceTime(parseInt(e.target.value))} value={experienceTime} id="outlined-basic" label="ex: 24" variant="outlined" />
                                    {/* icone de add */}
                                    <div className='hidden md:flex items-center'>
                                        <IconButton onClick={() => addExperience()}>
                                            <AddCircleIcon fontSize='large' color='success' />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            {/* btn de add */}
                            <div className='flex mt-5 md:hidden w-full items-center'>
                                <Button onClick={() => addExperience()} fullWidth variant='outlined' color='success' sx={{ display: 'flex', gap: 3 }} >
                                    <AddCircleIcon fontSize='small' color='success' />
                                    <p>Adicionar</p>
                                </Button>
                            </div>
                        </div>
                        {/* fazer exibição de itens abaixo*/}
                        <div className='flex w-full flex-col gap-3 '>
                            {listExperience.map((i, index) => {
                                return (
                                    <div key={index} className='flex flex-col gap-3'>
                                    <div className='flex gap-3 items-center'>
                                        <div className='bg-green-800 rounded-full h-3 w-3'></div>
                                        <p>{i.name} - {i.time}</p>
                                        <IconButton onClick={() => removeItem(index, listExperience, setListExperience)} className=''><HighlightOffIcon /></IconButton>
                                    </div>
                                </div>
                                )
                            })}
                        </div>

                       

                        {/* idiomas e profeiencia */}

                        <div className='flex flex-col md:flex-row md:items-center w-full gap-3'>
                            <div className='flex md:w-3/4 flex-col gap-3'>
                                <h2 className="font-semibold">Idiomas e proficiência</h2>
                                <TextField onChange={(e) => setLanguage(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} value={language} id="outlined-basic" label="ex: Inglês" variant="outlined" />
                            </div>
                            <div className='flex flex-col md:w-2/4 gap-3'>
                                <h2 className="font-semibold">Nível</h2>
                                <div className='flex gap-3'>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Nível</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={languageLevel}
                                            label="Ens.Superior"
                                            onChange={(e) => setLanguageLevel(e.target.value)}
                                        >
                                            <MenuItem value={EProficiencyLevel.Beginner}>Básico</MenuItem>
                                            <MenuItem value={EProficiencyLevel.Intermediate}>Intermediário</MenuItem>
                                            <MenuItem value={EProficiencyLevel.Advanced}>Avançado</MenuItem>
                                            <MenuItem value={EProficiencyLevel.Fluent}>Fluente</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {/* icone de add */}
                                    <div className='hidden md:flex items-center'>
                                        <IconButton onClick={() => addLanguages()} >
                                            <AddCircleIcon fontSize='large' color='success' />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            {/* btn de add */}
                            <div className='flex mt-5 md:hidden w-full items-center'>
                                <Button fullWidth onClick={() => addLanguages()} variant='outlined' color='success' sx={{ display: 'flex', gap: 3 }} >
                                    <AddCircleIcon fontSize='small' color='success' />
                                    <p>Adicionar</p>
                                </Button>
                            </div>
                        </div>

                        <div className='flex w-full flex-col gap-3 '>
                        {listLanguages.map((i, index) => {
                           return (
                               <div key={index} className='flex flex-col gap-3'>
                                    <div className='flex gap-3 items-center'>
                                        <div className='bg-green-800 rounded-full h-3 w-3'></div>
                                        <p>{i.name} - {i.level}</p>
                                        <IconButton onClick={() => removeItem(index, listLanguages, setListlanguages)} className=''><HighlightOffIcon /></IconButton>
                                    </div>
                               </div>
                           )
                        })}
                        </div>    

                        {/* <Divider /> */}

                        {/* Habilidades relevantes */}
                        <div className='flex flex-col gap-3'>
                            {/* <h2 className="font-semibold">Habilidades relevantes</h2>
                            <TextField value={skill} id="outlined-basic" label="ex: Líderar equipe" variant="outlined"
                                onChange={(e) => setSkill(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter' && skill.trim() !== '') {
                                        setListSkills((prev) => [...prev, skill.trim()])
                                        setSkill('')
                                    }
                                }} />
                            <div className='flex wrap flex-wrap gap-3 mt-3'>
                                {listSkills.map((i, index) => {
                                    return (
                                        <div key={index} className='flex gap-3 items-center'>
                                            <div className='border border-green-600 bg-green-100 text-black px-2 rounded-full flex items-center' >
                                                <p >{i}</p>
                                                <IconButton onClick={() => removeFieldSkills(index)} className=''><HighlightOffIcon /></IconButton>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div> */}

                            <div className='flex items-center gap-3 mb-3'>
                                <Checkbox onChange={() => skip == true? setSkip(false): setSkip(true)} {...label} />
                                <p>Pular criação de perfil</p>
                            </div>
                            <div className='flex gap-3 items-center justify-center w-full'>
                                <Button onClick={() => setPage(2)} variant='contained' className="flex items-center justify-center gap-3 w-40 self-center" sx={{ backgroundColor: '#747882FF' }}>
                                    <ArrowBackIcon />
                                    <p>Anterior</p>
                                </Button>
                                <Button disabled={!skip && 
                                    thirdPageData.educations.length === 0 &&
                                    thirdPageData.experiences.length === 0 &&
                                    thirdPageData.languages.length === 0} onClick={() => setPage(3)} variant='contained' className="flex items-center justify-center gap-3 w-40 self-center" sx={{ backgroundColor: '#0AA851FF' }}>
                                    <p>Finalizar</p>
                                    <ArrowForwardIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {/* fim */}
            </div>
        </>
    )
}
export default createVacancy