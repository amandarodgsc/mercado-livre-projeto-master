import * as Yup from 'yup';

const CepValidator = Yup.object().shape({
  cep: Yup.string()
    .matches(/^\d{5}-\d{3}$/, 'CEP deve estar no formato 99999-999')
    .required('Esse campo é obrigatório'), 
  estado: Yup.string()
    .required('Esse campo é obrigatório'), 
  cidade: Yup.string()
    .required('Esse campo é obrigatório'), 
  numero: Yup.number()
    .typeError('Número deve ser um valor numérico')
    .required('Esse campo é obrigatório') 
    .positive('Número deve ser um valor positivo')
    .integer('Número deve ser um valor inteiro'),
});

export default CepValidator;
