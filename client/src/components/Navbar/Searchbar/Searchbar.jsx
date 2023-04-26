import React, { useState } from 'react';

import getAllFromDB from '../../../hooks/getAllFromDB';
import getFromDB from '../../../hooks/getFromDB';

import { FiSearch } from 'react-icons/fi';
import "./Searchbar.css";
import { Link } from 'react-router-dom';

const Searchbar = () => {

    const [searchText, setSearchText] = useState("")

    const handleSetSearchText = (event) => {
        setSearchText(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search(event);
        }
    }

    async function verifyEAN(EAN){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //Não é null
        //Não pode existir na bd ainda
        //Tem 8 ou 13 algarismos e são todos numéricos
  
        if(EAN == "" || EAN == null) {
          // O EAN não pode ser nulo
          return "Deve de inserir um EAN válido";
        }
        
        if (EAN.length !== 8 && EAN.length !== 13) {
          // O EAN deve ter 8 ou 13 dígitos
          return "O EAN deve ter 8 ou 13 dígitos";
        }
        
        var checksum = 0;
        for (var i = 0; i < EAN.length - 1; i++) {
          var digit = parseInt(EAN[i], 10);
          if (isNaN(digit)) {
            // O EAN deve conter apenas dígitos numéricos
            return "O EAN deve conter apenas dígitos numéricos";
          }
          checksum += (i % 2 === 0) ? digit * 3 : digit;
        }
        
        var lastDigit = parseInt(EAN[EAN.length - 1], 10);
        if (isNaN(lastDigit)) {
          // O EAN deve conter apenas dígitos numéricos
          return "O EAN deve conter apenas dígitos numéricos";
        } else {
          return "OK";
        }
  
        //if(((10 - (checksum % 10)) === lastDigit) == true){
        //  return "OK" ;
        //} else{
        //  return "EAN inválido";
        //}
      }


    const search = async (event) => {
        event.preventDefault(); // prevent page refresh on form submission

        let searchTextClear = searchText.trim();

        if(window.location.pathname === "/"){
            if(!searchTextClear.length == 0){
                let products = await getAllFromDB("/productsForSell",{
                    title: searchTextClear,
                })
                if(products == "There is no ad in the database"){
                    //DAR MENSAGEM DE ERRO OU SUGERIR PROCURAR PELAS CATEGORIAS
                    alert(products)
                } else {
                    //VAI PARA OUTRA PÁGINA ONDE MOSTRA OS PRODUTOS

                    const data = {products: products};
                    const queryString = new URLSearchParams(data).toString();
                    window.location.href = `/pesquisa?${queryString}`;
    
                    //para ir buscar os produtos na nova pagina, fazer
                    //const urlParams = new URLSearchParams(window.location.search);
                    //const data = urlParams.get("products");
                }
            }
        }
        if(window.location.pathname === "/anunciar"){
            document.getElementsByName('searchText')[0].placeholder='new text for email';
            //verificar o EAN
            let validEAN = await verifyEAN(searchTextClear);

            let product;

            if(validEAN == "OK"){

                let params = {
                  EAN: searchTextClear,
                };
    
                product = await getAllFromDB("/products/", params);

                if(product.length == 1){
                  const data = {EAN: product[0].EAN};
                  const queryString = new URLSearchParams(data).toString();
                  window.location.href = `/anuncio?${queryString}`;
                } else {
                  alert(product)
                }
            }else {
              alert(validEAN)
            }
        }
    }

    return (
        <form className='app__navbar__searchBar'>
            <div>
                <FiSearch fontSize={22} color='black' aria-hidden="true"/>
                <input
                    name="searchText"
                    autoComplete="off"
                    className="search_close_btn"
                    placeholder="Pesquise..."
                    type="search"
                    value = {searchText ?? ""}
                    onChange={handleSetSearchText}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </form>
    )
}

export default Searchbar