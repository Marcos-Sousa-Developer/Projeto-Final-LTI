import React, {useState} from 'react';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

import { Navbar, Footer, Modal, SubHeading } from '../../../components/index';
import './SupplierProdUnit.css';

const SupplierProdUnit = () => {
    const [productionUnits, setProductionUnits] = useState([]);
    const [newProductionUnit, setNewProductionUnit] = useState({ name: '', location: '', capacity: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState([]);
  
    function handleNewProductionUnitChange(event) {
      const { name, value } = event.target;
      setNewProductionUnit(prevState => ({ ...prevState, [name]: value }));
    }
  
    function handleNewProductionUnitSubmit(event) {
      event.preventDefault();
      // Add the new production unit to the list of production units stored in state
      setProductionUnits(prevState => [...prevState, newProductionUnit]);
      // Reset the form fields
      setNewProductionUnit({ name: '', location: '', capacity: '' });
      // Add a new element to the modalOpen array
      setModalOpen(prevState => [...prevState, false]);
    }
  
    function handleDeleteProductionUnit(index) {
      // Set the corresponding element of the modalOpen array to true
      setModalOpen(prevState => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }
  
    function handleConfirmDeleteProductionUnit(index) {
      // Create a new array with the production unit at the given index removed
      const updatedProductionUnits = productionUnits.filter((_, i) => i !== index);
      // Update the state with the new array
      setProductionUnits(updatedProductionUnits);
      // Set the corresponding element of the modalOpen array back to false
      setModalOpen(prevState => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
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

    return (
        <>
            <Navbar></Navbar>
            <div className='app__prod-unit main__container'>
                <SubHeading title="Unidade Produção"/>
                <form onSubmit={handleNewProductionUnitSubmit} className='app__prod-unit_add_new-unit'>
                    <div className='inputField'>
                        <p>Nome:</p>
                        <input                         
                            type="text"
                            name="name"
                            value={newProductionUnit.name}
                            onChange={handleNewProductionUnitChange}
                        />
                    </div> 
                    <div className='inputField'>
                        <p>Localização:</p>
                        <input                         
                            type="text"
                            name="location"
                            value={newProductionUnit.location}
                            onChange={handleNewProductionUnitChange}
                        />
                    </div> 
                    <div className='inputField'>
                        <p>Capacidade:</p>
                        <input                         
                            type="text"
                            name="capacity"
                            value={newProductionUnit.capacity}
                            onChange={handleNewProductionUnitChange}
                        />
                    </div> 
                    <button type="submit" className='main__action_btn'>Adicionar</button>
                </form>
                {productionUnits.length > 0 && (
                    <>
                        <p>Unidades Produção</p>
                        <table className='app__prod-unit_existing-units'>
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
                                <tr>
                                    <td>{productionUnit.name}</td>
                                    <td>{productionUnit.location}</td>
                                    <td>{productionUnit.capacity}</td>
                                    <td>
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
                                            <p>Tem a certeza que quer apagar esta unidade de produção?</p>
                                            <button onClick={() => setModalOpen(prevState => {
                                            const newState = [...prevState];
                                            newState[index] = false;
                                            return newState;
                                            })}>Cancelar</button>
                                            <button onClick={() => handleConfirmDeleteProductionUnit(index)}>Apagar</button>
                                        </Modal>
                                    </td>
                                </tr>
                                {editingIndex === index && (
                                    <tr>
                                        <td colSpan="3">
                                            <form onSubmit={(event) => {
                                            event.preventDefault();
                                            handleEditProductionUnit(index, {
                                                name: event.target.name.value,
                                                location: event.target.location.value
                                            });
                                            }}>
                                            <label>
                                                Nome:
                                                <input type="text" name="name" defaultValue={productionUnit.name} />
                                            </label>
                                            <label>
                                                Localização:
                                                <input type="text" name="location" defaultValue={productionUnit.location} />
                                            </label>
                                            <label>
                                                Capacidade:
                                                <input type="text" name="capacity" defaultValue={productionUnit.capacity} />
                                            </label>
                                            <button type="submit" className='main__action_btn'>Guardar</button>
                                            <button type="button" className='main__action_btn' onClick={() => setEditingIndex(null)}>Cancel</button>
                                            </form>
                                        </td>
                                    </tr>
                                )}
                                </React.Fragment>
                            ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
            <Footer></Footer>
        </>
    )
}

export default SupplierProdUnit