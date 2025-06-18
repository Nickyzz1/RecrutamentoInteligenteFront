"use client"

import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useState } from "react"; 
import { ROUTES } from "@/constants/routes";
import { useParams, useRouter } from "next/navigation";

// enum de status
enum EApplicationStatus {
  ANALISE = 0,
  APROVADO = 1,
  REPROVADO = 2,
  DINAMICA = 3,
  ENTREVISTA = 4,
}

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
  status: number;
}[];

// mock inicial
const mockData: DataJSON = [
  {
    id: 1,
    created: "2022-02-20",
    dismissalStage: {
      id: 1,
      description: "a",
      startDate: "2022-02-20",
      endDate: "2022-03-20",
    },
    candidate: {
      id: 1,
      name: "Sabrina Mortean Loures de Souza",
      email: "sabrina.souza.2754@email.com",
      phone: "41 99999-9999",
    },
    status: EApplicationStatus.ANALISE,
  },
  {
    id: 2,
    created: "2022-02-20",
    dismissalStage: {
      id: 2,
      description: "a",
      startDate: "2022-02-20",
      endDate: "2022-03-20",
    },
    candidate: {
      id: 2,
      name: "Nicolle Silva",
      email: "joao@email.com",
      phone: "41 99999-9999",
    },
    status: EApplicationStatus.ANALISE,
  },
];

// { [key: number]: string } diz que esse objeto tem chaves numéricas e valores do
const statusOptions: { [key: number]: string } = {
  [EApplicationStatus.ANALISE]: "Em análise",
  [EApplicationStatus.APROVADO]: "Aprovado",
  [EApplicationStatus.REPROVADO]: "Reprovado",
  [EApplicationStatus.DINAMICA]: "Dinâmica",
  [EApplicationStatus.ENTREVISTA]: "Entrevista",
};

interface IParams { 
  id : string
}

const router = useRouter();
const VacancyTb = async ({id} : IParams) =>{

  const viewResume = (userId : string) => {
    // fazer requisição para ver o currículo com o id da vaga e o id do candidato
    router.push(`${ROUTES.resumeCandidate}/${userId}`)
  }
    
  const [data, setData] = useState<DataJSON>(mockData);

  // atualiza o status do candidato com base no ID
  const handleChange = (event: SelectChangeEvent<number>, id: number) => {
  const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: event.target.value as number } : item
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
                {data.map((item) => (
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
                          {Object.entries(statusOptions).map(([key, label]) => (
                            <MenuItem key={key} value={Number(key)}>
                              {label}
                            </MenuItem>
                          ))}
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