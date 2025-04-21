import React from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Sparkles, Smartphone, Brush, Settings } from "lucide-react";

export default function Home() {  
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Apresente seu negócio com um toque
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Cartões e tags NFC para compartilhar links, redes sociais e contatos instantaneamente.
        </p>
        <button className="text-lg px-6 py-3 rounded-2xl shadow-lg">
          Quero garantir minha tag
        </button>

        {/* Imagem do produto */}
        <div className="mt-12 flex justify-center">
          <img
            src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiYWR5ZW5cL2ZpbGVcL3RaVFJqVmhvcnR2aktXYXBOemZ5LnN2ZyJ9:adyen:HKlcREU6s0h65uoh0HgJqhe7fRTvQKyCppFPlqwtR-I?format=png"
            alt="Demonstração da tag NFC com celular"
            width={500}
            height={300}
            className="rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12">Por que usar nossas tags NFC?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[ 
            {
              icon: <Settings className="h-8 w-8 text-blue-500 mb-2 mx-auto" />, 
              title: "Atualizável",
              desc: "Mude seu link quando quiser sem trocar de tag."
            },
            {
              icon: <Sparkles className="h-8 w-8 text-green-500 mb-2 mx-auto" />,
              title: "Profissional",
              desc: "Impressione seus clientes com tecnologia moderna."
            },
            {
              icon: <Smartphone className="h-8 w-8 text-purple-500 mb-2 mx-auto" />,
              title: "Compatível",
              desc: "Funciona com celulares Android e iPhone."
            },
            {
              icon: <Brush className="h-8 w-8 text-pink-500 mb-2 mx-auto" />,
              title: "Personalizável",
              desc: "Design exclusivo para sua marca ou estilo."
            }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow-md text-center">
              {item.icon}
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-12">Ideal para</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {["Autônomos", "Salões de beleza e barbearias", "Lojas e comércios", "Criadores de conteúdo"].map((nicho, i) => (
            <div key={i} className="bg-white px-6 py-4 rounded-xl shadow text-lg">
              {nicho}
            </div>
          ))}
        </div>
      </section>

      {/* Formulário de lead */}
      <section className="py-20 px-4 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Garanta acesso antecipado com desconto</h2>
        <p className="mb-6">Cadastre-se para participar da pré-venda exclusiva.</p>
        <form className="max-w-md mx-auto grid gap-4">
          <input type="text" placeholder="Nome" required />
          <input type="email" placeholder="E-mail" required />
          <input type="text" placeholder="Profissão ou Segmento (opcional)" />
          <button type="submit" className="text-lg py-3 rounded-xl shadow">
            Participar da pré-venda
          </button>
        </form>
      </section>

      {/* Rodapé */}
      <footer className="text-center py-8 text-sm text-gray-500 bg-gray-50">
        © 2025 SuaMarca. Produto em pré-venda. Todos os direitos reservados.
      </footer>
    </div>
  );
}
