import React, {useState} from 'react';

import {NavbarSupplier, Footer, SubHeading, Searchbar} from '../../../components/index';

const SupplierTransportUnit = () => {

    const [isLoading, setLoading] = useState(false); 


    return (
        <>
            {isLoading ? 
                <LoadingPage></LoadingPage>
            :
                <>
                    <NavbarSupplier></NavbarSupplier>
                    <div>

                    </div>
                    <Footer></Footer>
                </>
            }
        </>
    )
}

export default SupplierTransportUnit