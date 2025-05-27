import Image from "next/image";

// imports internos
import { HeaderLogged } from "@/components/header2/page";
import { Card } from "@/components/card/page";
import lupa from "@/assets/lupa.png"

export default function Start() {
    return (
        <div className="flex max-w-screen overflow-hidden flex-col items-center justify-center bg-[#F9FAFB]">
            <HeaderLogged />
            <div className="flex  items-center justify-center w-full md:p-15 p-5">

                <div className="flex flex-col items-center w-full gap-2">

                    <div className="flex justify-center text-center gap-1.5 w-full">
                        <h1 className="text-[#036D3C] font-bold sm:text-2xl">Encontre sua</h1>
                        <h1 className="text-[#F5991D] font-bold sm:text-2xl">próxima oportunidade</h1>
                    </div>

                    <h2 className="text-md  text-center text-[#909192]">Explore novas vagas disponíveis e dê o próximo passo na sua carreira profissional</h2>

                    <div className="bg-[#F1F2F3] flex rounded-4xl p-3 mt-6 gap-6 w-full">
                        <button className="cursor-pointer">
                            <Image src={lupa} alt="lupa" className="w-6"></Image>
                        </button>
                        <input type="text" className="text-md placeholder:text-[#909192] outline-hidden" placeholder="Pesquise por cargo"></input>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 flex-wrap gap-10 justify-center py-6">
                        <Card skills={["Comunicação", "Liderança", "Comunicação com equipes"]} date={new Date()} title={"Desenvolvedor React senior"} status={"Ativa"} adress={"Curitiba, PR"} description={"Estamos buscando um desenvolvedor React experiente para se juntar ao nosso time de tecnologia. Você trabalhará em projetos legais."}></Card>
                        <Card skills={["Comunicação", "Liderança", "Iniciativa", "Cooperatividade"]} date={new Date()} title={"Desenvolvedor React senior"} status={"Ativa"} adress={"Curitiba, PR"} description={"Estamos buscando um desenvolvedor React experiente para se juntar ao nosso time de tecnologia. Você trabalhará em projetos legais."}></Card>
                        <Card skills={["Comunicação", "Liderança", "Comunicação com equipes"]} date={new Date()} title={"Desenvolvedor React senior"} status={"Ativa"} adress={"Curitiba, PR"} description={"Estamos buscando um desenvolvedor React experiente para se juntar ao nosso time de tecnologia. Você trabalhará em projetos legais."}></Card>
                        <Card skills={["Comunicação", "Liderança", "Iniciativa", "Cooperatividade"]} date={new Date()} title={"Desenvolvedor React senior"} status={"Ativa"} adress={"Curitiba, PR"} description={"Estamos buscando um desenvolvedor React experiente para se juntar ao nosso time de tecnologia. Você trabalhará em projetos legais."}></Card>
                        <Card skills={["Comunicação", "Liderança", "Iniciativa"]} date={new Date()} title={"Desenvolvedor React senior"} status={"Ativa"} adress={"Curitiba, PR"} description={"Estamos buscando um desenvolvedor React experiente para se juntar ao nosso time de tecnologia. Você trabalhará em projetos legais."}></Card>
                        <Card skills={["Comunicação", "Liderança", "Iniciativa", "Cooperatividade"]} date={new Date()} title={"Desenvolvedor React senior"} status={"Ativa"} adress={"Curitiba, PR"} description={"Estamos buscando um desenvolvedor React experiente para se juntar ao nosso time de tecnologia. Você trabalhará em projetos legais."}></Card>
                    </div>
                </div>

            </div>
        </div>
    );
}
