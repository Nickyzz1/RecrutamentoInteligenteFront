"use client"

import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"; 
import { ROUTES } from "@/constants/routes";
import { useParams, useRouter } from "next/navigation";
import { EApplicationStatus } from "@/constants/enums";
import { APIURL } from "@/constants/api";

// enum de status
interface Candidate {
  id: number;
  email: string;
  name: string;
  phone: string | null;
}

type DataJSON = {
  id: number;
  candidate: Candidate;
  created: string;
  dismissalStage: {
    id: number;
    description: string;
    startDate: string;
    endDate: string;
  } | null;
  status: EApplicationStatus;
}[];

// { [key: number]: string } diz que esse objeto tem chaves numéricas e valores do
const statusOptions: { [key: string]: string } = {
  [EApplicationStatus.ANALISE]: "Em análise",
  [EApplicationStatus.APROVADO]: "Aprovado",
  [EApplicationStatus.REPROVADO]: "Reprovado",
  [EApplicationStatus.DINAMICA]: "Dinâmica",
  [EApplicationStatus.ENTREVISTA]: "Entrevista",
};

interface IParams { 
  id : string
}

const VacancyTb = ({id} : IParams) => {

  const router = useRouter();

  useEffect(() => {
    fetch(`${APIURL}/vacancy/applications/${id}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message)
      setData(data.value)
    })
  }, [])

  const viewResume = (userId : string) => {
    // ----- fazer requisição para ver o currículo com o id da vaga e o id do candidato
    router.push(`${ROUTES.resumeCandidate}/${userId}`)
  }
    
  const [data, setData] = useState<DataJSON | null>(null);

  // ----- atualiza o status do candidato com base no ID
  const handleChange = (event: SelectChangeEvent<string>, id: number) => {
    if(data == null) return
    fetch(`${APIURL}/application/status/${id}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("AUTH")}`
        },
        body: JSON.stringify({
          status: event.target.value as EApplicationStatus
        })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message)
      console.log(data.value)
    })
    const updatedData = data.map((item) => {
      return item.id === id ? { ...item, status: event.target.value as EApplicationStatus } : item
    }
    );
    setData(updatedData);
  };

    return(
        <>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Tabela de candidatos">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Data da candidatura</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data ? data : []).map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      ":hover": {
                        backgroundColor: "#f0f0f0",
                        transition: "background-color 130ms ease-in",
                      },
                    }}
                  >
                    <TableCell>{item.candidate.name}</TableCell>
                    <TableCell>{item.created}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel id={`status-label-${item.id}`}>Status</InputLabel>
                        <Select
                          labelId={`status-label-${item.id}`}
                          value={item.status}
                          label="Status"
                          onChange={(e) => handleChange(e, item.id)}
                        >
                          <MenuItem value={EApplicationStatus.ANALISE}>Em análise</MenuItem>
                          <MenuItem value={EApplicationStatus.APROVADO}>Aprovado</MenuItem>
                          <MenuItem value={EApplicationStatus.REPROVADO}>Reprovado</MenuItem>
                          <MenuItem value={EApplicationStatus.DINAMICA}>Dinâmica</MenuItem>
                          <MenuItem value={EApplicationStatus.ENTREVISTA}>Entrevista</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                    {/* onClick={() => router.push(`/vacancydetails/${vacancy.id}`)} */}
                    <Button
                      onClick={() => viewResume(item.id.toString()) }
                        variant="outlined"                      
                        sx={{
                          borderColor: 'green',
                          color: 'green',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 128, 0, 0.1)', // verde clarinho no fundo ao hover
                            borderColor: 'green',
                            color: 'green',
                            transition: 'all 0.3s ease',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                      Ver
                    </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    )
}

export default VacancyTb