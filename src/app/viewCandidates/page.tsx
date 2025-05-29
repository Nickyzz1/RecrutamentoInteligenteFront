// prova PA 2
import { GoBack } from "@/components/goBack/page"
import { HeaderLogged } from "@/components/header2/page"

enum Status{
    ANALISE = 'Análise',
    DINÂMICA = 'Dinâmica',
    ENTREVISTA = 'Entrevistas',
    REPROVADO = 'Reprovado',
    APROVADO = 'Aprovado'
}

type Data = {
    title : string,
    candidates :[{
        name: string,
        created: string,
        status: string,
        idResume: number
    }]
}

export const ViewCandidates = ({title, candidates} : Data) => {
    return(
        <>
            <HeaderLogged/>
            <div className="flex  bg-[#F9FAFB]">
                <GoBack/>

                <div className="flex bg-white border border-zinc-400 items-center justify-center">
                <h1 className="text-2xl text-green-700">Cadidaturas para: {title}</h1>
                    <div className="flex bg-white border border-zinc-400 items-center justify-center">
                        <div className="flex bg-gray-400 justify-between border border-zinc-400">
                            <h2 className="text-zinc-800">Candidato</h2>
                            <h2 className="text-zinc-800">Data da candidatura</h2>
                            <h2 className="text-zinc-800">Status</h2>
                            <h2 className="text-zinc-800">Ações</h2>
                        </div>
                        {candidates.map((e, index)=> {
                            return(
                                <>
                                    <div key={index} className="bg-white ">
                                        
                                    </div>
                                </>
                            )
                        })}
                        <div>

                        </div>
                    </div>
                </div >

            </div>
        </>
    )
}