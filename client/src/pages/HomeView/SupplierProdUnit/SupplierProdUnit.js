import React, { useState, useEffect } from 'react';
import { FiEdit3, FiTrash2, FiX, FiCheck } from 'react-icons/fi';

import postToDB from '../../../hooks/postToDB';
import deleteToDB from '../../../hooks/deleteToDB';
import getAllFromDB from '../../../hooks/getAllFromDB';

import { NavbarSupplier, Footer, Modal, SubHeading } from '../../../components/index';
import LoadingPage from '../../LoadingPage';
import './SupplierProdUnit.css';

const SupplierProdUnit = () => {
    //--------------Modal------------
    const [modalOpen, setModalOpen] = useState([]);
    //-------------------------------

    const [productionUnits, setProductionUnits] = useState([]);
    const [newProductionUnit, setNewProductionUnit] = useState({ name: '', location: '', capacity: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [didMount, setDidMount] = useState(false)

    async function getProductionUnit(){
        let prodsUnitGet = await getAllFromDB("/productionUnits", {uid_supplier: true})
        if(typeof prodsUnitGet != "string") {
            setProductionUnits(prevState => [...prodsUnitGet])
        }
    }

    function handleNewProductionUnitChange(event) {
      const { name, value } = event.target;
      setNewProductionUnit(prevState => ({ ...prevState, [name]: value }));
    }
  
    function handleEditProductionUnit(index, updatedProductionUnit) {
      // Create a new array with the production unit at the given index replaced with the updated production unit
      const updatedProductionUnits = productionUnits.map((productionUnit, i) =>
        i === index ? updatedProductionUnit : productionUnit
      );
      // Update the state with the new array
      setProductionUnits(updatedProductionUnits);
      // Clear the editing index
      setEditingIndex(null);
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

    //Aparecer no loading da página
    useEffect(()=>{
        getProductionUnit()
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
            <div className='app__prod-unit main__container'>
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
                            <button onClick={() => submitInsert()} className='main__action_btn'>Adicionar</button>
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
                                <React.Fragment key={index}>
                                    {editingIndex === index ? (
                                        <tr className='editing_prod-unit_content'>
                                            <td colSpan={4} style={{paddingRight:'0'}}>
                                                <form 
                                                    style={{display: 'flex'}}
                                                    onSubmit={(event) => {
                                                        event.preventDefault();
                                                        handleEditProductionUnit(index, {
                                                            name: event.target.name.value,
                                                            location: event.target.location.value,
                                                            capacity: event.target.capacity.value,
                                                        });
                                                    }}>
                                                    <div className='inputField'>
                                                        <input                         
                                                            type="text"
                                                            name="name"
                                                            defaultValue={productionUnits[index].name}
                                                        />
                                                    </div> 
                                                    <div className='inputField'>
                                                        <input                         
                                                            type="text"
                                                            name="location"
                                                            defaultValue={productionUnits[index].location}
                                                        />
                                                    </div> 
                                                    <div className='inputField'>
                                                        <input                         
                                                            type="text"
                                                            name="capacity"
                                                            defaultValue={productionUnits[index].capacity}
                                                        />
                                                    </div> 
                                                    <div style={{display:'flex', alignItems:'center'}}>
                                                        <button type="submit"><FiCheck></FiCheck></button>
                                                        <button type="button" onClick={() => setEditingIndex(null)}><FiX></FiX></button>
                                                    </div>
                                                </form>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td data-cell='Nome: '>{productionUnit.name}</td>
                                            <td data-cell='Localização: '>{productionUnit.location}</td>
                                            <td data-cell='Capacidade: '>{productionUnit.capacity}</td>
                                            <td className='actions' style={{paddingRight:'0'}}>
                                                <div style={{display:'flex'}}>
                                                    <button onClick={() => setEditingIndex(index)}><FiEdit3></FiEdit3></button>
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
                                                        <div className='teste' style={{display: 'flex', justifyContent:'space-evenly', gap:'1.5rem', marginTop: '2rem'}}>
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
                                                                onClick={() => submitDelete(productionUnit.id)}>Apagar</button>
                                                        </div>
                                                    </Modal>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
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