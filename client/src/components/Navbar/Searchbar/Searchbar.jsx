import React, { useState, useRef } from 'react';

import getAllFromDB from '../../../hooks/getAllFromDB';
import getFromDB from '../../../hooks/getFromDB';

import { SnackBar } from '../../../components/index';
import { FiSearch } from 'react-icons/fi';
import "./Searchbar.css";
import { Link } from 'react-router-dom';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

const Searchbar = () => {

    const [searchText, setSearchText] = useState("")
    const snackbarRef1 = useRef(null);
    const snackbarRef2 = useRef(null);
    const snackbarRef3 = useRef(null);


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
      }


    const search = async (event) => {
        event.preventDefault(); // prevent page refresh on form submission

        let searchTextClear = searchText.trim();

        if(window.location.pathname === "/supplier/anunciar"){
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
                window.location.href = `/supplier/anuncio?${queryString}`;
              } else {
                snackbarRef1.current.show();
              }
          }else {
            snackbarRef2.current.show();
          }
        } else {
          if(!searchTextClear.length == 0){
            let products = await getAllFromDB("/ads",{
                title: searchTextClear,
            })
            if(products == "There is no ad in the database"){
                //DAR MENSAGEM DE ERRO OU SUGERIR PROCURAR PELAS CATEGORIAS
                snackbarRef3.current.show();
            } else {
                //VAI PARA OUTRA PÁGINA ONDE MOSTRA OS PRODUTOS
                const data = {searchName: searchTextClear};
                const queryString = new URLSearchParams(data).toString();
                window.location.href = `/pesquisa?${queryString}`;
            }
        }}
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
            <SnackBar
              ref={snackbarRef1}
              message= "Não existe nenhum produto com o EAN que procurou"
              type={SnackbarType.fail}
            />
            <SnackBar
              ref={snackbarRef2}
              message= "O EAN fornecido não é válido"
              type={SnackbarType.fail}
            />
            <SnackBar
              ref={snackbarRef3}
              message= "Não existe nenhum produto com o nome que procurou"
              type={SnackbarType.fail}
            />
        </form>
    )
}

export default Searchbar