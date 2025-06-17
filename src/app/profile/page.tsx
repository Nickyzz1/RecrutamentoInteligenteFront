'use client'
import Image from "next/image";

import { HeaderLogged } from "@/components/headerUser/page";
import editar from "@/assets/editar.png"
import sair from "@/assets/sair.png"
import email from "@/assets/emailgreen.png"
import fone from "@/assets/phonegreen.png"
import chapeu from "@/assets/chapeu.png"
import pessoa from "@/assets/profile.png"

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useState } from "react";


export default function Start() {

    const [modal, setModal] = useState(false);
    const [bio, setBio] = useState<string>("");


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
                            <Image src={sair} alt="sair" className="w-8 h-8" />
                            <button onClick={() => openModal()} className="cursor-pointer">
                                <Image src={editar} alt="editar" className="w-8 h-8" />
                            </button>
                        </div>
                        <div className="flex justify-center my-8">
                            <div className="p-3 rounded-full shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.2)]">
                                <Image src={pessoa} alt="foto" className="rounded-full w-48 h-48 object-cover" />
                            </div>
                        </div>
                        <div className="flex items-center flex-col gap-2 text-center mb-6">
                            <p className="text-3xl font-bold text-[#036D3C]">Adriana Alves</p>
                            <p className="text-xl text-[#666666] font-semibold">Suport para rollout TI</p>
                        </div>
                        <div className="bg-[#036D3C] w-full h-[2px] mb-5" />
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Image src={email} alt="email" className="w-6 h-6 object-contain" />
                                <p className="text-[#666666] text-xl">E-mail: adriana@gmail.com</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image src={fone} alt="telefone" className="w-6 h-6 object-contain" />
                                <p className="text-[#666666] text-xl">Tel: 41 9 9090-9090</p>
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
                            <p className="text-[#036D3C] font-bold text-xl">Editar currículo</p>
                            <Image src={editar} alt="editar" className="w-6 h-6 object-contain" />
                        </div>

                        <div className="shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.2)] rounded-[12px] p-6 bg-white flex flex-col gap-10 flex-grow">
                            
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-[#036D3C] font-bold text-lg">Interesses</p>
                                    <Image src={editar} alt="editar" className="w-6 h-6 object-contain" />
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {["Liderança", "Comunicação", "TI", "Automação", "Gerencia"].map((item, index) => (
                                        <span key={index} className="bg-[#036D3C] text-white px-5 py-2 rounded-full text-sm font-medium shadow-sm">
                                            {item}
                                        </span>
                                    ))}
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
            </div>

              <div className={modal ? "fixed inset-0 flex items-center justify-center  bg-black/50 z-50" : "disabled z-0 fixed opacity-0"}>
                <div className="bg-white dark:bg-slate-100 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col" >
                    <div className="p-2 flex flex-col w-96 z-50">
                        <h2 className="text-xl font-semibold">New Chat</h2>
                        <form className="flex flex-col">
                            <label htmlFor="" className="mt-8">Name</label>
                            <input type="text" placeholder="Chat name" className="text-gray-800 border-gray-800 border rounded-[5px] p-1 mt-1 text-[13px]" value={bio} onChange={(e) => { setBio(e.target.value) }} ></input>
                        </form>
                        <div className="flex justify-between mt-10">
                            <button onClick={() => closeModal()} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancel</button>
                            <button onClick={() => closeModal()} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
