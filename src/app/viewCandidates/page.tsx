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
  id: number;
}

interface DataJSON {
  title: string;
  candidates: Candidate[];
}

const Data: DataJSON[] = [
  {
    title: "Processo Seletivo - Desenvolvedor",
    candidates: [
      {
        name: "João Silva",
        created: "2024-01-15",
        status: "Aprovado",
        id: 1,
      },
      {
        name: "Maria Souza",
        created: "2024-01-20",
        status: "Em análise",
        id: 2,
      },
    ],
  },
  {
    title: "Processo Seletivo - Designer",
    candidates: [
      {
        name: "Ana Lima",
        created: "2024-02-10",
        status: "Reprovado",
        id: 3,
      },
      {
        name: "Carlos Santos",
        created: "2024-02-12",
        status: "Dinâmica",
        id: 4,
      },
    ],
  },
];

const ViewCandidates = () => {
  return (
    <>
      <HeaderLoggedAdmin />

      <div className="flex flex-col bg-[#F9FAFB] p-6 space-y-12">
        <GoBack />

        {Data.map((processo, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-zinc-400 p-4">
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
                      key={candidate.id}
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
        ))}
      </div>
    </>
  );
};

export default ViewCandidates;
