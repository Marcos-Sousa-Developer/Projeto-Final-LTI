import React, {useState, useEffect, useRef}  from 'react';
import { FiEdit3, FiTrash2, FiX, FiCheck, FiChevronDown } from 'react-icons/fi';

import putToDB from '../../../hooks/putToDB';
import deleteToDB from '../../../hooks/deleteToDB';
import getAllFromDB from '../../../hooks/getAllFromDB';

import { PriceDisplay } from '../../../utilities/formatCurrency';

import LoadingPage from '../../LoadingPage';
import {NavbarSupplier, Footer, SubHeading, Modal, SnackBar} from '../../../components/index';
import './SupplierAdd.css';
import SupplierBar from '../../../components/SupplierBar/SupplierBar';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

function SupplierAdd() {

  const snackbarRef = useRef(null);
  const snackbarRef2 = useRef(null);
  const snackbarRef3 = useRef(null);
  const snackbarRef4 = useRef(null);
  const [modalOpen, setModalOpen] = useState([]); //modal1
  const [modalOpen2, setModalOpen2] = useState([]); //modal2
  const [ads, setAds] = useState([]);
  const [didMount, setDidMount] = useState(false)
  const [newAd, setNewAd] = useState({ title: '', price: '', mobile_number: '', email: ''});
  

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
        ad.created_at = await changeDateFormat(ad.created_at)
        //ad.price = await formatPrice(ad.price)
      )) 
     setAds(ads);
    }
    catch(error) {
      setAds([] );
    }
  } 

  const submitDeleteAd = async (index) => {
    //APAGA O PRODUCTION UNIT
    await deleteToDB("/ads/" + index)
    location.reload()
  }

  async function handleEliminarAd(index){
    submitDeleteAd(index);
    snackbarRef2.current.show();
  }

  async function handleEditAd(index, updatedAd) {
    // Create a new array with the ad at the given index replaced with the updated ad
    const updatedupdatedAds = ads.map((ad, i) =>
      i === index ? updatedAd : ad
    );
    // Update the state with the new array
    setAds(updatedupdatedAds);
    
    let prodAd = await putToDB("/ads/" + updatedupdatedAds[index].id,{
      title: updatedupdatedAds[index].title,
      price: updatedupdatedAds[index].price,
      email: updatedupdatedAds[index].email,
      mobile_number: updatedupdatedAds[index].mobile_number,
      capacity: updatedupdatedAds[index].capacity
    })
  }

  function handleNewAdChange(event) {
    const { name, value } = event.target;
    setNewAd(prevState => ({ ...prevState, [name]: value }));
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
        <div className='app__SupplierAdd main__container'>   
            <SubHeading title="Anúncios"/>
            <SupplierBar active2='active'></SupplierBar>
            <div className='app__SupplierAdd_Box'>
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    {/*<th>Unidades</th>*/}
                    <th>Data de criação</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                    {ads.map((ad, index) => (
                    <tr key={index}>
                      <td data-cell='Título: '>{ad.title}</td>
                      <td data-cell='Preço: ' className='priceShow'><PriceDisplay price={ad.price}></PriceDisplay></td>            
                      <td data-cell='Data de criação: '>{ad.created_at}</td>
                      <td className='actions' style={{paddingRight:'0', backgroundColor: window.innerWidth < 650 ? 'transparent' : ''}}>  
                        <div style={{display:'flex', backgroundColor: 'transparent'}}>
                                            <button className='teste' style={{margin:'0 0.5rem'}} onClick={() => setModalOpen2(prevState => {
                                                const newState = [...prevState];
                                                newState[index] = true;
                                                return newState;
                                            })}><FiEdit3></FiEdit3></button>
                                            <Modal open={modalOpen2[index]} onClose={() => setModalOpen2(prevState => {
                                                const newState = [...prevState];
                                                newState[index] = false;
                                                return newState;
                                            })}>
                                                <p style={{fontSize:'18px'}}>Editar Anúncio</p>
                                                <form 
                                                    onSubmit={(event) => {
                                                        event.preventDefault();
                                                        handleEditAd(index, {
                                                            id: ad.id,
                                                            title: event.target.title.value,
                                                            price: event.target.price.value,
                                                            mobile_number: event.target.mobile_number.value,
                                                            email: event.target.email.value,
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
                                                        message="Anúncio alterada!"
                                                        type={SnackbarType.success}
                                                    />
                                                    <div className='inputField'>
                                                        <p>Titulo:</p>
                                                        <input                         
                                                            type="text"
                                                            placeholder="Título"
                                                            name="title"
                                                            defaultValue={ads[index].title}
                                                        />
                                                    </div> 
                                                    <div className='inputField'>
                                                        <p>Preço:</p>
                                                        <input                         
                                                            type="text"
                                                            placeholder="Preço"
                                                            name="price"
                                                            defaultValue={ads[index].price}
                                                        />
                                                    </div> 

                                                    <p style={{fontSize:'18px', marginTop:'18px'}}>Dados do Anunciante</p>

                                                    <div className='inputField'>
                                                        <p>Telemóvel:</p>
                                                        <input                         
                                                            type="text"
                                                            placeholder="Telemóvel"
                                                            name="mobile_number"
                                                            defaultValue={ads[index].mobile_number}
                                                        />
                                                    </div> 
                                                    <div className='inputField'>
                                                        <p>Email:</p>
                                                        <input                         
                                                            type="text"
                                                            placeholder="Email"
                                                            name="email"
                                                            defaultValue={ads[index].email}
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
                                            <button style={{margin:'0 0.5rem'}} onClick={() => setModalOpen(prevState => {
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
                                                        onClick={() => handleEliminarAd(ad.id)}>Apagar</button>
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