// pages/carrinho.js
'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
// Import your product images
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

import styles from './Carrinho.module.css';

export default function Carrinho() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [endereco, setEndereco] = useState({
    cep: '',
    rua: '',
    bairro: '',
    numero: '',
    cidade: '',
    estado: ''
  });
  const [enderecoPreenchido, setEnderecoPreenchido] = useState(false);
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [erroCep, setErroCep] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: 'Produto Teste',
    price: 100,
    quantity: itensCarrinho.length,
    description: 'Oboticario E Voce'
  });

  const handleSubmit = async (e) => {

    try {
      // Chamar a API selecionada
      const response = await fetch("./api", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Perfumes Promo 2025 Mães',
          price: total,
          quantity: 1,
          description: 'Oboticario E Voce'
        }),
      });

      const data = await response.json();
      
      console.log('Resposta da API:', data);
      
      // Salvar a resposta para debug

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Erro ao processar pagamento');
      }

      // Se estamos em modo debug, não redireciona
      // Ver se temos qualquer URL de checkout disponível
      const checkoutUrl = data.checkout_url || data.sandbox_url;
      
      if (!checkoutUrl) {
        console.error('Detalhes da resposta da API sem URL de checkout:', data);
        throw new Error('URL de checkout não disponível. Verifique o console para mais detalhes.');
      }

      console.log('Redirecionando para:', checkoutUrl);
      
      // Redirecionar para o checkout do Mercado Pago
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError(err.message || 'Ocorreu um erro ao processar a requisição');
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar itens do carrinho do localStorage quando a página carrega
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
      
      // Converter preços de string para número para cálculos
      const itensProcessados = carrinhoSalvo.map(item => ({
        ...item,
        id: item.id,
        nome: `${item.principalname} - ${item.name}`,
        preco: parseFloat(item.descont.replace(',', '.')),
        quantidade: item.quantidade || 1
      }));
      
      setItensCarrinho(itensProcessados);
      calcularTotal(itensProcessados);
    }
  }, []);

  // Calcula o total do carrinho
  const calcularTotal = (itens) => {
    const novoTotal = itens.reduce((soma, item) => 
      soma + (item.preco * item.quantidade), 0);
    setTotal(novoTotal);
  };

  // Atualiza a quantidade de um produto no carrinho
  const atualizarQuantidade = (id, novaQuantidade) => {
    // Não permitir quantidades menores que 1
    if (novaQuantidade < 1) return;
    
    const itensAtualizados = itensCarrinho.map(item => 
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    );
    
    setItensCarrinho(itensAtualizados);
    calcularTotal(itensAtualizados);
    
    // Atualizar no localStorage
    const itensParaStorage = itensAtualizados.map(item => ({
      id: item.id,
      principalname: item.principalname,
      name: item.name,
      price: typeof item.price === 'string' ? item.price : item.price.toString(),
      descont: typeof item.descont === 'string' ? item.descont : item.descont.toFixed(2).replace('.', ','),
      quantidade: item.quantidade
    }));
    
    localStorage.setItem('carrinho', JSON.stringify(itensParaStorage));
  };

  // Remove um item do carrinho
  const removerItem = (id) => {
    const itensAtualizados = itensCarrinho.filter(item => item.id !== id);
    setItensCarrinho(itensAtualizados);
    calcularTotal(itensAtualizados);
    
    // Atualizar no localStorage
    localStorage.setItem('carrinho', JSON.stringify(itensAtualizados));
  };

  // Busca o endereço pelo CEP usando a API ViaCEP
  const buscarCep = async (cep) => {
    // Limpa o erro anterior se houver
    setErroCep('');
    
    // Remove caracteres não numéricos do CEP
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Verifica se o CEP tem 8 dígitos
    if (cepLimpo.length !== 8) {
      return;
    }
    
    try {
      setCarregandoCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setErroCep('CEP não encontrado.');
        return;
      }
      
      setEndereco(prev => ({
        ...prev,
        cep: cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2'), // Formata CEP como 00000-000
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || ''
      }));
    } catch (error) {
      setErroCep('Erro ao buscar o CEP. Tente novamente.');
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setCarregandoCep(false);
    }
  };

  // Atualiza os valores do endereço
  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setEndereco(prev => ({ ...prev, [name]: value }));
    
    // Se o campo for o CEP e tiver 8 dígitos, busca o endereço
    if (name === 'cep') {
      const cepLimpo = value.replace(/\D/g, '');
      if (cepLimpo.length === 8) {
        buscarCep(cepLimpo);
      }
    }
  };

  // Formata o CEP enquanto o usuário digita (00000-000)
  const formatarCep = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, ''); // Remove tudo que não for número
    value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2'); // Adiciona o hífen
    setEndereco(prev => ({ ...prev, cep: value }));
  };

  // Verifica se todos os campos de endereço estão preenchidos
  useEffect(() => {
    const todosPreenchidos = Object.values(endereco).every(valor => valor.trim() !== '');
    setEnderecoPreenchido(todosPreenchidos);
  }, [endereco]);

  // Finalizar a compra (exemplo simples)
  const finalizarCompra = () => {
    if (!enderecoPreenchido) {
      alert('Por favor, preencha todos os campos de endereço.');
      return;
    }
    
    alert(`Compra finalizada! 
    Total: R$ ${total.toFixed(2).replace('.', ',')}
    Entrega para: ${endereco.rua}, ${endereco.numero}, ${endereco.bairro}
    ${endereco.cidade}/${endereco.estado} - CEP ${endereco.cep}`);
    
    // Limpar o carrinho após a compra
    setItensCarrinho([]);
    setTotal(0);
    localStorage.removeItem('carrinho');
    
    // Limpar o endereço
    setEndereco({
      cep: '',
      rua: '',
      bairro: '',
      numero: '',
      cidade: '',
      estado: ''
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Carrinho de Compras</title>
        <meta name="description" content="Carrinho de compras da sua loja" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <span>Oboticario</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/">Início</Link>
          <Link href="/produtos">Produtos</Link>
          <Link href="/carrinho">
            <span className={styles.carrinhoIcone}>
              Carrinho ({itensCarrinho.length})
            </span>
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <h1 className={styles.titulo}>Meu Carrinho</h1>
        
        {itensCarrinho.length === 0 ? (
          <div className={styles.carrinhoVazio}>
            <p>Seu carrinho está vazio.</p>
            <Link href="/produtos">
              <button className={styles.botaoContinuar}>Continuar comprando</button>
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.itensContainer}>
              <div className={styles.cabecalho}>
                <span className={styles.colunaProduto}>Produto</span>
                <span className={styles.colunaPreco}>Preço</span>
                <span className={styles.colunaQuantidade}>Quantidade</span>
                <span className={styles.colunaSubtotal}>Subtotal</span>
                <span className={styles.colunaAcoes}>Ações</span>
              </div>

              {itensCarrinho.map((item) => (
                <div key={item.id} className={styles.itemCarrinho}>
                  <div className={styles.colunaProduto}>
                    <div className={styles.produtoInfo}>
                      <div className={styles.imagemContainer}>
                        {/* Use a proper conditional rendering for images */}
                        {item.id === 1 ? (
                          <Image src={Perfume1} alt={item.nome} className={styles.imga} />
                        ) : item.id === 2 ? (
                          <Image src={Perfume2} alt={item.nome} className={styles.imga} />
                        ) : item.id === 3 ? (
                            <Image src={Perfume3} alt={item.nome}className={styles.imga} />
                        ) : item.id === 4 ? (
                            <Image src={Perfume4} alt={item.nome} className={styles.imga} />
                          ):item.id === 5 ? (
                            <Image src={Perfume5} alt={item.nome} className={styles.imga} />
                          ):item.id === 6 ? (
                            <Image src={Perfume6} alt={item.nome} className={styles.imga} />
                          ):item.id === 7 ? (
                            <Image src={Perfume7} alt={item.nome} className={styles.imga} />
                          ):item.id === 8 ? (
                            <Image src={Perfume8} alt={item.nome} className={styles.imga} />
                          ):item.id === 9 ? (
                            <Image src={Perfume9} alt={item.nome} className={styles.imga} />
                          ):item.id === 10 ? (
                            <Image src={Perfume10} alt={item.nome} className={styles.imga} />
                          ):
                        (
                          <div className={styles.imagemPlaceholder}></div>
                        )}
                      </div>
                      <span className={styles.nomeProduto}>{item.nome}</span>
                    </div>
                  </div>
                  
                  <div className={styles.colunaPreco}>
                    R$ {item.preco.toFixed(2).replace('.', ',')}
                  </div>
                  
                  <div className={styles.colunaQuantidade}>
                    <div className={styles.quantidadeControle}>
                      <button 
                        className={styles.botaoQuantidade}
                        onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                      >
                        -
                      </button>
                      <span className={styles.quantidade}>{item.quantidade}</span>
                      <button 
                        className={styles.botaoQuantidade}
                        onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.colunaSubtotal}>
                    R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                  </div>
                  
                  <div className={styles.colunaAcoes}>
                    <button 
                      className={styles.botaoRemover}
                      onClick={() => removerItem(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.resumoCarrinho}>
              <div className={styles.resumoConteudo}>
                <h2 className={styles.resumoTitulo}>Resumo do Pedido</h2>
                
                <div className={styles.resumoLinha}>
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                
                <div className={styles.resumoLinha}>
                  <span>Frete:</span>
                  <span>Grátis</span>
                </div>
                
                <div className={`${styles.resumoLinha} ${styles.total}`}>
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                
                <div className={styles.enderecoContainer}>
                  <h3 className={styles.enderecoTitulo}>Endereço de Entrega</h3>
                  
                  <div className={styles.formGrupo}>
                  <div className={styles.formGrupo}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={styles.formInput}
                    />
                  </div>
                    <div className={styles.cepInputContainer}>
                      <input
                        type="text"
                        name="cep"
                        value={endereco.cep}
                        onChange={formatarCep}
                        placeholder="CEP (apenas números)"
                        className={`${styles.formInput} ${erroCep ? styles.inputErro : ''}`}
                        maxLength={9}
                      />
                      {carregandoCep && <span className={styles.carregandoCep}>Buscando...</span>}
                    </div>
                    {erroCep && <span className={styles.mensagemErro}>{erroCep}</span>}
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={`${styles.formGrupo} ${styles.formGrupoLarge}`}>
                      <input
                        type="text"
                        name="rua"
                        value={endereco.rua}
                        onChange={handleEnderecoChange}
                        placeholder="Rua"
                        className={styles.formInput}
                      />
                    </div>
                    
                    <div className={`${styles.formGrupo} ${styles.formGrupoSmall}`}>
                      <input
                        type="text"
                        name="numero"
                        value={endereco.numero}
                        onChange={handleEnderecoChange}
                        placeholder="Número"
                        className={styles.formInput}
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGrupo}>
                    <input
                      type="text"
                      name="bairro"
                      value={endereco.bairro}
                      onChange={handleEnderecoChange}
                      placeholder="Bairro"
                      className={styles.formInput}
                    />
                  </div>

                  
                  <div className={styles.formRow}>
                    <div className={`${styles.formGrupo} ${styles.formGrupoLarge}`}>
                      <input
                        type="text"
                        name="cidade"
                        value={endereco.cidade}
                        onChange={handleEnderecoChange}
                        placeholder="Cidade"
                        className={styles.formInput}
                      />
                    </div>
                    
                    <div className={`${styles.formGrupo} ${styles.formGrupoSmall}`}>
                      <input
                        type="text"
                        name="estado"
                        value={endereco.estado}
                        onChange={handleEnderecoChange}
                        placeholder="Estado"
                        className={styles.formInput}
                        maxLength={2}
                      />
                    </div>
                  </div>
                </div>
                
                <button 
                  className={`${styles.botaoFinalizar} ${!enderecoPreenchido ? styles.botaoDesabilitado : ''}`}
                  onClick={handleSubmit}
                  disabled={!enderecoPreenchido}
                >
                  {enderecoPreenchido ? 'Finalizar Compra' : 'Preencha o endereço'}
                </button>
                
                <Link href="/produtos">
                  <button className={styles.botaoContinuar}>
                    Continuar Comprando
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 MinhaLoja - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}