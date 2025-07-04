"use client"

import { HeaderLogged } from "@/components/headerUser/page";
import { GoBack } from "@/components/goBack/page";
import { useEffect, useState } from "react";
import { APIURL } from "@/constants/api";
import { Button } from "@mui/material";
import { ROUTES } from "@/constants/routes";

const ViewCandidatures = () => {

    interface IVacancydata {
        "idVacancy": number,
        "title": string,
        "stage": string
    }

    const [vacancies, setVacancies] = useState<IVacancydata[]>([])

    useEffect(() => {
        fetch(`${APIURL}/user/aplications"}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("AUTH")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setVacancies(data)
                console.log("Dados recebidos do fetch:", data);

            })
            .catch(err => {
                console.error("Erro ao buscar vagas:", err);

            });
    }, []);

    return (
        <>
            <HeaderLogged />
            <GoBack />
            <div className="min-h-screen w-full gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {vacancies && vacancies.length > 0 ? (
                    vacancies.map((item, index) => (
                        <div className="bg-white rounded min-w-96 max-w-[400px]" key={index}>
                            <p>{item.title}</p>
                            <p>{item.stage}</p>
                            <Button onClick={() => `${ROUTES.vacancy}/${item.idVacancy}`} >Ir para detalhes da vaga</Button>
                        </div>
                    ))
                ) : (
                    <div className="w-full flex items-center justify-center">
                        <p className="flex text-gray-400 self-center">Nenhuma vaga encontrada.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ViewCandidatures;