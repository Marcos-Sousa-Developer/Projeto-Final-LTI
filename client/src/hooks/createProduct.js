import axios from 'axios'

async function createProduct(url, prms) {

    let params = {
        EAN: prms.EAN,
        name: prms.name,
        production_date: prms.production_date,
        description: prms.description
    }

    await axios.post("/api" + url, null, {params: params})
        .then((response) => {
            if(response.status == 200){
                alert("OK");
            }
        })
        .catch((error) => {
            alert(error);
        })
}

export default createProduct
