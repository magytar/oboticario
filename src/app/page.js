'use client'
import "./globals.css"
import Image from "next/image";
import Logo from "./imgs/logo.png"
import Logo_perfumes from "./imgs/perfume1.png"
import { useState } from "react";
import { useRouter } from 'next/router';


export default function Home() {

  const [selected, setSelected] = useState("Minha Mãe");

  const [page, setpage] = useState(1)

  const [modal, setModal] = useState(false)


  function Render(){
    return (
      <div className="desafio">
        <div className="desafio-box">
          <h1>PROMOÇÃO</h1>
          <h2>DIA DAS MÃES</h2>
          <Image src={Logo_perfumes} alt="Logo" width='300' className="perfume1"/>
          <p>Participe de uma pesquisa nossa rapida para ver se voce tem direito a promoção</p>
          <button onClick={()=> setpage(2)}>PARTICIPAR</button>
        </div>
      </div>
    )
  }

  function irparaprodutos(){
    window.location.href = "/produtos";
  }

  function Render2(){
    return (
      <div className="desafio">
        <div className="desafio-box">
          <h1>PESQUISA</h1>
          <h1 className="text-xl font-bold mb-2">Para Quem Seria Este Presente:</h1>

      <label className="block mb-2">
        <input
          type="radio"
          name="opcao"
          value="Minha Mãe"
          checked={selected === "Minha Mãe"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <span className="ml-2"> Para Minha Mãe</span>
      </label>

      <label className="block mb-2">
        <input
          type="radio"
          name="opcao"
          value="Para Mim"
          checked={selected === "Para Mim"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <span className="ml-2"> Para Mim Mesmo</span>
      </label>

      <label className="block mb-2">
        <input
          type="radio"
          name="opcao"
          value="Alguém da Familia"
          checked={selected === "Alguém da Familia"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <span className="ml-2"> Alguém da Familia</span>
      </label>

      <label className="block mb-2">
        <input
          type="radio"
          name="opcao"
          value="Outros"
          checked={selected === "Outros"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <span className="ml-2"> Outros</span>
      </label>

      <p className="mt-4">Você escolheu: {selected}</p>
          <button onClick={()=> irparaprodutos()}>Pegar Minha Promoção</button>
        </div>
      </div>
    )
  }

  return (
    <div className="tela">
      <div className="header-logo">
        <Image src={Logo} alt="Logo" width='250' className="logo"/>
      </div>
      {page == 1 && Render()}
      {page == 2 && Render2()}
      <footer>
        <p>Pesquisa Oboticario 2025</p>
      </footer>
    </div>
  );
}
