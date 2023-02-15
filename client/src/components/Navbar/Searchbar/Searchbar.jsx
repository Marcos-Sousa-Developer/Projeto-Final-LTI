import React from 'react'

import { FiSearch } from 'react-icons/fi';
import "./Searchbar.css";

const Searchbar = () => {


    return (
        <form className='app__navbar__searchBar'>
            <div>
                <FiSearch fontSize={22} color='black'  aria-hidden="true"/>
                <input
                    name=""
                    autoComplete="off"
                    id=""
                    className=""
                    placeholder="Pesquise..."
                    type="search"
                />
            </div>
        </form>
    )
}

export default Searchbar