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
import SupplierBar from '../../../components/SupplierBar/SupplierBar';

const SnackbarType = {
    success: "success",
    fail: "fail",
};

const SupplierProdUnit = () => {
    const [modalOpen, setModalOpen] = useState([]); //modal1
    const [modalOpen2, setModalOpen2] = useState([]); //modal2
    const [modalOpen3, setModalOpen3] = useState([]); //modal3
    const [modalOpen4, setModalOpen4] = useState([]); //modal3
    const snackbarRef = useRef(null);
    const snackbarRef2 = useRef(null);
    const snackbarRef3 = useRef(null);
    const snackbarRef4 = useRef(null);
    const snackbarRef5 = useRef(null);
    const [productionUnits, setProductionUnits] = useState([]);
    const [newProductionUnit, setNewProductionUnit] = useState({ name: '', location: '', city: '', postal_code: '', capacity: '' });
    const [watchProductsIndex, setWatchProductsIndex] = useState([false, '']);
    const [productsProductionUnits, setProductsProductionUnits] = useState({});
    const [searchProd, setSearchProd] = useState([]);
    const [didMount, setDidMount] = useState(false)

    const [quantity, setQuantity] = useState(0);

    async function getProductionUnit(){
        let prodsUnitGet = await getAllFromDB("/productionUnits", {uid_supplier: true})
        if(typeof prodsUnitGet != "string") {
            setProductionUnits(prevState => [...prodsUnitGet])
        }
        prodsUnitGet.map((productionUnit, index) => (
            getProduct(productionUnit.id, index)
        ))
    }

    async function getProduct(productionUnit_id, index){
        let productsProductionUnit = await getAllFromDB("/productProductionUnits", {productionUnit_id: productionUnit_id });
        if(productsProductionUnit != 'There is no product production unit in the database'){
            setProductsProductionUnits((prevDict) => ({ ...prevDict, [index]: productsProductionUnit }))
        } 
    }

    function setIndex(index){
        setSearchProd((prevArray) => [...prevArray, index]);
        setWatchProductsIndex([!watchProductsIndex[0], index])
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
        city: updatedProductionUnits[index].city,
        postal_code: updatedProductionUnits[index].postal_code,
        capacity: updatedProductionUnits[index].capacity
        });
    }

    async function handleEditProductProductionUnit(index, quantityProd) {
        if(quantity != null){
            let productProdUnitPut = await putToDB("/productProductionUnits/" + index,{
                quantity: quantityProd
            })
        }
    }

    const submitInsert = async () => {
        //CRIA O PRODUCTION UNIT
        let prodUnitPost = await postToDB("/productionUnits",{
            name: newProductionUnit.name,
            location: newProductionUnit.location,
            city: newProductionUnit.city,
            postal_code: newProductionUnit.postal_code,
            capacity: newProductionUnit.capacity,
            uid_supplier: true,
        })

        // Add the new production unit to the list of production units stored in state
        setProductionUnits(prevState => [...prevState, newProductionUnit]);
        // Reset the form fields
        setNewProductionUnit({ name: '', location: '', city: '', postal_code: '', capacity: '' });
        // Add a new element to the modalOpen array
        setModalOpen(prevState => [...prevState, false]);
    }

    const submitDeleteProdUnit = async (index) => {
        //APAGA O PRODUCTION UNIT
        await deleteToDB("/productionUnits/" + index)
        location.reload()
    }

    const submitDeleteProduct = async (prodUnitID, productID) => {
        //APAGA O PRODUTO DA PRODUCTION UNIT
        let productProdUnit = await getAllFromDB("/productProductionUnits", {productionUnit_id: prodUnitID, ad_id: productID})
        await deleteToDB("/productProductionUnits/" + productProdUnit[0].id)
        location.reload()
    }

    async function handleCriarUnidade() {
        submitInsert();
        snackbarRef.current.show();
    }

    async function handleEliminarUnidade(index){
        submitDeleteProdUnit(index);
        snackbarRef3.current.show();
    }

    const handleSetQuantity = (event) => {
        setQuantity(event.target.value);
    }

    async function handleEliminarProduto(prodUnitID, productID){
        submitDeleteProduct(prodUnitID, productID);
        snackbarRef4.current.show();
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
                <SubHeading title="Unidade Produção"/>
                <SupplierBar active4='active'></SupplierBar>
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
                                    name="city"
                                    value={newProductionUnit.city}
                                    onChange={handleNewProductionUnitChange}
                                />
                            </div> 
                            <div className='inputField'>
                                <p>Cód. Postal:</p>
                                <input                         
                                    type="text"
                                    placeholder="Cód. Postal"
                                    name="postal_code"
                                    value={newProductionUnit.postal_code}
                                    onChange={handleNewProductionUnitChange}
                                />
                            </div> 
                        </div>
                        <div className='inputField'>
                            <p>Capacidade:</p>
                            <input                         
                                type="number"
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {productionUnits.map((productionUnit, index) => (
                                <>
                                <tr key={index}>
                                    <td data-cell='Nome: ' className='tdtop'>{productionUnit.name}</td>
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
                                                            city: event.target.city.value,
                                                            postal_code: event.target.postal_code.value,
                                                            capacity: event.target.capacity.value,
                                                        });
                                                        setModalOpen2(prevState => {
                                                            
                                                            const newState = [...prevState];
                                                            newState[index] = false;
                                                            return newState;
                                                        });
                                                        snackbarRef2.current.show();
                                                    }}>
                                                    <SnackBar
                                                        ref={snackbarRef2}
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
                                                        ref={snackbarRef3}
                                                        message="Unidade Produção eliminada!"
                                                        type={SnackbarType.success}
                                                    />
                                                </div>
                                            </Modal>
                                        </div>
                                    </td>
                                    <td className='produtos_bold tdbottom' style={{paddingRight:'0'}}><button onClick={async () => setIndex(index)}>Ver Produtos <FiChevronDown></FiChevronDown></button></td>                            
                                </tr>
                                {(searchProd.includes(index) && watchProductsIndex[0] && watchProductsIndex[1] == index) && (
                                    productsProductionUnits[index] == undefined ? (
                                        <tr>
                                            <td colSpan={5} style={{textAlign:'center', fontSize: '14px'}}>Esta unidade de produção ainda não tem produtos</td>
                                        </tr>
                                    ):(
                                        <>
                                        {/*<p style={{margin:'.5rem 0 0.25rem 2.5rem', fontWeight:'500'}}>Produtos</p>*/}
                                        <tr>
                                            <td colSpan={5} style={{padding: '0 0 1rem 2.5rem', marginRight: '1rem'}}>
                                            <table className='inner-table' style={{width: '100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ fontSize: '14px'}}>Título</th>
                                                        <th style={{ fontSize: '14px'}}>Preço</th>
                                                        <th style={{ fontSize: '14px'}}>Quant.</th>
                                                        <th style={{padding: '.25rem 0 .25rem 0'}}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productsProductionUnits[index].map((product, idx) => (
                                                        //setQuantity(product.quantity),
                                                        <tr>
                                                            <td data-cell='Título: ' style={{ fontSize: '14px'}}>{product.title}</td>
                                                            <td data-cell='Preço: ' style={{ fontSize: '14px'}}>{product.price} €</td>
                                                            <td data-cell='Quant.: ' style={{ fontSize: '14px'}}>{product.quantity}</td>
                                                            <td className='product_actions' style={{padding: '.25rem 0 .25rem 0'}}>
                                                                    <button 
                                                                    onClick={() => {
                                                                        setModalOpen3(prevState => {
                                                                        const newState = [...prevState];
                                                                        newState[idx] = true;
                                                                        return newState;
                                                                    })
                                                                    setQuantity(product.quantity)}}><FiEdit3></FiEdit3></button>
                                                                    <Modal open={modalOpen3[idx]} onClose={() => setModalOpen3(prevState => {
                                                                        const newState = [...prevState];
                                                                        newState[idx] = false;
                                                                        return newState;
                                                                    })}>
                                                                    <p style={{fontSize:'18px'}}>Editar produto</p>
                                                                    <div className='inputField'>
                                                                            <p>Quantidade:</p>
                                                                            <input                         
                                                                                type="number"
                                                                                placeholder="Quantidade"
                                                                                name="quantity"
                                                                                defaultValue={quantity}
                                                                                onChange={handleSetQuantity}
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
                                                                            <button className='main__negative_action_btn' type="submit"
                                                                                onClick={(event) => {
                                                                                    event.preventDefault();
                                                                                    handleEditProductProductionUnit(product.id, quantity)
                                                                                    setModalOpen3(prevState => {
                                                                                            const newState = [...prevState];
                                                                                            newState[idx] = false;
                                                                                            return newState;
                                                                                    })
                                                                                    product.quantity=quantity
                                                                                    snackbarRef5.current.show();}
                                                                                }>Guardar</button>
                                                                            <SnackBar
                                                                                ref={snackbarRef5}
                                                                                message="Quantidade de produto alterada!"
                                                                                type={SnackbarType.success}
                                                                            />
                                                                        </div>
                                                                    </Modal>
                                                                    <button onClick={() => setModalOpen4(prevState => {
                                                                        const newState = [...prevState];
                                                                        newState[index] = true;
                                                                        return newState;
                                                                    })}><FiTrash2></FiTrash2></button>
                                                                    <Modal open={modalOpen4[index]} onClose={() => setModalOpen4(prevState => {
                                                                        const newState = [...prevState];
                                                                        newState[index] = false;
                                                                        return newState;
                                                                    })}>
                                                                        <p style={{fontSize:'18px', textAlign: 'center'}}>Tem a certeza que quer apagar o produto desta unidade de produção?</p>
                                                                        <div style={{display: 'flex', justifyContent:'space-evenly', gap:'1.5rem', marginTop: '2rem'}}>
                                                                            <button 
                                                                                className='main__action_btn' 
                                                                                onClick={() => 
                                                                                    setModalOpen4(prevState => {
                                                                                        const newState = [...prevState];
                                                                                        newState[index] = false;
                                                                                        return newState;
                                                                                    })}>Cancelar</button>
                                                                            <button 
                                                                                className='main__negative_action_btn' 
                                                                                onClick={() => handleEliminarProduto(productionUnit.id, product.id)}>Apagar</button>
                                                                            <SnackBar
                                                                                ref={snackbarRef4}
                                                                                message="Produto eliminado com sucesso!"
                                                                                type={SnackbarType.success}
                                                                            />
                                                                        </div>
                                                                    </Modal>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                    </>
                                    ) 
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