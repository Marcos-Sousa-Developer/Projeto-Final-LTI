import React, { useState } from 'react';

import getAllFromDB from '../../../hooks/getAllFromDB';

import { FiSearch } from 'react-icons/fi';
import "./Searchbar.css";

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

    const search = async (event) => {
        event.preventDefault(); // prevent page refresh on form submission

        let searchTextClear = searchText.trim();

        if(!searchTextClear.length == 0){
            console.log(searchTextClear)
            //fazer getAll à api 
            let products = await getAllFromDB("/productsForSell",{
                title: searchTextClear,
              })

            console.log(products)

        }
    }

    

    return (
        <form className='app__navbar__searchBar'>
            <div>
                <FiSearch fontSize={22} color='black'  aria-hidden="true"/>
                <input
                    name="searchText"
                    autoComplete="off"
                    id=""
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