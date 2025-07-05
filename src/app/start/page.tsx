import {HeaderNotLogged} from "@/components/header/page";

export default function Home() {
  return (
    <>
      <HeaderNotLogged/>
      <div className="flex flex-col min-h-screen w-screen bg-[#F9FAFB] md:p-10 p-5">

          <div className="flex flex-col items-center w-full gap-2">
            <div className="flex flex-col md:flex-row gap-2 justify-center items-center w-full">
              <h1 className="text-[#F5991D] font-semibold text-xl">Encontre sua próxima</h1>
              <h1 className="text-[#036D3C] font-bold text-2xl">Oportunidade</h1>
            </div>

            <div className="flex items-center justify-center w-full">
              <h2 className="text-sm w-full self-center text-center text-gray-500">Explore novas vagas disponíveis e dê o próximo passo na sua carreira profissional</h2>
            </div>
          </div>

      </div>
    </>
  );
}
