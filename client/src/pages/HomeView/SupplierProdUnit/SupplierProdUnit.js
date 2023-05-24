import React, { useState, useEffect, useRef } from 'react';
import { FiEdit3, FiTrash2, FiX, FiCheck, FiChevronDown } from 'react-icons/fi';

import putToDB from '../../../hooks/putToDB';
import postToDB from '../../../hooks/postToDB';
import deleteToDB from '../../../hooks/deleteToDB';
import getAllFromDB from '../../../hooks/getAllFromDB';

import { NavbarSupplier, Footer, Modal, SubHeading, SnackBar } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import LoadingPage from '../../LoadingPage';
import './SupplierProdUnit.css';
import SupplierBar from '../SupplierBar/SupplierBar';

const SnackbarType = {
    success: "success",
    fail: "fail",
};

const SupplierProdUnit = () => {
    const [modalOpen, setModalOpen] = useState([]); //modal1
    const [modalOpen2, setModalOpen2] = useState([]); //modal2
    const [modalOpen3, setModalOpen3] = useState([]); //modal3
    const snackbarRef = useRef(null);
    const snackbarRef2 = useRef(null);
    const snackbarRef3 = useRef(null);
    const snackbarRef4 = useRef(null);
    const [productionUnits, setProductionUnits] = useState([]);
    const [newProductionUnit, setNewProductionUnit] = useState({ name: '', location: '', capacity: '' });
    const [watchProductsIndex, setWatchProductsIndex] = useState([false, '']);
    const [productsProductionUnits, setProductsProductionUnits] = useState({});
    const [adsProductionUnits, setAdsProductionUnits] = useState({});
    const [searchProd, setSearchProd] = useState([]);
    const [didMount, setDidMount] = useState(false)

    async function getProductionUnit(){
        let prodsUnitGet = await getAllFromDB("/productionUnits", {uid_supplier: true})
        if(typeof prodsUnitGet != "string") {
            setProductionUnits(prevState => [...prodsUnitGet])
        }
    }

    async function getProduct(productionUnit_id, index){
        setSearchProd((prevArray) => [...prevArray, index]);
        setWatchProductsIndex([!watchProductsIndex[0], index])
        let productsProductionUnit = await getAllFromDB("/productProductionUnits", {productionUnit_id: productionUnit_id });
        setProductsProductionUnits((prevDict) => ({ ...prevDict, [index]: productsProductionUnit }))
    }

    function handleNewProductionUnitChange(event) {
      const { name, value } = event.target;
      setNewProductionUnit(prevState => ({ ...prevState, [name]: value }));
    }
  
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
        capacity: updatedProductionUnits[index].capacity
    })
    }

    const submitInsert = async () => {
        //CRIA O PRODUCTION UNIT
        let prodUnitPost = await postToDB("/productionUnits",{
            name: newProductionUnit.name,
            location: newProductionUnit.location,
            capacity: newProductionUnit.capacity,
            uid_supplier: true,
        })

        // Add the new production unit to the list of production units stored in state
        setProductionUnits(prevState => [...prevState, newProductionUnit]);
        // Reset the form fields
        setNewProductionUnit({ name: '', location: '', capacity: '' });
        // Add a new element to the modalOpen array
        setModalOpen(prevState => [...prevState, false]);
    }

    const submitDelete = async (index) => {
        //APAGA O PRODUCTION UNIT
        await deleteToDB("/productionUnits/" + index)
        location.reload()
    }

    async function handleCriarUnidade() {
        submitInsert();
        snackbarRef.current.show();
    }

    async function handleEliminarUnidade(index){
        submitDelete(index);
        snackbarRef2.current.show();
    }

    //Aparecer no loading da página
    useEffect(()=>{
        getProductionUnit()
        setDidMount(true)
    }, []);

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
            <div className='app__prod-unit main__container'>
                <SupplierBar></SupplierBar>
                <SubHeading title="Unidade Produção"/>
                <div className='app__prod-unit_content'>
                <div className='app__prod-unit_add_new-unit'>
                    <p className='app__prod-unit_add_new-unit_title'>Criar Unidade Produção</p>
                    <form className='app__prod-unit_add_new-unit_content'>
                        <div className='inputField'>
                            <p>Nome:</p>
                            <input                         
                                type="text"
                                placeholder="Nome"
                                name="name"
                                value={newProductionUnit.name}
                                onChange={handleNewProductionUnitChange}
                            />
                        </div> 
                        <div className='inputField'>
                            <p>Localização:</p>
                            <input                         
                                type="text"
                                placeholder="Localização"
                                name="location"
                                value={newProductionUnit.location}
                                onChange={handleNewProductionUnitChange}
                            />
                        </div> 
                        <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                            <div className='inputField'>
                                <p>Cidade:</p>
                                <input                         
                                    type="text"
                                    placeholder="Cidade"
                                />
                            </div> 
                            <div className='inputField'>
                                <p>Cód. Postal:</p>
                                <input                         
                                    type="text"
                                    placeholder="Cód. Postal"
                                />
                            </div> 
                        </div>
                        <div className='inputField'>
                            <p>Capacidade:</p>
                            <input                         
                                type="text"
                                placeholder="Capacidade"
                                name="capacity"
                                value={newProductionUnit.capacity}
                                onChange={handleNewProductionUnitChange}
                            />
                        </div> 
                        <div className='app__prod-unit_add_new-unit_actions'>
                            <button onClick={handleCriarUnidade} className='main__action_btn'>Adicionar</button>
                            <SnackBar
                                ref={snackbarRef}
                                message="Unidade Produção criada!"
                                type={SnackbarType.success}
                            />
                        </div>
                    </form>
                </div>
                {productionUnits.length > 0 && (
                    <div className='app__prod-unit_existing-units'>
                        <p className='app__prod-unit_existing-units_title'>Unidades Produção</p>
                        <table className='app__prod-unit_existing-units_content'>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Localização</th>
                                    <th>Capacidade</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {productionUnits.map((productionUnit, index) => (
                                <>
                                <tr key={index}>
                                    <td data-cell='Nome: '>{productionUnit.name}</td>
                                    <td data-cell='Localização: '>{productionUnit.location}</td>
                                    <td data-cell='Capacidade: '>{productionUnit.capacity}</td>
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
                                                            />
                                                        </div> 
                                                        <div className='inputField'>
                                                            <p>Cód. Postal:</p>
                                                            <input                         
                                                                type="text"
                                                                placeholder="Cód. Postal"
                                                            />
                                                        </div> 
                                                    </div>
                                                    <div className='inputField'>
                                                        <p>Capacidade:</p>
                                                        <input                         
                                                            type="text"
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
                                                <p style={{fontSize:'18px'}}>Tem a certeza que quer apagar esta unidade de produção?</p>
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
                                    <td style={{paddingRight:'0'}} data-cell='Produtos: '><button onClick={async () => getProduct(productionUnit.id, index)} ><FiChevronDown></FiChevronDown></button></td>                            
                                </tr>
                                {(searchProd.includes(index) && productsProductionUnits[index] != undefined && watchProductsIndex[0] && watchProductsIndex[1] == index) && (
                                    <>
                                        <tr>
                                            <td className='products_format products_format_mobile_head' style={{padding: '0.5rem 3rem 0.5rem 1rem'}}>Titulo</td>
                                            <td className='products_format products_format_mobile_head'>Preço</td>
                                            <td className='products_format products_format_mobile_head'>Quant.</td>
                                            <td className='products_format products_format_mobile_head' style={{paddingRight: '0'}}></td>
                                        </tr>
                                        {productsProductionUnits[index].map((product, idx) => (
                                            <tr>
                                                <td data-cell='Título: ' className='products_format_mobile' style={{ fontSize: '14px', padding: '0.5rem 3rem 0.5rem 1rem'}}>{product.title}</td>
                                                <td data-cell='Preço: ' className='products_format_mobile' style={{ fontSize: '14px'}}>{product.price} €</td>
                                                <td data-cell='Quant.: ' className='products_format_mobile' style={{ fontSize: '14px'}}>{product.quantity}</td>
                                                <td className='products_format_mobile' style={{paddingRight: '0'}}>
                                                    <div>
                                                        <button onClick={() => setModalOpen3(prevState => {
                                                            const newState = [...prevState];
                                                            newState[idx] = true;
                                                            return newState;
                                                        })}><FiEdit3></FiEdit3></button>
                                                        <Modal open={modalOpen3[idx]} onClose={() => setModalOpen3(prevState => {
                                                            const newState = [...prevState];
                                                            newState[idx] = false;
                                                            return newState;
                                                        })}>
                                                           <p style={{fontSize:'18px'}}>Editar produto</p>
                                                           <div className='inputField'>
                                                                <p>Capacidade:</p>
                                                                <input                         
                                                                    type="text"
                                                                    placeholder="Quantidade"
                                                                    name="quantity"
                                                                />
                                                            </div> 
                                                           <div style={{display: 'flex', justifyContent:'space-evenly', gap:'1.5rem', marginTop: '2rem'}}>
                                                                <button 
                                                                    className='main__action_btn' 
                                                                    onClick={() => 
                                                                        setModalOpen3(prevState => {
                                                                            const newState = [...prevState];
                                                                            newState[idx] = false;
                                                                            return newState;
                                                                        })}>Cancelar</button>
                                                                <button 
                                                                    className='main__negative_action_btn' 
                                                                    >Guardar</button>
                                                                <SnackBar
                                                                    ref={snackbarRef3}
                                                                    message="Unidade Produção eliminada!"
                                                                    type={SnackbarType.success}
                                                                />
                                                            </div>
                                                        </Modal>
                                                        <button><FiTrash2></FiTrash2></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}    
                                </>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                </div>
            </div>
            <Footer></Footer>
        </>
        )
    }
    </>
  );
}

export default SupplierProdUnit