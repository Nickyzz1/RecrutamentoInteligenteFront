import { GoBack } from "@/components/goBack/page";
import { HeaderLoggedAdmin } from "@/components/headerAdmin/page";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Candidate {
  name: string;
  created: string;
  status: string;
  idResume: number;
}

interface DataJSON {
  id: number,
  title: string;
  candidates: Candidate[];
}

const Data: DataJSON[] = [
  {
    id: 1,
    title: "Processo Seletivo - Desenvolvedor React",
    candidates: [
      {
        name: "João Silva",
        created: "2024-01-15",
        status: "Aprovado",
        idResume: 1,
      },
      {
        name: "Maria Souza",
        created: "2024-01-20",
        status: "Em análise",
        idResume: 2,
      },
      {
        name: "Maria Souza",
        created: "2024-01-20",
        status: "Em análise",
        idResume: 3,
      },
      {
        name: "Maria Souza",
        created: "2024-01-20",
        status: "Em análise",
        idResume: 4,
      },
      {
        name: "Maria Souza",
        created: "2024-01-20",
        status: "Em análise",
        idResume: 5,
      },
      {
        name: "Maria Souza",
        created: "2024-01-20",
        status: "Em análise",
        idResume: 6,
      },
      {
        name: "Maria Souza",
        created: "2024-01-20",
        status: "Em análise",
        idResume: 7,
      },
    ],
  },
  {
    id: 2,
    title: "Processo Seletivo - Designer",
    candidates: [
      {
        name: "Ana Lima",
        created: "2024-02-10",
        status: "Reprovado",
        idResume: 1,
      },
      {
        name: "Carlos Santos",
        created: "2024-02-12",
        status: "Dinâmica",
        idResume: 2,
      },
    ],
  },
];


export default function Page({ params }: { params: { id: string } }) {
  
  const id = Number(params.id);
  const processo = Data.find(p => p.id === id)


  if (!processo) {
    return <div>Processo seletivo não encontrado</div>;
  }
  return (
    <>
      <HeaderLoggedAdmin />
      <div className="flex flex-col p-6">
        <GoBack />
          <div className="bg-white rounded-xl mt-9 border border-zinc-400 p-4">
            <h2 className="text-2xl text-green-700 mb-4">{processo.title}</h2>

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
                  {processo.candidates.map((candidate) => (
                    <TableRow
                      key={candidate.idResume}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {candidate.name}
                      </TableCell>
                      <TableCell>{candidate.created}</TableCell>
                      <TableCell>{candidate.status}</TableCell>
                      <TableCell>
                        <button className="text-green-600 hover:underline">Ver</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
      </div>
    </>
  );
};

