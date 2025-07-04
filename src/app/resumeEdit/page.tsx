"use client"

import { GoBack } from "@/components/goBack/page";
import { HeaderLogged } from "@/components/headerUser/page";
import { Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {EProficiencyLevel, EEducationType, EApplicationStatus, EEducationStatus} from '@/constants/enums'
import { APIURL } from "@/constants/api";

const ResumeEdit = () => {

    interface IExperience {
        id: number | null,
        role: string,
        company: string,
        local: string,
        startDate: Date,
        endDate: Date,
        description: string
    }

    interface IEducation {
        id: number | null,
        instituition: string,
        degree: string,
        course: string,
        startDate: Date,
        endDate: Date
    }

    interface ILanguage {
        "id" : number,
        "name" : string,
        "level" : EProficiencyLevel
    }
    
    interface IUserResume {
        "id" : number,
        "name" : string,
        "email" : string,
        "bio" : string | null,
        "address" : string | null,
        "admin" : boolean,
        "phone" : string | null,
        "educations" : IEducation[],
        "experiences" : IExperience[],
        "languages" : ILanguage[],
        "skills" : {
            "id" : number,
            "name" : string
        }[],
        "links" : {
            "id" : number,
            "url" : string,
            "description" : string
        }[]
    }
    
    useEffect(() => {
        const _user = localStorage.getItem("UserData");
        if (!_user) return;
        
        const userData = JSON.parse(_user);
        
        fetch(`${APIURL}/user/${userData.Id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("AUTH")}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            const userData:IUserResume = data.value
            console.log(data.message);
            setName(userData.name)
            setEmail(userData.email)
            setPhone(userData.phone != null? data.value.phone : '')
            setAdress(userData.address)
            setListExperience(userData.experiences)
            setListEducation(userData.educations)
    
        })
        .catch((err) => {
            console.error("Erro ao buscar usuário:", err);
        });
    }, []);
    
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [adress, setAdress] = useState<string>('')
    const [linkedin, setLinkedin] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [company, setCompany] = useState<string>('')
    const [local, setLocal] = useState<string>('')
    const [startDate, setStartDate] = useState(dayjs(""))
    const [endDate, setEndDate] = useState(dayjs(""))
    const [description, setDescription] = useState('Descreva suas atividades...')
    const [instituition, setInstituition] = useState<string>('')
    const [degree, setDegree] = useState<string>('')
    const [startDateCourse, setStartDateCourse] = useState(dayjs(''))
    const [endDateCourse, setEndDateCourse] = useState(dayjs(''))
    const [course, setCourse] = useState<string>('')
    const [skill, setSkill] = useState<string>('')
    // lists
    const [listExperience, setListExperience] = useState<IExperience[]>([]);
    const [listEducation, setListEducation] = useState<IEducation[]>([])
    const [listSkills, setListSkills] = useState<string[]>([])


    const ObjExperience: IExperience = {
        "id": null,
        "role": role,
        "company": company,
        "description": description,
        "local": local,
        "startDate": startDate.toDate(),
        "endDate": endDate.toDate()
    }
        
    const ObjEducation: IEducation = {
        "id": null,
        "course": course,
        "degree": degree,
        "instituition": instituition,
        "startDate": startDate.toDate(),
        "endDate": endDate.toDate()
    }
        
    function removeItem<T>(
        index: number,
        list: T[],
        setList: React.Dispatch<React.SetStateAction<T[]>>
    ) {
        const updatedList = list.filter((_, i) => i !== index);
        setList(updatedList);
    }
    
    function addItem<T>(
        setList: React.Dispatch<React.SetStateAction<T[]>>,
        obj: T
    ) {
        setList(prev => [...prev, obj])
        setRole('')
        setCompany('')
        setLocal('')
        setDescription('')
        setStartDate(dayjs(""))
        setEndDate(dayjs(""))
    }
    
    return (
        <>
            <div className="bg-[#eeeeee] overflow-x-hidden">
                <HeaderLogged />
                <GoBack />
                <div className="min-h-screen overflow-x-hidden flex flex-col bg-[#eeeeee] items-center pb-6">
                    {/* infos pessoais */}
                    <div className="bg-white flex flex-col max-w-[1200px] w-4/5 rounded-xl shadow p-6 word gap-6 ">
                        <h1 className="font-bold text-2xl">Meu currículo</h1>
                        <h2 className="font-semibold text-green-700">Informações pessoais</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3">
                                <h2>Nome completo</h2>
                                <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth id="outlined-basic" label="ex: Eduardo Ribeiro" variant="outlined" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2>Email</h2>
                                <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth id="outlined-basic" label="ex: EduardoRibeiro@email.com" variant="outlined" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2>Telefone</h2>
                                <TextField value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth id="outlined-basic" label="ex: 41 99999-9999" variant="outlined" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2>Endereço</h2>
                                <TextField value={adress} onChange={(e) => setAdress(e.target.value)} fullWidth id="outlined-basic" label="ex: Rua Eduardo Ribeiro Ribas" variant="outlined" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2>Linkedin</h2>
                                <TextField value={linkedin} onChange={(e) => setLinkedin(e.target.value)} fullWidth id="outlined-basic" label="Digite seu link do linkedin" variant="outlined" />
                            </div>
                        </div>
                        <Divider />
                        {/* experiencia profissional */}
                        <h2 className="font-semibold text-green-700">Experiência profissional</h2>
                        <div className="bg-gray-100 rounded p-4">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col md:flex-row gap-3 w-full">
                                    <div className="flex w-full flex-col gap-3">
                                        <h2>Cargo</h2>
                                        <TextField value={role} onChange={(e) => setRole(e.target.value)} fullWidth id="outlined-basic" label="ex: Assistente de RH" variant="outlined" />
                                    </div>
                                    <div className="flex w-full flex-col gap-3">
                                        <h2>Empresa</h2>
                                        <TextField value={company} onChange={(e) => setCompany(e.target.value)} fullWidth id="outlined-basic" label="Digite a empresa" variant="outlined" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h2>Local</h2>
                                    <TextField value={local} onChange={(e) => setLocal(e.target.value)} fullWidth id="outlined-basic" label="Curitiba - PR" variant="outlined" />
                                </div>
                                <div className="flex md:flex-row flex-col gap-3 w-full">
                                    <div className="">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['DatePicker']} sx={{ width: "100%" }}>
                                                <DatePicker onChange={(newValue) => setStartDate(newValue ? newValue : dayjs())}
                                                    value={startDate}
                                                    label="ex:12/12/2012" />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['DatePicker']} sx={{ width: "100%" }}>
                                                <DatePicker onChange={(newValue) => setEndDate(newValue ? newValue : dayjs())}
                                                    value={endDate}
                                                    label="ex:12/12/2012" />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Descrição"
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => addItem(setListExperience, ObjExperience)}
                                >
                                    Adicionar nova experiência
                                </Button>
                            </div>
                        </div>
                        <div className="p-2 rounded">
                            {
                                listExperience?.map((i, index) => {
                                    return (
                                        <div className="flex gap-3 items-center" key={index} >
                                            <div className="w-3 h-3 rounded-full"></div>
                                            <p>{i.role} - {i.company} de: {i.startDate.toString().substring(0, 15)} até {i.endDate.toString().substring(0, 15)}</p>
                                            <div className='flex w-full justify-end mr-15'>
                                                <IconButton onClick={() => removeItem(index, listExperience, setListExperience)} className=''><DeleteIcon color='error' /></IconButton>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* formção academica */}
                        <h2 className="font-semibold text-green-700">Formação acadêmica</h2>
                        <div className="bg-gray-100 rounded p-4">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col md:flex-row gap-3 w-full">
                                    <div className="flex w-full flex-col gap-3">
                                        <h2>Instituição</h2>
                                        <TextField value={role} onChange={(e) => setRole(e.target.value)} fullWidth id="outlined-basic" label="ex: Assistente de RH" variant="outlined" />
                                    </div>
                                    <FormControl sx={{marginTop: 4.5}} fullWidth>
                                        <InputLabel id="demo-simple-select-label">Grau</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={degree}
                                            label="Age"
                                            onChange={(e) => setDegree(e.target.value)}
                                        >
                                            <MenuItem value={"Básico"}>Básico</MenuItem>
                                            <MenuItem value={"Técnico"}>Técnico</MenuItem>
                                            <MenuItem value={"Ensino superior"}>Ensino superior</MenuItem>
                                            <MenuItem value={"Pós-Graduação"}>Pós-Graduação</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h2>Course</h2>
                                    <TextField value={course} onChange={(e) => setCourse(e.target.value)} fullWidth id="outlined-basic" label="Curitiba - PR" variant="outlined" />
                                </div>
                                <div className="flex md:flex-row flex-col gap-3 w-full">
                                    <div className="">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['DatePicker']} sx={{ width: "100%" }}>
                                                <DatePicker onChange={(newValue) => setStartDateCourse(newValue ? newValue : dayjs())}
                                                    value={startDateCourse}
                                                    label="ex:12/12/2012" />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['DatePicker']} sx={{ width: "100%" }}>
                                                <DatePicker onChange={(newValue) => setEndDateCourse(newValue ? newValue : dayjs())}
                                                    value={endDateCourse}
                                                    label="ex:12/12/2012" />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => addItem(setListEducation, ObjEducation)}
                                >
                                    Adicionar nova formação
                                </Button>
                            </div>
                        </div>
                        <div className="p-2 rounded">
                            {
                                listEducation?.map((i, index) => {
                                    return (
                                        <div className="flex gap-3 items-center" key={index} >
                                            <div className="w-3 h-3 rounded-full"></div>
                                            <p>{i.course} - {i.instituition} - {i.degree} de: {i.startDate.toString().substring(0, 15)} até {i.endDate.toString().substring(0, 15)}</p>
                                            <div className='flex w-full justify-end mr-15'>
                                                <IconButton onClick={() => removeItem(index, listExperience, setListExperience)} className=''><DeleteIcon color='error' /></IconButton>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* skills */}
                        <div className="flex w-full flex-col gap-3">
                            <TextField value={skill} onChange={(e) => setSkill(e.target.value)} fullWidth id="outlined-basic" label="habilidade" variant="outlined" />
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => addItem(setListSkills, skill)}
                            >
                                Adicionar habilidade
                            </Button>
                        </div>
                        {/* idiomas */}
                        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                            <TextField sx={{marginTop:4.5}} value={skill} onChange={(e) => setSkill(e.target.value)} fullWidth id="outlined-basic" label="habilidade" variant="outlined" />
                            <FormControl sx={{marginTop: 4.5}} fullWidth>
                                <InputLabel id="demo-simple-select-label">Grau</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={degree}
                                    label="Age"
                                    onChange={(e) => setDegree(e.target.value)}
                                >
                                    <MenuItem value={"Beginner"}>Básico</MenuItem>
                                    <MenuItem value={"Intermediate"}>Intermediário</MenuItem>
                                    <MenuItem value={"Advanced"}>Avançado</MenuItem>
                                    <MenuItem value={"Fluent"}>Fluente</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => addItem(setListSkills, skill)}
                        >
                            Adicionar habilidade
                        </Button>
                        <div className="flex flex-col w-full gap-6 ">
                            <TextField
                            id="outlined-multiline-static"
                            label="Nota para recrutador"
                            multiline
                            rows={4}
                
                            />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => addItem(setListSkills, skill)}
                            >
                            Finalizar
                        </Button>
                        </div>
                        {/* separador */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResumeEdit;