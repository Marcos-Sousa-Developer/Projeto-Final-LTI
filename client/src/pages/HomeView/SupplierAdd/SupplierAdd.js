import React, {useState, useEffect}  from 'react'
import { FiEdit3, FiTrash2, FiX, FiCheck, FiChevronDown } from 'react-icons/fi';


import getAllFromDB from '../../../hooks/getAllFromDB';
import { PriceDisplay } from '../../../utilities/formatCurrency';

import LoadingPage from '../../LoadingPage';
import {NavbarSupplier, Footer, SubHeading} from '../../../components/index';
import './SupplierAdd.css';
import SupplierBar from '../../../components/SupplierBar/SupplierBar';

function SupplierAdd() {

  const SupplierProdUnit = () => {

  const [modalOpen, setModalOpen] = useState([]); //modal1
  const [modalOpen2, setModalOpen2] = useState([]); //modal2
  const [ads, setAds] = useState([]);
  const [didMount, setDidMount] = useState(false)
  const [newProductionUnit, setNewProductionUnit] = useState({ name: '', location: '', city: '', postal_code: '', capacity: '' });


  async function handleEditProductionUnit(index, updatedProductionUnit) {
    // Create a new array with the production unit at the given index replaced with the updated production unit
    const updatedProductionUnits = productionUnits.map((productionUnit, i) =>
      i === index ? updatedProductionUnit : productionUnit
    );
    // Update the state with the new array
    setProductionUnits(updatedProductionUnits);
    
    let prodUnitPut = await putToDB("/productionUnits/" + updatedProductionUnits[index].id,{
      name: updatedProductionUnits[index].name,
      location: updatedProductionUnits[index].location,
      city: updatedProductionUnits[index].city,
      postal_code: updatedProductionUnits[index].postal_code,
      capacity: updatedProductionUnits[index].capacity
  })
  }

  const submitDeleteProdUnit = async (index) => {
    //APAGA O PRODUCTION UNIT
    await deleteToDB("/productionUnits/" + index)
    location.reload()
}

async function handleEliminarUnidade(index){
  submitDeleteProdUnit(index);
  snackbarRef2.current.show();
}
  
}
  async function changeDateFormat(date){
    const parts = date.split(/-|T/);
    return `${parts[2]}-${parts[1]}-${parts[0]}`
  }

  async function formatPrice(price) {
    const formattedPrice = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
    return formattedPrice;
  }

  async function getProducts(){

    let supplier = await getAllFromDB("/suppliers", {uid: true})
    let idUser = supplier[0].id;

    let ads = await getAllFromDB("/ads", {supplier_id: idUser}) 
    try {
      ads.map(async (ad) => (
        ad.created_at = await changeDateFormat(ad.created_at),
        ad.price = await formatPrice(ad.price)
      )) 
     setAds(ads );
    }
    catch(error) {
      setAds([] );
    }
  } 

  useEffect(()=>{
    getProducts()
    setDidMount(true)
}, [])

  return (
    <>
    {
      didMount == false ? (
        <LoadingPage></LoadingPage>
      )
      :
      (
      <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__SupplierAdd'>   
            <SubHeading title="Anúncios"/>
            <SupplierBar active2='active'></SupplierBar>
            <div className='app__SupplierAdd_Box'>
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Unidades</th>
                    <th>Data de criação</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                    {ads.map((ad) => (
                    <tr key={ad.title}>
                      {/*<td><div className='app__SupplierAdd_Box_Image'>
                      <img src={product.src} alt={product.title}/>
                      {ad.title}
                      </div></td>*/}
                      <td>{ad.title}</td>
                      <td>{ad.price}</td>            
                      <td>{ad.units}</td>
                      <td>{ad.created_at}</td>
                      <td className='actions' style={{paddingRight:'0'}}>
                                        <div style={{display:'flex'}}>
                                            <button onClick={() => setModalOpen2(prevState => {
                                                const newState = [...prevState];
                                                newState[index] = true;
                                                return newState;
                                            })}><FiEdit3></FiEdit3></button>
                                            <Modal open={modalOpen2[index]} onClose={() => setModalOpen2(prevState => {
                                                const newState = [...prevState];
                                                newState[index] = false;
                                                return newState;
                                            })}>
                                                <p style={{fontSize:'18px'}}>Editar Unidade</p>
                                                <form 
                                                    onSubmit={(event) => {
                                                        event.preventDefault();
                                                        handleEditProductionUnit(index, {
                                                            id: productionUnit.id,
                                                            name: event.target.name.value,
                                                            location: event.target.location.value,
                                                            city: event.target.city.value,
                                                            postal_code: event.target.postal_code.value,
                                                            capacity: event.target.capacity.value,
                                                        });
                                                        setModalOpen2(prevState => {
                                                            const newState = [...prevState];
                                                            newState[index] = false;
                                                            return newState;
                                                        });
                                                        snackbarRef3.current.show();
                                                    }}>
                                                    <SnackBar
                                                        ref={snackbarRef3}
                                                        message="Unidade Produção alterada!"
                                                        type={SnackbarType.success}
                                                    />
                                                    <div className='inputField'>
                                                        <p>Nome:</p>
                                                        <input                         
                                                            type="text"
                                                            placeholder="Nome"
                                                            name="name"
                                                            defaultValue={productionUnits[index].name}
                                                        />
                                                    </div> 
                                                    <div className='inputField'>
                                                        <p>Localidade:</p>
                                                        <input                         
                                                            type="text"
                                                            placeholder="Localidade"
                                                            name="location"
                                                            defaultValue={productionUnits[index].location}
                                                        />
                                                    </div> 
                                                    <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                                                        <div className='inputField'>
                                                            <p>Cidade:</p>
                                                            <input                         
                                                                type="text"
                                                                placeholder="Cidade"
                                                                name="city"
                                                                defaultValue={productionUnits[index].city}
                                                            />
                                                        </div> 
                                                        <div className='inputField'>
                                                            <p>Cód. Postal:</p>
                                                            <input                         
                                                                type="text"
                                                                placeholder="Cód. Postal"
                                                                name="postal_code"
                                                                defaultValue={productionUnits[index].postal_code}
                                                            />
                                                        </div> 
                                                    </div>
                                                    <div className='inputField'>
                                                        <p>Capacidade:</p>
                                                        <input                         
                                                            type="number"
                                                            placeholder="Capacidade"
                                                            name="capacity"
                                                            defaultValue={productionUnits[index].capacity}
                                                        />
                                                    </div> 
                                                    <div style={{display:'flex', justifyContent:'space-evenly', gap:'1.5rem', marginTop:'2rem'}}>
                                                        <button 
                                                            className='main__action_btn' 
                                                            onClick={() => 
                                                                setModalOpen2(prevState => {
                                                                    const newState = [...prevState];
                                                                    newState[index] = false;
                                                                    return newState;
                                                                })}>Cancelar</button>
                                                        <button 
                                                            className='main__negative_action_btn' 
                                                            type="submit">Guardar</button>
                                                    </div>
                                                </form>
                                            </Modal>
                                            <button onClick={() => setModalOpen(prevState => {
                                                const newState = [...prevState];
                                                newState[index] = true;
                                                return newState;
                                            })}><FiTrash2></FiTrash2></button>
                                            <Modal open={modalOpen[index]} onClose={() => setModalOpen(prevState => {
                                                const newState = [...prevState];
                                                newState[index] = false;
                                                return newState;
                                            })}>
                                                <p style={{fontSize:'18px', textAlign: 'center'}}>Tem a certeza que quer apagar esta unidade de produção?</p>
                                                <div style={{display: 'flex', justifyContent:'space-evenly', gap:'1.5rem', marginTop: '2rem'}}>
                                                    <button 
                                                        className='main__action_btn' 
                                                        onClick={() => 
                                                            setModalOpen(prevState => {
                                                                const newState = [...prevState];
                                                                newState[index] = false;
                                                                return newState;
                                                            })}>Cancelar</button>
                                                    <button 
                                                        className='main__negative_action_btn' 
                                                        onClick={() => handleEliminarUnidade(productionUnit.id)}>Apagar</button>
                                                    <SnackBar
                                                        ref={snackbarRef2}
                                                        message="Unidade Produção eliminada!"
                                                        type={SnackbarType.success}
                                                    />
                                                </div>
                                            </Modal>
                                        </div>
                                    </td>
                    </tr>
                    ))}
                    </tbody>
              </table>
            </div>
        </div>
        <Footer></Footer>
      </>
      )
    }
    </>
  );
}

export default SupplierAdd;