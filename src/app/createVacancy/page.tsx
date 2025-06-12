"use client"

import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import { HeaderLoggedAdmin } from "@/components/headerAdmin/page"
import { GoBack } from "@/components/goBack/page"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useState } from "react";
const createVacancy = () => {

    const [startDayWeek, setStartDayWeek] = useState('');
    const [endDayWeek, setEndDayWeek] = useState('');
    const [workStart, setWorkStart] = useState()

    return(
        <>
            <HeaderLoggedAdmin />
            <GoBack/>
            <div className="h-screen flex flex-col bg-[#F9FAFB] items-center ">
                <div className="bg-white flex flex-col w-4/5 rounded-xl shadow p-6 word gap-3">
                    <h1 className="text-2xl font-semibold">Crie uma nova vaga</h1>
                    <h2>Prencha as informações para cxriar uma nova vaga</h2>

                    <h2 className="font-semibold">Título da vaga</h2>
                    <TextField id="outlined-basic" label="ex: Assistente de RH" variant="outlined" />

                    <h2 className="font-semibold">Horário de trabalho</h2>
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
                        {/* horário de trabalho semanal */}
                        <div className=" flex flex-col gap-6 md:flex-row md:items-center">
                            <p>Semanal</p>
                            <div className="flex flex-col gap-3 md:flex-row">
                                    <Select
                                        sx={{ minWidth: 110, maxWidth: 200}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={startDayWeek}
                                        label="Início"
                                        onChange={(e) => {setStartDayWeek(e.target.value)}}
                                    >
                                        <MenuItem value={'segunda'}>Segunda</MenuItem>
                                        <MenuItem value={'terça'}>Terça</MenuItem>
                                        <MenuItem value={'quarta'}>Quarta</MenuItem>
                                        <MenuItem value={'quinta'}>Quinta</MenuItem>
                                        <MenuItem value={'sexta'}>Sexta</MenuItem>
                                        <MenuItem value={'sábado'}>Sábado</MenuItem>
                                        <MenuItem value={'domingo'}>Domingo</MenuItem>

                                    </Select>

                                        <Select
                                        sx={{ minWidth: 110, maxWidth: 200}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={endDayWeek}
                                        label="Início"
                                        onChange={(e) => {setEndDayWeek(e.target.value)}}
                                    >
                                        <MenuItem value={'segunda'}>Segunda</MenuItem>
                                        <MenuItem value={'terça'}>Terça</MenuItem>
                                        <MenuItem value={'quarta'}>Quarta</MenuItem>
                                        <MenuItem value={'quinta'}>Quinta</MenuItem>
                                        <MenuItem value={'sexta'}>Sexta</MenuItem>
                                        <MenuItem value={'sábado'}>Sábado</MenuItem>
                                        <MenuItem value={'domingo'}>Domingo</MenuItem>
                                    </Select>
                            </div>
                        </div>

                        {/* horário de trabalho Diário */}
                        <div className=" flex flex-col gap-6 md:flex-row md:items-center">
                            <p>Diário</p>
                            <div className="flex flex-col gap-3 md:flex-row">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}></Stack>
                                        <MobileTimePicker
                                            label="For mobile"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                            />
                                    </Stack>
                                </LocalizationProvider>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default createVacancy