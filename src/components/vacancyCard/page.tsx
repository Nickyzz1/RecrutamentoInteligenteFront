import BusinessIcon from '@mui/icons-material/Business';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button, IconButton } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { create } from 'domain';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

interface Data {
    title : string,
    status : string,
    created: string,
    quantityCandidates: number
}

export const Card = ({title, status, created, quantityCandidates} : Data) => {
    
    const router = useRouter(); // ✅ Hook do Next para redirecionamento

    const handle = () => {

        router.push(ROUTES.viewCandidates); // ✅ Redireciona corretamente
    
    };

    return(
        <>
            <div className="flex  bg-white flex-col border w-full transition-all duration-500 hover:shadow-[5px_5px_5px_0px_rgba(48,_160,_64,0.7)] hover:scale-101 border-gray-100 shadow gap-3 p-6 rounded-2xl">
                {/* Titulo e localização */}
                <div className="flex">
                    <div className='w-full flex flex-col gap-1'>
                        <div className='flex items-center w-full justify-between gap-3 '>
                            <h1 className='flex flex-wrap wrap-normal text-xl font-semibold'>{title}</h1>
                            <div className="bg-green-700 px-3 text-white rounded-full p-2 max-w-16 h-10 text-center">{status}</div>
                        </div>
                        <p className='text-gray-500'>Darede a núvem, Curitiba PR</p>
                    </div>
                </div>
                {/* Data e quantidade de candidatos */}
                <div className='flex gap-3 items-center justify-between'>
                    <div className='flex gap-1'>
                        <DateRangeIcon sx={{color: '#757575'}}/>
                        <p className='text-gray-500'>Criada em {created}</p>
                    </div>
                    <div className='bg-emerald-100 px-2 py-1 text-center rounded-full'>
                        <p className='text-emerald-700'>{quantityCandidates} candidatos</p>
                    </div>
                </div>
                {/* botão de ver candidatos */}
                <div className='flex justify-between items-center'>
                    {/* Btn de ver candidatos se  candidatos, senão modal de "Não há candidatos" */}
                    <Button variant='outlined' onClick={() => handle()} className='flex flex-row gap-3' sx={{borderColor: '#008236',color: '#008236', transition: 'all 0.3s ease', '&:active': {
                            backgroundColor: 'transparent',
                            borderColor: '#008236',
                            color: '#008236',
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
 