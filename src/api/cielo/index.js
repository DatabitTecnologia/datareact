import { getInstance } from '../apiinstance';

const apiInstance = getInstance();

// === 1️⃣ Criar Checkout ===
export const criarCheckout = async (clienteId, items, customer, parcelas = 1) => {
  try {
    const payload = {
      items,
      customer,
      installments: parcelas
    };

    const response = await apiInstance.post(`/checkout/${clienteId}`, payload);
    console.log('Resposta Checkout:', response.data);
    const checkoutUrl = response.data.CheckoutUrl;
    if (checkoutUrl) {
      // Redireciona para a tela da Cielo
      window.location.href = checkoutUrl;
    } else {
      console.error('CheckoutUrl não retornou.');
    }
  } catch (err) {
    console.error('Erro ao criar checkout:', err);
  }
};

// === 2️⃣ Consultar status do pedido pelo Checkout Order ID ===
export const consultarStatusPedido = async (clienteId, checkoutOrderId) => {
  try {
    const response = await apiInstance.get(`/orders/${clienteId}/${checkoutOrderId}`);
    console.log('Status do Pedido:', response.data);
    return response.data;
  } catch (err) {
    console.error('Erro ao consultar status:', err);
  }
};

// === 3️⃣ Consultar pedido pelo Merchant Order Number ===
export const consultarPedidoPorMerchant = async (clienteId, merchantOrderNumber) => {
  try {
    const response = await apiInstance.get(`/merchant/${clienteId}/${merchantOrderNumber}`);
    console.log('Pedido por Merchant:', response.data);
    return response.data;
  } catch (err) {
    console.error('Erro ao consultar merchant order:', err);
  }
};
