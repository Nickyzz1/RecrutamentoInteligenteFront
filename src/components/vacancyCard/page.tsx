import BusinessIcon from '@mui/icons-material/Business';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button } from '@mui/material';
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
            <div className="flex flex-col">
                <div className="flex">
                    <div>
                        <h1>{title}</h1>
                        <p>Darede a núvem, Curitiba PR</p>
                    </div>
                    <div className="bg-green-700 text-white rounded-full w-auto max-w-16">{status}</div>
                </div>
                <DateRangeIcon/>
                <div className='flex'>
                    <p>Criada em {created}</p>
                    <div className='bg-blue-300 border-blue-900 rounded-full p-2'>
                        <p>{quantityCandidates} candidatos</p>
                    </div>
                </div>
                <div className='flex'>
                    {/* se tiver candidatos */}
                    <Button className='flex flex-row gap-3'>
                        <PersonOutlineIcon />
                        <h1>Ver candidatos</h1>
                    </Button>
                    <EditIcon/>
                    <DeleteIcon/>
                </div>
            </div>        
        </>
    )
}
