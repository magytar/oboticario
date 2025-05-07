"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

import "./styleproduto.css"

// Importações de imagens
import Logo from "../imgs/logo.png"
import Logomae from "../imgs/logomae.webp"
import Sacola from "../imgs/sacola.png"
import Perfume1 from "../imgs/perfume1.webp"
import Perfume2 from "../imgs/perfume2.webp"
import Perfume3 from "../imgs/perfume3.webp"
import Perfume4 from "../imgs/perfume4.webp"
import Perfume5 from "../imgs/perfume5.webp"
import Perfume6 from "../imgs/perfume6.webp"
import Perfume7 from "../imgs/perfume7.webp"
import Perfume8 from "../imgs/perfume8.webp"
import Perfume9 from "../imgs/perfume9.webp"
import Perfume10 from "../imgs/perfume10.webp"
import Perfume11 from "../imgs/perfume11.webp"
import Perfume12 from "../imgs/perfume12.webp"
import Perfume13 from "../imgs/perfume13.webp"
import Perfume14 from "../imgs/perfume14.webp"
import Perfume15 from "../imgs/perfume15.webp"
import Perfume16 from "../imgs/perfume16.webp"

export default function Produtos() {
    const [produtos, setProdutos] = useState([
        {
            id: 1,
            principalname: "LILY",
            name: 'Kit Presente Dia Das Mães (2 itens)',
            price: "439,80",
            descont: "148,90",
            img: Perfume1,
            descont2: "-70%"
        },
        {
            id: 2,
            principalname: "FLORATTA",
            name: 'Combo Blue: Desodorante Colônia 75ml + Creme Hidratante Desodorante',
            price: "212,80",
            descont: "63,40",
            img: Perfume2,
            descont2: "-70%"
        },
        {
            id: 3,
            principalname: "LILY",
            name: 'Kit Presente Dia Das Mães (2 itens)',
            price: "439,80",
            descont: "173,90",
            img: Perfume3,
            descont2: "-67%"
        },
        {
            id: 4,
            principalname: "FLORATTA",
            name: 'Red Passion Eau De Parfum 75ml',
            price: "199,90",
            descont: "49,99",
            img: Perfume4,
            descont2: "-75%"
        },
        {
            id: 5,
            principalname: "FLORATTA",
            name: 'Flores Secretas Desodorante Colônia 75ml',
            price: "119,90",
            descont: "39,99",
            img: Perfume5,
            descont2: "-65%"
        },
        {
            id: 6,
            principalname: "EGEO",
            name: 'Kit Presente Dia das Mães dolce (3 itens)',
            price: "179,90",
            descont: "49,99",
            img: Perfume6,
            descont2: "-73%"
        },
        {
            id: 7,
            principalname: "COFFEE",
            name: 'Kit Presente Dia das Mães Woman Seduction (3 itens)',
            price: "259,90",
            descont: "96,29",
            img: Perfume7,
            descont2: "-63%"
        },
        {
            id: 8,
            principalname: "HER",
            name: 'Eau De Parfum 50ml',
            price: "239,90",
            descont: "63,99",
            img: Perfume8,
            descont2: "-74%"
        },
        {
            id: 9,
            principalname: "FLORITTA",
            name: 'Combo Blue: Desodorante Colônia 75ml + Creme Hidratante Desodorante Corporal 200ml',
            price: "159,90",
            descont: "53,99",
            img: Perfume9,
            descont2: "-75%"
        },
        {
            id: 10,
            principalname: "Liz",
            name: 'Kit Presente Dia das Mães Sublime (2 itens)',
            price: "164,90",
            descont: "76,99",
            img: Perfume10,
            descont2: "-56%"
        },
        {
            id: 11,
            principalname: "O BOTICARIO",
            name: 'Combo Make B.: Máscara de Cílios 12g + Batom Líquido Vermelho 5ml',
            price: "109,90",
            descont: "69,90",
            img: Perfume11,
            descont2: "-50%"
        },
        {
            id: 12,
            principalname: "O BOTICARIO",
            name: 'Combo Make B.: Máscara de Cílios 12g + Batom Líquido Vermelho 5ml',
            price: "191,50",
            descont: "122,20",
            img: Perfume12,
            descont2: "-40%"
        },
        {
            id: 13,
            principalname: "MAKE B.",
            name: 'Combo Make B.: Máscara de Cílios 12g + Batom Líquido Rosa 5ml',
            price: "109,90",
            descont: "67,20",
            img: Perfume13,
            descont2: "-46%"
        },
        {
            id: 14,
            principalname: "Botik",
            name: 'Combo Ácido Hialurônico: Sérum Facial 30ml + Protetor Solar FPS 15 30ml',
            price: "189,90",
            descont: "123,24",
            img: Perfume14,
            descont2: "-46%"
        },
        {
            id: 15,
            principalname: "Celebre",
            name: 'Kit Presente Dia das Mães Celebre Sua Força (2 itens)',
            price: "119,90",
            descont: "73,24",
            img: Perfume15,
            descont2: "-43%"
        },
        {
            id: 16,
            principalname: "Nativa SPA",
            name: 'Combo Nativa SPA Morango Ruby: Body Splash 200ml + Loção Corporal 200ml',
            price: "129,90",
            descont: "83,24",
            img: Perfume16,
            descont2: "-47%"
        },
    ])
    
    // Estado para controlar a quantidade de itens no carrinho
    const [cartItemCount, setCartItemCount] = useState(0)
    
    // Carregar a contagem de itens no carrinho ao iniciar
    useEffect(() => {
        // Verificar se estamos no navegador antes de acessar localStorage
        if (typeof window !== 'undefined') {
            const cart = JSON.parse(localStorage.getItem('carrinho')) || []
            setCartItemCount(cart.length)
        }
    }, [])

    const calcularParcela = (valor) => {
        const valorNumerico = parseFloat(valor.replace(',', '.'));
        return (valorNumerico / 10).toFixed(2).replace('.', ',');
    }

    const adicionarAoCarrinho = (produto) => {
        // Criar uma cópia do produto para adicionar ao carrinho
        // (removendo a referência à imagem que não pode ser serializada)
        const produtoParaCarrinho = {
            id: produto.id,
            principalname: produto.principalname,
            name: produto.name,
            price: produto.price,
            descont: produto.descont,
            quantidade: 1
        }
        
        // Buscar o carrinho atual do localStorage ou criar um novo array vazio
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || []
        
        // Verificar se o produto já existe no carrinho
        const produtoExistente = carrinhoAtual.find(item => item.id === produtoParaCarrinho.id)
        
        let novoCarrinho
        
        if (produtoExistente) {
            // Se o produto já existe, aumentar a quantidade
            novoCarrinho = carrinhoAtual.map(item => 
                item.id === produtoParaCarrinho.id 
                    ? { ...item, quantidade: item.quantidade + 1 } 
                    : item
            )
        } else {
            // Se o produto não existe, adicionar ao carrinho
            novoCarrinho = [...carrinhoAtual, produtoParaCarrinho]
        }
        
        // Salvar o carrinho atualizado no localStorage
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
        
        // Atualizar a contagem de itens
        setCartItemCount(novoCarrinho.length)
        
        // Exibir mensagem para o usuário
        window.location.href = "/carrinho";

    }
    function irparasacola(){
        window.location.href = "/carrinho";
    }

    return (
        <div className="container">
            
            <header className="header">
                <div className="header-logo">
                    <Image src={Logo} alt="Logo" width={250} height={100} className="logo" />
                </div>
                
                <div className="sacola-container">
                    <Image src={Sacola} alt="Sacola de compras" width={40} height={40} className="sacola-icon" onClick={()=>irparasacola()}/>
                    {cartItemCount > 0 && (
                        <span className="cart-count">{cartItemCount}</span>
                    )}
                </div>
                
            </header>

            <main>
                <h1 className="titulo-secao">Promoção Dia das Mães</h1>
                
                <div className="produtos-grid">
                    {produtos.map((produto) => (
                        <article key={produto.id} className="produto-card">
                            <div className="produto-badge">{produto.descont2}</div>
                            
                            <div className="produto-imagem">
                                <Image 
                                    src={produto.img} 
                                    alt={produto.name} 
                                    width={200} 
                                    height={200} 
                                    className="produto-img" 
                                />
                            </div>
                            
                            <div className="produto-info">
                                <h2 className="produto-marca">{produto.principalname}</h2>
                                <p className="produto-nome">{produto.name}</p>
                                
                                <div className="produto-preco-container">
                                    <div className="produto-preco">
                                        <p className="preco-antigo">R$ {produto.price}</p>
                                        <p className="preco-atual">R$ {produto.descont}</p>
                                        <p className="preco-parcela">
                                            Em 10x de R$ {calcularParcela(produto.descont)}
                                        </p>
                                    </div>
                                    
                                    <button 
                                        className="btn-adicionar"
                                        onClick={() => adicionarAoCarrinho(produto)}
                                        aria-label="Adicionar ao carrinho"
                                    >
                                        <Image 
                                            src={Sacola} 
                                            alt="Adicionar ao carrinho" 
                                            width={20} 
                                            height={20} 
                                            className="btn-sacola-icon" 
                                        />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
            
            <footer className="footer">
                <p>© 2025 - Loja de Perfumes | Todos os direitos reservados</p>
            </footer>
        </div>
    )
}