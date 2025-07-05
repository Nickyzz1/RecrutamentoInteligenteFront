'use client'
import Image from "next/image";

import { HeaderLogged } from "@/components/headerUser/page";
import { useState, useEffect } from "react";
import editar from "@/assets/editar.png"
import sair from "@/assets/sair.png"
import _email from "@/assets/emailgreen.png"
import fone from "@/assets/phonegreen.png"
import chapeu from "@/assets/chapeu.png"
import pessoa from "@/assets/primo.jpg"

import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { APIURL } from "@/constants/api";
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
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

interface Interest {
    id: number,
    name: string
}

interface UserProfile {
    name: string,
    email: string,
    phone: string | null,
    interests: Interest[],
    bio: string
}

export default function Start() {


    interface ISkill {
        id: number | null,
        name: string
    }
    const [listSkills, setListSkills] = useState<ISkill[]>([])

    useEffect(() => {
        const _user = localStorage.getItem("UserData");
        if (!_user) return;

        const userData = JSON.parse(_user);
        const userId = userData.Id

        fetch(`${APIURL}/user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("AUTH")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListSkills(data.value.skills != null ? data.value.skills : [])
            })
            .catch(err => {
                console.error("❌ Erro ao buscar currículo:", err);
            });

    }, [])

    function addSkill() {
        const _user = localStorage.getItem("UserData")
        const userData = JSON.parse(_user != null ? _user : "")

        fetch(`${APIURL}/user/profile/${userData.Id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("AUTH")}`
            },
        })
            .then(response => response.json())
            .then(data => {
                listSkills.forEach((item) => {
                    if (item.id == null) {
                        fetch(`${APIURL}/resume/skill`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("AUTH")}`
                            },
                            body: JSON.stringify({
                                userId: userData.Id,
                                name: item.name
                            })
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data.message);
                                console.log(data.value)
                                setModalInterest(false)
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    }
                });
            });
    }


    const [user, setUser] = useState<UserProfile | null>(null)
    const [modalInterest, setModalInterest] = useState(false)

    const router = useRouter()

    const logout = () => {
        localStorage.removeItem("AUTH");
        router.push(ROUTES.login);
    };


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
                console.log(data.message);
                setUser(data.value);
            })
            .catch((err) => {
                console.error("Erro ao buscar usuário:", err);
            });
    }, []);

    const [modal, setModal] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState<string>("")
    const [bio, setBio] = useState("")
    const [interests, setInterests] = useState<Interest[]>([])


    const closeModal = () => {
        setModal(false);
    }

    const saveChanges = () => {
        if (user == null) { return }
        const _user = localStorage.getItem("UserData")
        const userData = JSON.parse(_user != null ? _user : "")
        fetch(`${APIURL}/user/profile/${userData.Id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("AUTH")}`
            },
            body: JSON.stringify({
                name: name == user.name ? null : name,
                email: email == user.email ? null : email,
                bio: bio == user.bio ? null : bio,
                phone: phone == user.phone ? null : phone
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                setUser({
                    name: data.value.name,
                    email: data.value.email,
                    bio: data.value.bio,
                    phone: data.value.phone,
                    interests: user.interests ? user.interests : [],
                })
                setModal(false);
            })
    }

    const openModal = () => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setPhone(user.phone ? user.phone : "")
            setBio(user.bio ? user.bio : "")
        }
        setModal(true);
    }

    const openModalInterest = () => {
        setModalInterest(true)
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
                            <p className="text-3xl font-bold text-[#036D3C]">{user ? user.name : ""}</p>
                        </div>
                        <div className="bg-[#036D3C] w-full h-[2px] mb-5" />
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Image src={_email} alt="email" className="w-6 h-6 object-contain" />
                                <p className="text-[#666666] text-xl">{user ? user.email : ""}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image src={fone} alt="telefone" className="w-6 h-6 object-contain" />
                                <p className="text-[#666666] text-xl">{user?.phone ? user.phone : 'Adicione um telefone'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Lado Direito */}
                    <div className="flex flex-col gap-8 w-full flex-1">
                        <div className="shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.2)] rounded-[12px] p-6 bg-white flex justify-between items-center">
                            <p className="text-[#036D3C] font-semibold text-lg">Editar currículo</p>
                            <IconButton onClick={() => router.push(`${ROUTES.resume}`)}>
                                <DriveFileRenameOutlineOutlinedIcon fontSize="medium" color="success" />
                            </IconButton>
                        </div>

                        <div className="shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.2)] rounded-[12px] p-6 bg-white flex flex-col gap-10 flex-grow">

                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-[#036D3C] font-semibold text-lg">Habilidades</p>
                                    <IconButton onClick={openModalInterest}>
                                        <DriveFileRenameOutlineOutlinedIcon fontSize="medium" color="success" />
                                    </IconButton>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {
                                        (listSkills.length == 0 ?

                                            <div className="flex w-full items-center justify center">
                                                <p>Adicione novas skills e eles irão aparecer aqui</p>
                                            </div>

                                            : listSkills.map((item) => {
                                                return (
                                                    <span key={item.id} className="bg-[#036D3C] text-white px-5 py-2 rounded-full text-sm font-medium shadow-sm">
                                                        {item.name}
                                                    </span>
                                                )
                                            }))}
                                </div>
                            </div>
                            <div className="flex items-center flex-col gap-2 text-center mb-6">

                                {/* <p className="text-xl text-[#666666] font-semibold">Suport para rollout TI</p> */}
                            </div>
                            <div className="bg-[#036D3C] w-full h-[2px] mb-5" />
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <Image src={_email} alt="email" className="w-6 h-6 object-contain" />
                                    <p className="text-[#666666] text-xl">E-mail: {user ? user.email : ""}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Image src={fone} alt="telefone" className="w-6 h-6 object-contain" />
                                    <p className="text-[#666666] text-xl">{user?.phone ? user.phone : 'Adicione um telefone'}</p>
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
                                {user?.bio ? user.bio : "Adicione uma biografia"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {modal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white m-4 rounded-xl shadow-xl w-full max-w-lg p-8 relative">

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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-semibold">Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border-b border-gray-300 text-gray-600 focus:outline-none py-1 placeholder:text-gray-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-semibold">Telefone</label>
                                <input
                                    type="text"
                                    placeholder="(99) 99999-9999"
                                    className="w-full border-b border-gray-300 text-gray-600 focus:outline-none py-1 placeholder:text-gray-400"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-semibold">Biografia</label>
                                <textarea
                                    placeholder="Escreva sobre você"
                                    className="w-full border-b border-gray-300 text-gray-600 focus:outline-none py-1 placeholder:text-gray-400"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
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
                                onClick={saveChanges}
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 cursor-pointer"
                            >
                                Salvar
                            </button>
                        </div>

                        {/* modal adc interests */}
                        {/* modal para excluir */}


                    </div>
                </div>
            )}


            <Modal
                open={modalInterest}
                onClose={() => setModalInterest(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Adicione uma nova skill
                    </Typography>

                    <TextField />

                    <div className="flex items-center justify-center flex-row gap-3 mt-4">
                        <Button sx={{ width: 100, }} onClick={() => setModalInterest(false)} variant="contained" color="error">Cancelar</Button>
                        <Button sx={{ width: 100, }} onClick={() => addSkill()} variant="contained" color="primary">Adicionar</Button>
                    </div>
                </Box>
            </Modal>

        </>
    );
}

