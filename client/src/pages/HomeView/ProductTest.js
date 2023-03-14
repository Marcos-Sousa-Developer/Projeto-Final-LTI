import React from 'react'
import createProduct from '../../hooks/createProduct';

function ProductTest() {

    const [EAN, setEAN] = useState(null)

    const handleSetEAN = (event) => {
        setEAN(event.target.value)
      }




  


    const submit = async () => {
        createProduct("/product",{
            EAN: EAN,
            ...
        })

    }









  return (
    <div>
      
    <button type="submit" onClick={() => submit()}>Login</button>
    </div>
  )
}

export default ProductTest
