import { useLocation } from 'react-router-dom';



function Pagamento (){
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

}
export default Pagamento; 