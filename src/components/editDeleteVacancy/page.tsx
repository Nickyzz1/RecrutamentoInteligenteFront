"use client"

import { Box, Button, IconButton, Modal, Typography } from "@mui/material"

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { APIURL } from "@/constants/api";


interface Isla {
    id: string
}

const EditDelete = ({id} : Isla) => 
{
    const router = useRouter()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    const handleRemove = () => {
        setIsDeleteModalOpen(false);

        fetch(`${APIURL}/vacancy/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Erro na requisição: ${res.statusText}`);
                router.push(ROUTES.homeAdmin)
            }
            return res.json()
            router.push(ROUTES.homeAdmin)
        })
        .then((data) => {
            console.log(data.message);
            console.log(data.value)
            router.push(ROUTES.homeAdmin)
        })
        .catch((err) => {
            console.error(err);
        });
      
        console.log("Vaga excluída");
    }

    return(
        <>
            <div className="flex gap-3">
                <IconButton  onClick={() => router.push(`/editVacancy/${id}`)} color='success'>
                    <BorderColorOutlinedIcon />
                </IconButton>

                <IconButton onClick={() => setIsDeleteModalOpen(true)} color='success'>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </div>

            <Modal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Deseja mesmo excluir essa vaga?
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Ao excluir a vaga todos os dados serão perdidos, incluindo as candidaturas.
                    </Typography>

                    <div className="flex items-center justify-center flex-row gap-3 mt-4">
                        <Button onClick={() => router.push(ROUTES.homeAdmin)} variant="contained" color="error">Excluir</Button>
                        <Button onClick={() => setIsDeleteModalOpen(false)} variant="contained" color="primary">Cancelar</Button>
                    </div>
                </Box>
            </Modal>

        </>
    )
}

export default EditDelete;
