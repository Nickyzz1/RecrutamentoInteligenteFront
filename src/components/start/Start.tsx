"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

// imports internos
import { HeaderLogged } from "@/components/headerUser/page";
import { Card } from "@/components/card/page";
import lupa from "@/assets/lupa.png"
import { APIURL } from "@/constants/api";

interface IVacancyData {
    "id" : number,
    "title" : string,
    "description" : string,
    "canApply" : boolean,
    "createdAt" : string,
    "skills" : string[]
}

export default function Start() {

    const [vacancies, setVacancies] = useState<IVacancyData[]>([])
    const [title, setTitle] = useState<string>("")
    const [allVacancies, setAllVacancies] = useState<IVacancyData[]>([]);
    const [filteredVacancies, setFilteredVacancies] = useState<IVacancyData[]>([]);
    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     fetch(`${APIURL}/vacancy?${title !== "" ? `title=${title}&` : ""}`, {
    //         method: "GET",
    //         headers: {
    //         "Authorization": `Bearer ${localStorage.getItem("AUTH")}`
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //     console.log("📦 Dados recebidos do fetch:", data);
    //     if (Array.isArray(data.value)) {
    //         setVacancies(data.value);
    //     } else {
    //         console.error("A propriedade `value` não é um array:", data.value);
    //         setVacancies([]);
    //     }
    //     })
    //     .catch(err => {
    //     console.error("Erro ao buscar vagas:", err);
    //     setVacancies([]);
    //     });
    // }, [title]);

    useEffect(() => {
    fetch(`${APIURL}/vacancy`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTH")}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
        if (Array.isArray(data.value)) {
            setAllVacancies(data.value);
            setFilteredVacancies(data.value); // mostra tudo no começo
        }
        });
    }, []);

    useEffect(() => {
    const busca = search.toLowerCase();

    const resultado = allVacancies.filter((v) =>
        v.title.toLowerCase().includes(busca)
    );

    setFilteredVacancies(resultado);
    }, [search, allVacancies]);


    return (
        <div className="flex max-w-screen overflow-hidden flex-col items-center justify-center bg-[#F9FAFB]">
            <HeaderLogged />
            <div className="flex  items-center justify-center w-full md:p-15 p-5">

                <div className="flex flex-col items-center w-full gap-2">

                    <div className="flex justify-center text-center gap-1.5 w-full">
                        <h1 className="text-[#036D3C] font-bold sm:text-2xl">Encontre sua</h1>
                        <h1 className="text-[#F5991D] font-bold sm:text-2xl">próxima oportunidade</h1>
                    </div>

                    <h2 className="text-md  text-center text-[#909192]">Explore novas vagas disponíveis e dê o próximo passo na sua carreira profissional</h2>

                    <div className="bg-[#F1F2F3] flex rounded-4xl p-3 mt-6 gap-6 w-full">
                        <button className="cursor-pointer">
                            <Image src={lupa} alt="lupa" className="w-6"></Image>
                        </button>
                        <input
                            type="text"
                            className="text-md placeholder:text-[#909192] outline-hidden w-full"
                            placeholder="Pesquise por cargo"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        ></input>
                    </div>

                    <div className="grid w-full items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 flex-wrap gap-10 justify-center py-6">
                    {filteredVacancies.length > 0 ? (
                        filteredVacancies.map((item, index) => (
                            <Card
                            key={index}
                            id={item.id}
                            skills={item.skills}
                            date={new Date(item.createdAt)}
                            title={item.title}
                            status={item.canApply ? "Ativa" : "Inativa"}
                            adress=""
                            description={item.description}
                            />
                        ))
                        ) : (
                        <div className="flex absolute w-full justify-center items-center">
                            <p className="text-gray-500 text-lg">Nenhuma vaga encontrada.</p>
                        </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
