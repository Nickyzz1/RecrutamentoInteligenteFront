"use client"
// imports internos
import {HeaderLogged} from "@/components/header2/page"
import {Card} from '@/components/vacancyCard/page'

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
        <div className="h-screen flex flex-col bg-[#F9FAFB]">
        <HeaderLogged/>
        <h1 className="text-[#036D3C]">Gerenciamento de vagas</h1>

        <div className="flex rounded shadow w-2/2">

<Card title="a",/>

        </div>

        </div>
        </>
    )
}

export default manageAplication;