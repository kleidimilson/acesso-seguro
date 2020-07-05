import React, {useState,useEffect} from 'react';
import api from '../../services/api';
import {FaPrint} from 'react-icons/fa';
import './styles.css';
import QRCode from 'qrcode.react';



const Home = () => {
  const [funcionarios, setFuncionarios] = useState([]);
 
  useEffect(() => {
    async function loadFuncionarios(){
      const response = await api.get('/users');
    
      
      
      
    
      setFuncionarios(response.data);
      console.log(response.data);
      
      
     
     
    }
    loadFuncionarios();

  },[]);
 
  return (
    <div id="page-home">
      <div className="content">
      
        <main>
          <div className="impressao">
             <button  onClick={() => window.print()}><FaPrint />Imprimir</button>
          </div>
         
         
        {funcionarios.map(funcio => (
            <ul>
              <li className="item" >
              <QRCode value={funcio.cpf} size={70} fgColor={'#08376b'} />
                <div className="description">
                    <span>{funcio.nome}</span>
                    <p>CPF: {funcio.cpf}</p>
                    <p>Email: {funcio.email}</p>
                    <p>Tel: {funcio.telefone}</p>
                </div>
            </li>
            </ul>
          ))}
         
        </main>
      </div>
    </div>
  )
}

export default Home;