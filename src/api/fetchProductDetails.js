const fetchProductDetails = async (id) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  
  // Verificando se os dados incluem as informações desejadas
  const productDetails = {
    id: data.id,
    title: data.title,
    price: data.price,
    currency: data.currency_id,
    description: data.plain_text_description || data.description, // Obtém a descrição
    color: data.attributes.find(attr => attr.name === 'Cor')?.value_name || 'Não especificado',
    sizes: data.attributes.find(attr => attr.name === 'Tamanho')?.value_name || 'Não especificado',
      thumbnail: data.pictures.length > 0 ? data.pictures[0].url : '',
  };

  return productDetails;
};

export default fetchProductDetails;
