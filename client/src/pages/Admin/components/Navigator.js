import React from 'react'

function Navigator({navArray, handleClick, currentTab}) {
    
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button onClick={ () => handleClick.function(currentTab-1)} className="page-link" aria-label="Previous">
                <i className="bi bi-arrow-left"></i>
              </button>
            </li>
            {navArray.map((index) => (

              index == currentTab ? 
              (
                <li key={index} className="page-item active"><button onClick={ () => handleClick.function(index)} className="page-link">{index}</button></li>
              ) : 
              
              <li key={index} className="page-item"><button onClick={ () => handleClick.function(index)} className="page-link">{index}</button></li>
                
              ))
            }
            <li className="page-item">
              <button onClick={ () => handleClick.function(currentTab+1)} className="page-link" aria-label="Next">
                <i className="bi bi-arrow-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
}

export default React.memo(Navigator)
