"use client"
import * as React from 'react';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { HeaderLoggedAdmin } from "@/components/headerAdmin/page"
import { GoBack } from "@/components/goBack/page"
import {Button, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react";
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import dayjs from 'dayjs';


const createVacancy = () => {

    const [startDayWeek, setStartDayWeek] = useState('');
    const [endDayWeek, setEndDayWeek] = useState('');
    const [list, setList] = useState<string[]>([])
    const [inputValue, setValue] = useState('')

    return(
        <>
            <HeaderLoggedAdmin />
            <GoBack/>
            <div className="h-screen flex flex-col bg-[#F9FAFB] items-center ">
                <div className="bg-white flex flex-col max-w-[1200px] w-4/5 rounded-xl shadow p-6 word gap-6">
                    <h1 className="text-2xl font-semibold">Crie uma nova vaga</h1>
                    <h2>Prencha as informações para criar uma nova vaga</h2>

                    <div className='flex flex-col gap-3'>
                        <h2 className="font-semibold">Título da vaga</h2>
                        <TextField id="outlined-basic" label="ex: Assistente de RH" variant="outlined" />
                    </div>

                    <h2 className="font-semibold">Horário de trabalho</h2>
                        {/* container */}
                        <div className="flex flex-col md:grid md:grid-cols-2">
                            {/* horário de trabalho semanal */}
                            <div className=" flex flex-col gap-3 md:flex-row md:items-center">
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
                            <div className=" flex flex-col gap-3 md:flex-row md:items-center">
                                <p>Diário</p>
                                <div className="flex flex-col gap-3 md:flex-row">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileTimePicker
                                                label="Início"
                                                defaultValue={dayjs('2022-04-17T08:30')}
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
                                                defaultValue={dayjs('2022-04-17T17:30')}
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

                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-3'>
                                <h2 className="font-semibold">Etapas da vaga</h2>
                                <TextField value={inputValue} id="outlined-basic" label="ex: Inscrições" variant="outlined"
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter' && inputValue.trim() !== '') {
                                        setList((prev) => [...prev, inputValue.trim()])
                                        setValue('')
                                }}}/>
                            </div>

                            <div className='flex flex-col gap-3 '>
                                {list.map((i, index) => {
                                    return(
                                            <div key={index} className='flex gap-3 items-center'>
                                                <p className='rounded-full w-8 h-8 text-white flex items-center justify-center bg-[#0AA851FF] p-2'>{index + 1}</p>
                                                <p>{i}</p>
                                            </div>
                                    )
                                })}
                            </div>

                        </div>

                        <Button variant='contained' className="flex gap-3 max-w-80 self-center" sx={{backgroundColor: '#0AA851FF'}}>
                            Próximo
                        </Button>
                </div>
            </div>
        </>
    )
}

export default createVacancy
