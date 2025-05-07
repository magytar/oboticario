'use client';

import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: 'Produto Teste',
    price: 100,
    quantity: 1,
    description: 'Oboticario E Voce'
  });


  useEffect(()=>{
    handleSubmit()
  }, [])

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
          price: 100,
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

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      
    </div>
  );
}