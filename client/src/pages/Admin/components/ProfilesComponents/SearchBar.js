import React from 'react'

function SearchBar() {  

  return (
    /* Search Bar */
    <div className="search-bar mx-auto" style={{float:"right", paddingRight:"5px"}} >
        <form className="search-form d-flex align-items-center" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword"></input>
            &nbsp;
            <button type="submit" title="Search">
                <i className="bi bi-search" /> 
            </button>
        </form>
    </div>
    /* End Search Bar */
  )
}

export default SearchBar
