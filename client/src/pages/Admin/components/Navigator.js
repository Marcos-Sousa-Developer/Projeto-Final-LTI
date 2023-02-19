import React, {useEffect, useState } from 'react'
import DisplayModal from './Tables/DisplayModal';

// user can be consumer, supplier or admin
function Navigator({users}) {

  const [from, setFrom] = useState(0);

  const [to, setTo] = useState(10);

  const [currentStep, setCurrentStep] = useState(1);

  const [navigationArray, setNavigationArray] = useState([]);

  const [minNavigation, setMinNavigation] = useState(0);

  const [maxNavigation, setMaxNavigation] = useState(10);

  const increment = (newCurrentStep) => {
    if ((newCurrentStep) => 1 && newCurrentStep <= Math.ceil(users.length / 10)) {
      setFrom(newCurrentStep * 10 - 10);
      setTo(newCurrentStep * 10);
      setCurrentStep(newCurrentStep);

      if (newCurrentStep == navigationArray[navigationArray.length - 1] && newCurrentStep !== Math.ceil(users.length / 10)) {
        setMinNavigation(newCurrentStep - 6);
        setMaxNavigation(maxNavigation + 5);

      } else if (newCurrentStep == navigationArray[0] && newCurrentStep !== 1) {
        let newMinNavigation = newCurrentStep - 6;

        if (newCurrentStep == 5) {
          setMinNavigation((newMinNavigation += 1));
        }
        setMinNavigation(newMinNavigation);
        setMaxNavigation(maxNavigation - 5);
      }
    }
  };

  useEffect(() => {
    let array = [];
    let max = maxNavigation
    if(max > Math.ceil(users.length/10)) {
      max = Math.ceil(users.length/10)
    }
    for (let i = minNavigation; i < max; i++) {
      array.push(i + 1);
    }
    setNavigationArray(array);
  }, [users,minNavigation]);
    
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Estado</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.slice(from, to).map((user) => (
              <DisplayModal user={user} key={user.id} />
            ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              {currentStep !== 1 && (
                <button onClick={() => increment(currentStep-1)} className="page-link" aria-label="Previous">
                  <i className="bi bi-arrow-left"></i>
                </button>
              )}
            </li>
            {navigationArray.map((index) =>index == currentStep ? (
                <li key={index} className="page-item active">
                  <button  onClick={() => increment(index)} className="page-link">
                    {index}
                  </button>
                </li>
              ) : (
                <li key={index} className="page-item">
                  <button onClick={() => increment(index)} className="page-link">
                    {index}
                  </button>
                </li>
              )
            )}
            <li className="page-item">
              {currentStep !== Math.ceil(users.length/10) && (
                <button onClick={() => increment(currentStep+1)} className="page-link" aria-label="Next">
                  <i className="bi bi-arrow-right"></i>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    );
}

export default React.memo(Navigator)
