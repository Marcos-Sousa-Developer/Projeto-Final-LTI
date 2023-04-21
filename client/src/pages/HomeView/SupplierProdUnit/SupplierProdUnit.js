import React, {useState} from 'react';

import { Navbar, Footer, Modal, SubHeading } from '../../../components/index';

const SupplierProdUnit = () => {
    const [productionUnits, setProductionUnits] = useState([]);
    const [newProductionUnit, setNewProductionUnit] = useState({ name: '', location: '' });
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
      setNewProductionUnit({ name: '', location: '' });
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
            <div className='main__container'>
                <SubHeading title="Unidade Produção"/>
                {productionUnits.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productionUnits.map((productionUnit, index) => (
                        <React.Fragment key={index}>
                        <tr>
                            <td>{productionUnit.name}</td>
                            <td>{productionUnit.location}</td>
                            <td>
                                <button onClick={() => setEditingIndex(index)}>Edit</button>
                                <button onClick={() => setModalOpen(prevState => {
                                    const newState = [...prevState];
                                    newState[index] = true;
                                    return newState;
                                })}>Delete</button>
                                <Modal open={modalOpen[index]} onClose={() => setModalOpen(prevState => {
                                    const newState = [...prevState];
                                    newState[index] = false;
                                    return newState;
                                })}>
                                    <p>Are you sure you want to delete this production unit?</p>
                                    <button onClick={() => setModalOpen(prevState => {
                                    const newState = [...prevState];
                                    newState[index] = false;
                                    return newState;
                                    })}>Cancel</button>
                                    <button onClick={() => handleConfirmDeleteProductionUnit(index)}>Delete</button>
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
                                    Name:
                                    <input type="text" name="name" defaultValue={productionUnit.name} />
                                </label>
                                <label>
                                    Location:
                                    <input type="text" name="location" defaultValue={productionUnit.location} />
                                </label>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditingIndex(null)}>Cancel</button>
                                </form>
                            </td>
                            </tr>
                        )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                )}
                <h2>Adicionar nova unidade</h2>
                <form onSubmit={handleNewProductionUnitSubmit}>
                    <label>
                    Nome:
                    <input
                        type="text"
                        name="name"
                        value={newProductionUnit.name}
                        onChange={handleNewProductionUnitChange}
                    />
                    </label>
                    <label>
                    Localização:
                    <input
                        type="text"
                        name="location"
                        value={newProductionUnit.location}
                        onChange={handleNewProductionUnitChange}
                    />
                    </label>
                    <button type="submit">Create</button>
                </form>
            </div>
            <Footer></Footer>
        </>
    )
}

export default SupplierProdUnit