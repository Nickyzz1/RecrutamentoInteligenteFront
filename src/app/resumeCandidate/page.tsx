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

interface IParams { 
  params: {idUser : string}
}

const ResumeCandidate = async ({params: {idUser: id}} : IParams) => {

    // fazer requisição para pegar os dados do usuário com o idUser

    enum EEducationStatus {
        Incomplete = 0,
        Underway = 1,
        Complete = 2
    }
    enum EEducationType {
        BasicEducation = 0,
        TechnicalCourse = 1,
        Graduation = 2,
        PosGraduation = 3
    }
    enum EProficiencyLevel {
        Benniger = 0,
        Intermediate = 1,
        Advanced = 2,
        Fluent = 3
    }

    enum EApplicationStatus {
        ANALISE = 0,
        APROVADO = 1,
        REPROVADO = 2,
        DINAMICA = 3,
        ENTREVISTA = 4,
    }

    interface IApplication {
        
        id : number,
        candidate : {
            id : number,
            name : string,
            email : string,
            phone : string | null
        },
        status : EApplicationStatus,
        note : string,
        dismissalStage : {
            id : number,
            description : string,
            startDate : Date,
            endDate : Date
        } | null
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

        const mockData : IResume = {
            "id" : 1,
            "name" : "Sabrina Mortean Loures de Souza",
            "email" : "Sabrina.souza.2754@gmail.com",
            "bio" : "Sou desenvolvedora de software com experiência na criação de soluções tecnológicas robustas, escaláveis e centradas no usuário. Minha formação em [Curso] pela [Universidade] me deu uma base sólida, e desde então venho atuando no setor de tecnologia há mais de [X anos], com passagens por startups e empresas de médio e grande porte. Trabalho principalmente com [principais linguagens/tecnologias, ex: JavaScript, Python, React, Node.js], e tenho experiência no desenvolvimento de aplicações web e mobile, além de arquiteturas backend. Gosto de trabalhar em times ágeis, utilizando metodologias como Scrum e Kanban, com foco em entregas contínuas e de qualidade.",
            "admin" : false,
            "phone" :"41 99999-9999",
            "educations" : [{
                "id" : 1,
                "institution" : "Universidade Positivo - UP",
                "course" : "Engenharia de sofware",
                "status" : 1,
                "type" : 1,
                "startDate" : "2020-03-26",
                "endDate" :  "2020-03-26"
            },
            {
                "id" : 2,
                "institution" : "Senai cic",
                "course" : "Analise e desenvolvimento de sistemas",
                "status" : 1,
                "type" : 1,
                "startDate" : "2024-02-26",
                "endDate" :  "2025-07-09"
            }
            ],
            "experiences" : [{
                "id" : 1,
                "company" : "Robert Bosch",
                "role" : "PO - Product Owner",
                "description" : "Responsável por gerenciar o backlog do produto, priorizando funcionalidades com base em valor de negócio, feedback de usuários e metas estratégicas. Atua como ponte entre as áreas de negócio e o time de desenvolvimento, garantindo alinhamento e entregas com foco no cliente. Trabalha com metodologias ágeis, definição de requisitos, validação de entregas e evolução contínua do produto.",
                "location" : "Juscelino Kubitschek",
                "startDate" :  "2018-03-26",
                "endDate" :  "2020-02-26"
            },
            {
                "id" : 2,
                "company" : "IBM",
                "role" : "Desenvolvedor Frontend pleno",
                "description" : "Experiência com avaScript, TypeScript, React e Sass, com foco em arquitetura escalável, testes automatizados e integração com APIs em ambientes corporativos.",
                "location" : "Paraná, Curitiba",
                "startDate" :  "2015-05-26",
                "endDate" :  "2018-01-26"
            },
            ],
            "languages" : [{
                "id" : 1,
                "name" : "Inglês",
                "level" : 3
            }],
          
            "address" : "Renato hugo vardanega, 84",
           
            "skills" : [{
                "id" : 1,
                "name" : 'Comunicação'
            },
            {
                "id" : 2,
                "name" : 'C#'
            },
             {
                "id" : 3,
                "name" : 'React Next'
            },
            {
                "id" : 4,
                "name" : 'Talwind'
            },        
            {
                "id" : 5,
                "name" : 'React Native'
            }    
            ],
            "links" : [{
                "id" : 1,
                "url" : "https://github.com/sasa2754",
                "description" : "Github"
            },
            {
                "id" : 2,
                "url" : "https://instagram.com/Sabrina.2754",
                "description" : "Instagram"
            },
            {
                "id" : 3,
                "url" : "https://br.linkedin.com/in/sabrina-mortean-70a52b230",
                "description" : "Linkedin"
            },
            {
                "id" : 4,
                "url" : "https://sabrinaportifolio.com",
                "description" : "Portifólio"
            },
            {
                "id" : 5,
                "url" : "https://projeto.com",
                "description" : "Projeto React"
            },
        ]
        }

        const application: IApplication = {
            id: 1,
            candidate: {
            id: 1,
            name: "Sabrina Mortean Loures de Souza",
            email: "Sabrina.souza.2754@gmail.com",
            phone: "41 99999-9999"
            },
            status: 1,
            note: `Sou Sabrina, desenvolvedora com experiência sólida como desenvolvedora plena e também como Product Owner. Essa trajetória me proporcionou uma visão ampla do ciclo completo de desenvolvimento, desde o entendimento das necessidades do negócio até a entrega de soluções técnicas eficientes. 

            Após atuar como PO, desenvolvi habilidades valiosas de comunicação, priorização e alinhamento com stakeholders, que agregam muito no papel de uma desenvolvedora sênior, que deve liderar tecnicamente e guiar o time.

            Tenho grande motivação para retornar à prática do desenvolvimento, aplicando tanto meu conhecimento técnico quanto minha experiência de gestão para contribuir de forma estratégica e inovadora na Darede, especialmente nos desafios da nuvem.

            Acredito que essa vaga de Desenvolvedora Sênior é o próximo passo ideal para minha carreira, pois me permitirá crescer tecnicamente, liderar projetos mais complexos e atuar com impacto direto no sucesso da empresa.`,
            dismissalStage: null
        }
        
        const dataVacancy = {
            name : "Desenvolvedor React Sênior"
        }

        const levels: { [key: number]: string } = {
        [EProficiencyLevel.Benniger]: "Básico",
        [EProficiencyLevel.Intermediate]: "Intermediário",
        [EProficiencyLevel.Advanced]: "Avançado",
        [EProficiencyLevel.Fluent]: "Fluente",
        };


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
                                <h1 className="text-2xl font-semibold">{mockData.name} </h1>
                                <p className="text-sm" >Candidura para {dataVacancy.name} </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-9">
                            {/* Dados pessoais */}
                            <h1 className="text-[#036d3c] text-xl font-semibold" >Informações pessoais</h1>
                            <div className="w-full grid grid-cols-1, md:grid-cols-2 gap-3 " >
                                <div>
                                    <h2 className="text-neutral-400" >Nome completo</h2>
                                    <p>{mockData.name}</p>
                                </div>
                                <div>
                                    <h2 className="text-neutral-400">Email</h2>
                                    <p className="break-words">{mockData.email}</p>
                                </div>
                                <div>
                                    <h2 className="text-neutral-400" >Telefone</h2>
                                    <p>{mockData.phone}</p>
                                </div>
                                <div>
                                    <h2 className="text-neutral-400" >Endereço</h2>
                                    <p>{mockData.address}</p>
                                </div>
                                <div>
                                    {mockData.links.map((i, index) => {
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
                                    mockData.experiences.map((e, index) => 
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
                                    mockData.educations.map((e, index) => {
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
                                    mockData.skills.map((s, index) => {
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
                                    mockData.languages.map((e, index) => {
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
                                    mockData.links.map((l, index) => {
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
                                    <p>{application.note}</p>
                                </div>
                            </div>

                    </div>
                </div>
            </div>           
        </>
    )
}

export default ResumeCandidate;