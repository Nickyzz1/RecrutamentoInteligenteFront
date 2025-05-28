import BusinessIcon from '@mui/icons-material/Business';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button, IconButton } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { create } from 'domain';

interface Data {
    title : string,
    status : string,
    created: string,
    quantityCandidates: number
}

export const Card = ({title, status, created, quantityCandidates} : Data) => {
    return(
        <>
            <div className="flex bg-white flex-col border w-full transition-all duration-500 hover:shadow-[5px_5px_5px_0px_rgba(48,_160,_64,0.7)] hover:scale-101 border-gray-100 shadow p-4 rounded-2xl">
                {/* Titulo e localização */}
                <div className="flex">
                    <div className='my-2 w-full'>
                        <div className='flex items-center w-full justify-between'>
                            <h1 className='flex flex-wrap wrap-normal text-2xl'> {title}</h1>
                            <div className="bg-green-700 text-white rounded-full p-2 max-w-16 h-10 text-center">{status}</div>
                        </div>
                        <p className=''>Darede a núvem, Curitiba PR</p>
                    </div>
                </div>
                {/* Data e quantidade de candidatos */}
                <div className='flex gap-3'>
                    <DateRangeIcon/>
                    <p>Criada em {created}</p>
                    <div className='bg-blue-100 px-2 py-1 text-center rounded-full'>
                        <p>{quantityCandidates} candidatos</p>
                    </div>
                </div>
                {/* botão de ver candidatos */}
                <div className='flex my-4 justify-between items-center'>
                    {/* Btn de ver candidatos se  candidatos, senão modal de "Não há candidatos" */}
                    <Button variant='outlined' className='flex flex-row gap-3' sx={{borderColor: 'green',color: 'green', transition: 'all 0.3s ease', '&:active': {
                            backgroundColor: 'transparent',
                            borderColor: 'green',
                            color: 'green',
                            },
                        }}>

                        <PersonOutlineIcon/>

                        <h1>Ver candidatos</h1>

                    </Button>
                    {/* Botões de edição */}
                    <div className='flex gap-3'>
                        <IconButton>
                            <EditIcon/>
                        </IconButton>

                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </div>

            </div>        
        </>
    )
}
 