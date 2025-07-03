"use client"

import { GoBack } from "@/components/goBack/page";
import { HeaderLogged } from "@/components/headerUser/page";
import { Divider, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

const Resume = () => {

    const [startDate, setStartDate] = useState(dayjs(""))
    const [endDate, setEndDate] = useState(dayjs(""))

    return(
        <>
        <HeaderLogged/>
        <GoBack/>
        <div className="h-screen flex flex-col bg-[#F9FAFB] items-center pb-6">
            {/* infos pessoais */}
            <div className="bg-white flex flex-col max-w-[1200px] w-4/5 rounded-xl shadow p-6 word gap-6">
                <h1 className="font-bold text-2xl">Meu currículo</h1>
                <h2 className="font-semibold text-green-700">Informações pessoais</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                        <h2>Nome completo</h2>
                        <TextField fullWidth id="outlined-basic" label="ex: Eduardo Ribeiro" variant="outlined" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2>Email</h2>
                        <TextField fullWidth id="outlined-basic" label="ex: EduardoRibeiro@email.com" variant="outlined" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2>Telefone</h2>
                        <TextField fullWidth id="outlined-basic" label="ex: 41 99999-9999" variant="outlined" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2>Endereço</h2>
                        <TextField fullWidth id="outlined-basic" label="ex: Rua Eduardo Ribeiro Ribas" variant="outlined" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2>Linkedin</h2>
                        <TextField fullWidth id="outlined-basic" label="Digite seu link do linkedin" variant="outlined" />
                    </div>
                </div>

                <Divider/>

                {/* experiencia profissional */}
                <h2 className="font-semibold text-green-700">Experiência profissional</h2>
                <div className="bg-gray-100 rounded p-4">
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-3 w-full">
                            <div className="flex w-full flex-col gap-3">
                                <h2>Cargo</h2>
                                <TextField fullWidth id="outlined-basic" label="ex: Eduardo Ribeiro" variant="outlined" />
                            </div>
                            <div className="flex w-full flex-col gap-3">
                                <h2>Empresa</h2>
                                <TextField fullWidth id="outlined-basic" label="ex: EduardoRibeiro@email.com" variant="outlined" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2>Local</h2>
                            <TextField fullWidth id="outlined-basic" label="ex: 41 99999-9999" variant="outlined" />
                        </div>

                        <div className="flex gap-3 w-full">
                            <div className="">
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']} sx={{ width: "100%" }}>
                                        <DatePicker onChange={(newValue) => setStartDate(newValue ? newValue : dayjs())}
                                        value={startDate}
                                        label="ex:12/12/2012"/>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']} sx={{ width: "100%" }}>
                                        <DatePicker onChange={(newValue) => setEndDate(newValue ? newValue : dayjs())}
                                        value={endDate}
                                        label="ex:12/12/2012"/>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Resume;