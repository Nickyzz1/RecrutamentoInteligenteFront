"use client"

import { HeaderLoggedAdmin } from "@/components/headerAdmin/page"
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { GoBack } from "@/components/goBack/page";
import { Button, Divider, Link } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import { EApplicationStatus, EEducationStatus, EEducationType, EProficiencyLevel } from "@/constants/enums";
import { APIURL } from "@/constants/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import { HeaderLogged } from "@/components/headerUser/page";
import seta from "@/assets/next.png"
import back from "@/assets/back.png"

export function ApplicationRequest({id} : {id : string}) 
{
    const [application, setApplication] = useState<IApplication | null>(null)
    const [user, setUser] = useState<IResume | null>(null)
    const [vacancy, setVacancy] = useState<{name: string} | null>(null)

    // ---- fazer requisição para pegar os dados do usuário com o idUser
    const getResumeCandidate = () => {

    }

    interface IApplication {
        
        id : number,
        candidateId : number,
        vacancyId : number,

        status : EApplicationStatus,
        note : string,
        
    }[]
     

    interface IResume {
        
        "id" : number,
        "name" : string,
        "email" : string,
        "bio" : string | null,
        "admin" : boolean,
        "phone" : string | null
        "educations" : {
            "id" : number,
            "institution" : string,
            "course" : string,
            "status" : EEducationStatus,
            "type" : EEducationType,
            "startDate" : string,
            "endDate" : string
        }[],
        "experiences" : {
            "id" : number,
            "company" : string,
            "role" : string,
            "description" : string,
            "location" : string,
            "startDate" : string,
            "endDate" : string | null
        }[],
        "languages" : {
            "id" : number,
            "name" : string,
            "level" : EProficiencyLevel
        }[],
        
        "address" : string | null
        ,
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

    const levels: { [key: string]: string } = {
    [EProficiencyLevel.Beginner]: "Básico",
    [EProficiencyLevel.Intermediate]: "Intermediário",
    [EProficiencyLevel.Advanced]: "Avançado",
    [EProficiencyLevel.Fluent]: "Fluente",
    };
    
    useEffect(() => {
        fetch(`${APIURL}/application/${id}`, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`
            }
        }).then(res => res.json()).then(data => {
            setApplication(data.value)

            fetch(`${APIURL}/user/${application ? application.candidateId : ""}`, {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`
                }
            }).then(res => res.json()).then((data) => setUser(data.value))
        
            fetch(`${APIURL}/vacancy/${application ? application.vacancyId : ""}`, {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`
                }
            }).then(res => res.json()).then((data) => setVacancy(data.value))
        })
    
    }, [])
    return(
        <>
            <HeaderLoggedAdmin/>
            <GoBack/>
            <div className="flex flex-col items-center min-h-screen gap-3 py-7" >
                <div className="bg-white flex flex-col w-4/5 rounded-xl shadow p-6 word gap-3" >
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex">
                            <FeedOutlinedIcon sx={{color: "#036d3c"}}/>
                        </div>
                        <div  className="flex flex-col gap-1">
                            <h1 className="text-2xl font-semibold">{user ? user.name : ""} </h1>
                            <p className="text-sm" >Candidura para {vacancy?.name} </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-9">
                        {/* Dados pessoais */}
                        <h1 className="text-[#036d3c] text-xl font-semibold" >Informações pessoais</h1>
                        <div className="w-full grid grid-cols-1, md:grid-cols-2 gap-3 " >
                            <div>
                                <h2 className="text-neutral-400" >Nome completo</h2>
                                <p>{user ? user.name : ""}</p>
                            </div>
                            <div>
                                <h2 className="text-neutral-400">Email</h2>
                                <p className="break-words">{user ? user.email : ""}</p>
                            </div>
                            <div>
                                <h2 className="text-neutral-400" >Telefone</h2>
                                <p>{user ? user.phone : ""}</p>
                            </div>
                            <div>
                                <h2 className="text-neutral-400" >Endereço</h2>
                                <p>{user ? user.address : ""}</p>
                            </div>
                            <div>
                                {(user ? user.links : []).map((i, index) => {
                                    if(i.url.includes("linkedin"))
                                    return(
                                        <div key={index} className="flex-wrap" >
                                            <h2 className="text-neutral-400">Linkedin</h2>
                                            <Link href="#" variant="body2">
                                            {i.url}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Experienca profissional */}
                        <div className="flex flex-col gap-6" >
                            <h1 className="text-[#036d3c] text-xl font-semibold" >Experiência profissional</h1>
                            <Divider/>
                            {
                                (user ? user.experiences : []).map((e, index) => 
                                    {
                                        return(
                                            <div key={index} className="bg-gray-100 shadow-[0px_0px_5px_rgba(0,0,0,0.15)] flex flex-col p-4 gap-3 rounded-xl" >
                                        <div className="flex flex-col">
                                            <div className="flex items-start flex-col md:grid md:grid-cols-2">
                                                <h1 className="text-xl font-semibold">{e.role}</h1>
                                                <h2 className="flex justify-end text-neutral-500" >{e.startDate} -  {e.startDate}</h2>
                                            </div>
                                            <h2 className="text-sm text-neutral-500 font-semibold">{e.company} - {e.location}</h2>
                                        </div>
                                        <p className="text-neutral-500">{e.description}</p>
                                    </div>
                                    )
                                })
                            }

                        </div>

                        {/* Formação academica */}
                        <div className="flex flex-col gap-6" >
                            <h1 className="text-[#036d3c] text-xl font-semibold" >Formação acadêmica</h1>
                            <Divider/>
                            {
                                (user ? user.educations : []).map((e, index) => {
                                    return(
                                        <div key={index} className="bg-gray-100 shadow-[0px_0px_5px_rgba(0,0,0,0.15)] flex flex-col p-4 gap-3 rounded-xl" >
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-start flex-col md:grid md:grid-cols-2">
                                                    <h1 className="text-xl font-semibold">{e.course}</h1>
                                                    <h2 className="flex justify-end text-neutral-500" >{e.startDate} -  {e.startDate}</h2>
                                                </div>
                                                <h2 className="text-sm text-neutral-500 font-semibold">{e.institution}</h2>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    {/* Habilidades */}
                        <div className="flex flex-col gap-6" >
                            <h1 className="text-[#036d3c] text-xl font-semibold" >Formação acadêmica</h1>
                            <Divider/>
                            <div className="flex gap-2 flex-wrap wrap">
                            {
                                (user ? user.skills : []).map((s, index) => {
                                    return(
                                        <p key={index} className="border rounded-2xl bg-green-100 px-2 border-green-700">{s.name}</p>      
                                    )
                                })
                            }
                            </div>
                        </div>

                        {/* Idiomas */}
                        <div className="flex flex-col gap-6" >
                            <h1 className="text-[#036d3c] text-xl font-semibold" >Formação acadêmica</h1>
                            <Divider/>
                            <div className="flex gap-2 flex-wrap wrap">
                            {
                                (user ? user.languages : []).map((e, index) => {
                                    return(
                                        <p key={index} className="border rounded-2xl bg-green-100 px-2 border-green-700">{e.name} - {levels[e.level]}</p>      
                                    )
                                })
                            }
                            </div>
                        </div>

                        {/* Links extternos */}
                        <div className="flex flex-col gap-6" >
                            <h1 className="text-[#036d3c] text-xl font-semibold" >Links externos</h1>
                            <Divider/>
                            <div className="flex gap-2 flex-wrap wrap">
                            {
                                (user ? user.links : []).map((l, index) => {
                                    return(
                                        <div key={index} className="flex gap-2">
                                            {l.url.includes("github") ? (
                                                <Button color="success" onClick={() => window.open(l.url, '_blank', 'noopener,noreferrer')}>
                                                    <GitHubIcon/>
                                                </Button>
                                            ) :  l.url.includes("instagram") ? (
                                                <Button color="success" onClick={() => window.open(l.url, '_blank', 'noopener,noreferrer')}>
                                                    <InstagramIcon/>
                                                </Button>
                                            ) : l.url.includes("linkedin") ? (
                                                <Button color="success" onClick={() => window.open(l.url, '_blank', 'noopener,noreferrer')}>
                                                    <LinkedInIcon/>
                                                </Button>
                                            ) : l.url.includes("facebook") ? (
                                                <Button color="success" onClick={() => window.open(l.url, '_blank', 'noopener,noreferrer')}>
                                                    <FacebookIcon/>
                                                </Button>
                                            ) : (
                                                <Button className="flex gap-4" color="success" onClick={() => window.open(l.url, '_blank', 'noopener,noreferrer')}>
                                                    <LinkIcon/>
                                                    <p>{l.description}</p>
                                                </Button>
                                            )}
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                        {/* Nota para recrutador */}
                        <div className="flex flex-col gap-6" >
                            <h1 className="text-[#036d3c] text-xl font-semibold" >Nota para recrutador</h1>
                            <Divider/>
                            <div className="flex gap-2 flex-wrap wrap px-2">
                                <p>{application ? application.note : ""}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        </>
    )
}

export function SendCandidatureRequest({id} : {id : string}){

    const [vacancy, setVacancy] = useState<any | null>(null)
    
    useEffect(() => {
        fetch(`${APIURL}/vacancy/${id}`, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`
            }
        })
        .then(response => response.json())
        .then(data => setVacancy(data.value))
    }, [])

    const [note, setNote] = useState<string>("")

    function send()
    {
        fetch(`${APIURL}/application`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("AUTH")}`,
        },
        body: JSON.stringify({
            note : note,
            vacancyId : id
        })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.message);
        })
        .catch((err) => {
            console.error("Erro ao se candidatar:", err);
        });
    }

    return(
        <div className="min-h-screen flex flex-col">
            <HeaderLogged />
            <div className="flex flex-col flex-grow bg-[#F9FAFB] pt-8 px-16">
                <div className="flex flex-row gap-4 items-center">
                    <Image src={back} alt="seta" className="scale-75"></Image>
                    <p className="font-semibold text-[#909192]">Voltar</p>
                </div>
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col bg-white border-[1px] border-gray-200 p-10 px-12 gap-7 max-w-[1000px] w-5/6 rounded-2xl">
                        <p className="text-3xl font-bold">{vacancy ? vacancy.title : ""}</p>

                        <div className="flex flex-col gap-2">
                            <p className="text-[#909192]">Preencha seu currículo para se candidatar a esta vaga</p>
                            <div className="flex justify-between bg-[#F6F6F6] border-[1px] border-gray-200 p-4 px-6 gap-4 rounded-2xl flex-row">
                                <p className="font-semibold">Seu currículo</p>
                                <Image src={seta} alt="seta" className=" object-contain w-6"></Image>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <input type="checkbox"></input>
                            <p className="font-semibold">Usar currículo atual</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[#909192]">Descreva sua motivação</p>
                            <textarea className="bg-white border-[1px] border-gray-200 p-5 px-6 h-60 rounded-2xl resize-none" value={note} onChange={(e) => setNote(e.target.value)}/>
                        </div>
                        <Button onClick={send} className="bg-[#036D3C] text-white p-2 flex justify-center items-center rounded-xl">Candidatar-se</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}