'use client'
import Image from "next/image";

import { HeaderLogged } from "@/components/headerUser/page";
import { useState, useEffect } from "react";
import editar from "@/assets/editar.png"
import sair from "@/assets/sair.png"
import email from "@/assets/emailgreen.png"
import fone from "@/assets/phonegreen.png"
import chapeu from "@/assets/chapeu.png"
import pessoa from "@/assets/primo.jpg"

import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { APIURL } from "@/constants/api";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: 400,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 10,
    p: 3,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
};

interface UserProfile {
    name : string,
    email : string,
    phone : string | null,
    interests : string[],
    bio : string
}

export default function Start() {

    const [user, setUser] = useState<UserProfile | null>(null)
    const [modalInterest, setModalInterest]  = useState(true)
    const router = useRouter()
    const [modal, setModal] = useState(false);
    const [bio, setBio] = useState<string>("");

    const logout = () => {
        localStorage.removeItem("AUTH")
        router.push(ROUTES.login)
    }

    useEffect(() => {
        const _user = localStorage.getItem("UserData")
        const userData = JSON.parse(_user != null ? _user : "")

        fetch(`${APIURL}/user/${userData.Id}`, {
          method: "GET",
          headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`
          },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            setUser(data.value)
        })
    },[])



    const closeModal = () => {
        setBio("");
        setModal(false);
    }

    const openModal = () => {
        setModal(true);
    }

    return (
        <>
            <HeaderLogged />
            <div className="flex flex-col items-center justify-start w-full">
                <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-[1440px] p-8 gap-10 flex-1">
                    {/* Lado Esquerdo */}
                    <div className="shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.2)] rounded-[12px] p-6 w-full md:w-[450px] bg-white ">
                        <div className="flex flex-row justify-end gap-3">
                            <IconButton onClick={logout}>
                                <LogoutOutlinedIcon fontSize="large" color="success" />
                            </IconButton>
                         
                            <IconButton onClick={() => openModal()}>
                                <DriveFileRenameOutlineOutlinedIcon fontSize="large" color="success" />
                            </IconButton>
                        </div>
                        <div className="flex justify-center my-8">
                            <div className="p-3 rounded-full shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.2)]">
                                <Image src={pessoa} alt="foto" className="rounded-full w-48 h-48 object-cover" />
                            </div>
                        </div>
                        <div className="flex items-center flex-col gap-2 text-center mb-6">
                            <p className="text-3xl font-bold text-[#036D3C]">{user?.name}</p>
                            <p className="text-xl text-[#666666] font-semibold">Suport para rollout TI</p>
                        </div>
                        <div className="bg-[#036D3C] w-full h-[2px] mb-5" />
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Image src={email} alt="email" className="w-6 h-6 object-contain" />
                                <p className="text-[#666666] text-xl">{user?.email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image src={fone} alt="telefone" className="w-6 h-6 object-contain" />
                                <p className="text-[#666666] text-xl">{user?.phone}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image src={chapeu} alt="formação" className="w-6 h-6 object-contain" />
                                <p className="text-[#666666] text-xl">Engenharia de software</p>
                            </div>
                        </div>
                    </div>

                    {/* Lado Direito */}
                    <div className="flex flex-col gap-8 w-full flex-1">
                        <div className="shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.2)] rounded-[12px] p-6 bg-white flex justify-between items-center">
                            <p className="text-[#036D3C] font-semibold text-lg">Editar currículo</p>
                            <IconButton onClick={() => openModal()}>
                                <DriveFileRenameOutlineOutlinedIcon fontSize="medium" color="success" />
                            </IconButton>
                        </div>

                        <div className="shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.2)] rounded-[12px] p-6 bg-white flex flex-col gap-10 flex-grow">

                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-[#036D3C] font-semibold text-lg">Interesses</p>
                                    <IconButton onClick={() => setModalInterest(true)}>
                                        <DriveFileRenameOutlineOutlinedIcon fontSize="medium" color="success" />
                                    </IconButton>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {["Liderança", "Comunicação", "TI", "Automação", "Gerencia"].map((item, index) => (
                                        <span key={index} className="bg-[#036D3C] text-white px-5 py-2 rounded-full text-sm font-medium shadow-sm">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center flex-col gap-2 text-center mb-6">
                                
                                {/* <p className="text-xl text-[#666666] font-semibold">Suport para rollout TI</p> */}
                            </div>
                            <div className="bg-[#036D3C] w-full h-[2px] mb-5" />
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <Image src={email} alt="email" className="w-6 h-6 object-contain" />
                                    <p className="text-[#666666] text-xl">E-mail: {user?.email}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Image src={fone} alt="telefone" className="w-6 h-6 object-contain" />
                                    <p className="text-[#666666] text-xl">{user?.phone == null ? '' : `Tel: ${user?.phone}`}</p>
                                </div>
                                {/* <div className="flex items-center gap-3">
                                    <Image src={chapeu} alt="formação" className="w-6 h-6 object-contain" />
                                    <p className="text-[#666666] text-xl">Engenharia de software</p>
                                </div> */}
                            </div>
                        </div>

                            <div>
                                <p className="text-[#036D3C] font-bold text-lg mb-2">Biografia</p>
                                <p className="text-base text-[#333] leading-relaxed">
                                    Maecenas a nulla augue. Phasellus accumsan vulputate justo, ac ultrices lectus fringilla ac.
                                    Nunc mattis nulla non condimentum congue. Sed tempus pharetra urna. Nam accumsan erat et ipsum sodales tincidunt.
                                    Nulla sed pulvinar ex, sed auctor tellus. Aliquam vel tincidunt nibh. Integer vestibulum neque at nibh hendrerit,
                                    eu sodales sem egestas. Donec vehicula dui sit amet elementum dictum.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            {modal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative">

                        {/* Imagem centralizada */}
                        <div className="flex justify-center mb-6 -mt-20">
                            <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden relative">
                                <Image src={pessoa} alt="foto de perfil" className="object-cover w-full h-full" />
                                <button className="absolute bottom-1 right-1 bg-gray-200 hover:bg-gray-300 transition-colors p-1 rounded-full shadow cursor-pointer">
                                    <span className="text-sm text-gray-600">📷</span>
                                </button>
                            </div>
                        </div>

                        <form className="space-y-5">
                            <div>
                                <label className="text-sm text-gray-600 font-semibold">Nome</label>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    className="w-full border-b border-gray-300 text-gray-600 focus:outline-none py-1 placeholder:text-gray-400"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-semibold">Profissão</label>
                                <input
                                    type="text"
                                    placeholder="Profissão"
                                    className="w-full border-b border-gray-300 text-gray-600 focus:outline-none py-1 placeholder:text-gray-400"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-semibold">Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border-b border-gray-300 text-gray-600 focus:outline-none py-1 placeholder:text-gray-400"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-semibold">Telefone</label>
                                <input
                                    type="text"
                                    placeholder="(99) 99999-9999"
                                    className="w-full border-b border-gray-300 text-gray-600 focus:outline-none py-1 placeholder:text-gray-400"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-semibold">Formação/curso</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Formação"
                                        className="w-full border-b border-gray-300 text-gray-600 focus:outline-none py-1 placeholder:text-gray-400 pr-6"
                                    />
                                    <div className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-600">
                                        ▼
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Botões */}
                        <div className="flex justify-between mt-10">
                            <button
                                onClick={closeModal}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 cursor-pointer"
                            >
                                Salvar
                            </button>
                        </div>

                        {/* modal adc interests */}
                        {/* modal para excluir */}
                        <Modal
                            open={modalInterest}
                            onClose={() => setModalInterest(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={style}>

                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Adicione um novo interesse
                                </Typography>

                                <div className="flex items-center justify-center flex-row gap-3 mt-4">
                                    <Button sx={{width: 100}} onClick={() => setModalInterest(false)} variant="contained" color="primary">Cancelar</Button>
                                    <Button sx={{width: 100}} variant="contained" color="error">Adicionar</Button>
                                </div>
                            </Box>
                        </Modal>

                    </div>
                </div>
            )}
        </>
    );
}
