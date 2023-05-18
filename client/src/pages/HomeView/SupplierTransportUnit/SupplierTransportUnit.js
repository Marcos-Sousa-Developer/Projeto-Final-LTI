import React, {useState, useEffect} from 'react';
import { FiEdit3, FiTrash2, FiX, FiCheck } from 'react-icons/fi';

import { NavbarSupplier, Footer, Modal, SubHeading } from '../../../components/index';
import LoadingPage from '../../LoadingPage';
import "./SupplierTransportUnit.css";

const SupplierTransportUnit = () => {

    const [isLoading, setLoading] = useState(false); 

    //--------------Modal------------
    const [modalOpen, setModalOpen] = useState([]);
    //-------------------------------
    
    const [transportUnits, setTransportUnits] = useState([]);
    const [newTransportUnit, setNewTransportUnit] = useState({ name: '', location: '', capacity: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [didMount, setDidMount] = useState(false);
    
    /*
    async function getTransportUnit(){
        let transpUnitGet = await getAllFromDB("/transportUnits", {uid_supplier: true})
        if(typeof transpUnitGet != "string") {
            setTransportUnits(prevState => [...transpUnitGet])
        }
    }
    */
    
    function handlenewTransportUnitChange(event) {
      const { name, value } = event.target;
      setNewTransportUnit(prevState => ({ ...prevState, [name]: value }));
    }
      
    function handleEditTransportUnit(index, updatedTransportUnit) {
      // Create a new array with the production unit at the given index replaced with the updated production unit
      const updatedTransportUnits = transportUnits.map((transportUnit, i) =>
        i === index ? updatedTransportUnit : transportUnit
      );
      // Update the state with the new array
      setTransportUnits(updatedTransportUnits);
      // Clear the editing index
      setEditingIndex(null);
    }
        
    const submitInsert = async () => {
        //CRIA O PRODUCTION UNIT
        /*
        let prodUnitPost = await postToDB("/productionUnits",{
            name: newTransportUnit.name,
            location: newTransportUnit.location,
            capacity: newTransportUnit.capacity,
            uid_supplier: true,
        })
        */
        // Add the new production unit to the list of production units stored in state
        setTransportUnits(prevState => [...prevState, newTransportUnit]);
        // Reset the form fields
        setNewTransportUnit({ name: '', location: '', capacity: '' });
        // Add a new element to the modalOpen array
        setModalOpen(prevState => [...prevState, false]);
    }
    /*
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
    */

    return (
        <>
            {isLoading ? 
                <LoadingPage></LoadingPage>
            :
                <>
                    <NavbarSupplier></NavbarSupplier>
                    <div className='app__TransportUnit main__container'>
                        <SubHeading title="Unidade de Transporte"/>
                        <div className='app__TransportUnit_content'>
                            <div className='app__TransportUnit_add_new-unit'>
                                <p className='app__TransportUnit_add_new-unit_title'>Criar Unidade Transporte</p>
                                <form className='app__TransportUnit_add_new-unit_content'>
                                    <div className='inputField'>
                                        <p>Nome:</p>
                                        <input                         
                                            type="text"
                                            placeholder="Nome"
                                            name="name"
                                            value={newTransportUnit.name}
                                            onChange={handlenewTransportUnitChange}
                                        />
                                    </div> 
                                    <div className='inputField'>
                                        <p>Localização:</p>
                                        <input                         
                                            type="text"
                                            placeholder="Localização"
                                            name="location"
                                            value={newTransportUnit.location}
                                            onChange={handlenewTransportUnitChange}
                                        />
                                    </div> 
                                    <div className='inputField'>
                                        <p>Capacidade:</p>
                                        <input                         
                                            type="text"
                                            placeholder="Capacidade"
                                            name="capacity"
                                            value={newTransportUnit.capacity}
                                            onChange={handlenewTransportUnitChange}
                                        />
                                    </div> 
                                    <div className='app__TransportUnit_add_new-unit_actions'>
                                        <button onClick={() => submitInsert()} className='main__action_btn'>Adicionar</button>
                                    </div>
                                </form>
                            </div>
                            {transportUnits.length > 0 && (
                                <div className='app__TransportUnit_existing-units'>
                                    <p className='app__TransportUnit_existing-units_title'>Unidades Transporte</p>
                                    <table className='app__TransportUnit_existing-units_content'>
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Localização</th>
                                                <th>Capacidade</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {transportUnits.map((TransportUnit, index) => (
                                            <React.Fragment key={index}>
                                                {editingIndex === index ? (
                                                    <tr className='editing_TransportUnit_content'>
                                                        <td colSpan={4} style={{paddingRight:'0'}}>
                                                            <form 
                                                                style={{display: 'flex'}}
                                                                onSubmit={(event) => {
                                                                    event.preventDefault();
                                                                    handleEditTransportUnit(index, {
                                                                        name: event.target.name.value,
                                                                        location: event.target.location.value,
                                                                        capacity: event.target.capacity.value,
                                                                    });
                                                                }}>
                                                                <div className='inputField'>
                                                                    <input                         
                                                                        type="text"
                                                                        name="name"
                                                                        defaultValue={transportUnits[index].name}
                                                                    />
                                                                </div> 
                                                                <div className='inputField'>
                                                                    <input                         
                                                                        type="text"
                                                                        name="location"
                                                                        defaultValue={transportUnits[index].location}
                                                                    />
                                                                </div> 
                                                                <div className='inputField'>
                                                                    <input                         
                                                                        type="text"
                                                                        name="capacity"
                                                                        defaultValue={transportUnits[index].capacity}
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
                                                        <td data-cell='Nome: '>{TransportUnit.name}</td>
                                                        <td data-cell='Localização: '>{TransportUnit.location}</td>
                                                        <td data-cell='Capacidade: '>{TransportUnit.capacity}</td>
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
                                                                            onClick={() => submitDelete(TransportUnit.id)}>Apagar</button>
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
            }
        </>
    )
}

export default SupplierTransportUnit