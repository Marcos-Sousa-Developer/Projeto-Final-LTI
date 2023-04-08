import React from 'react'

const SubFeatures = ({formData, setFormData}) => {

    const handleSubFeaturesChange = (index, field, value) => {
        const updatedSubFeatures = [...formData.sub_features];
        updatedSubFeatures[index][field] = value;
        setFormData({ ...formData, sub_features: updatedSubFeatures });
    };

    const subcategoria = formData.subcategoria;
    const subsubcategoria = formData.subsubcategoria;

    return (
        <div className='app__anuncio_sub_features'>
            {/*Validade da alimentação dos animais*/}
                {subsubcategoria === "Alimentação" &&
                    <>
                        <div className='inputField'>
                            <p>Validade:</p>
                            <input 
                                type="date"
                                value={formData.sub_features.find(sub_feature => sub_feature.Validade)?.Validade || ''}
                                onChange={(e) => {
                                  const updatedSubFeature = {...formData.sub_features[0]};
                                  updatedSubFeature.Validade = e.target.value;
                                  const updatedSubFeatures = [...formData.sub_features];
                                  updatedSubFeatures[0] = updatedSubFeature;
                                  setFormData({ ...formData, sub_features: updatedSubFeatures });
                                }}
                            ></input>
                        </div>
                    </> 
                }
            {/*Género do calçado e roupas dos bébés*/}
                {subcategoria === "Calçado" || subcategoria === "Roupinhas" ?
                    <>
                        <div className='inputField'>
                            <p>Género:</p>
                            <select  
                                value={formData.sub_features[0]?.Gender || ""}
                                onChange={(e) => {
                                    const updatedFeature = { ...formData.sub_features[0] };
                                    updatedFeature.Gender = e.target.value;
                                    const updatedFeatures = [...formData.sub_features];
                                    updatedFeatures[0] = updatedFeature;
                                    setFormData({ ...formData, sub_features: updatedFeatures });
                                }}
                            >
                                <option value="">Escolher</option>
                                <option value="Menino">Menino</option>
                                <option value="Menina">Menina</option>
                            </select>
                        </div>
                    </>
                : 
                    null
                }
            {/*Medidas dos móveis*/}
                {subcategoria === "Móveis" &&
                    <>
                        <div className='inputField'>
                            <p>Largura:</p>
                            <input 
                                type="number"
                                value={formData.sub_features.find(sub_feature => sub_feature.Largura)?.Largura || ''}
                                onChange={(e) => {
                                  const updatedSubFeature = {...formData.sub_features[0]};
                                  updatedSubFeature.Largura = e.target.value;
                                  const updatedSubFeatures = [...formData.sub_features];
                                  updatedSubFeatures[0] = updatedSubFeature;
                                  setFormData({ ...formData, sub_features: updatedSubFeatures });
                                }}
                            ></input>
                        </div>
                        <div className='inputField'>
                            <p>Comprimento:</p>
                            <input 
                                type="number"
                                value={formData.sub_features.find(sub_feature => sub_feature.Comprimento)?.Comprimento || ''}
                                onChange={(e) => {
                                  const updatedSubFeature = {...formData.sub_features[0]};
                                  updatedSubFeature.Comprimento = e.target.value;
                                  const updatedSubFeatures = [...formData.sub_features];
                                  updatedSubFeatures[0] = updatedSubFeature;
                                  setFormData({ ...formData, sub_features: updatedSubFeatures });
                                }}
                            ></input>
                        </div>
                    </>
                }
            {/*Especificações dos computadores*/}
                {subsubcategoria === "Computadores" &&
                    <>
                        <div className='inputField'>
                            <p>Processador:</p>
                            <input 
                                type='text'
                                value={formData.sub_features.find(sub_feature => sub_feature.Processador)?.Processador || ''}
                                onChange={(e) => {
                                  const updatedSubFeature = {...formData.sub_features[0]};
                                  updatedSubFeature.Processador = e.target.value;
                                  const updatedSubFeatures = [...formData.sub_features];
                                  updatedSubFeatures[0] = updatedSubFeature;
                                  setFormData({ ...formData, sub_features: updatedSubFeatures });
                                }}
                            ></input>
                        </div>
                        <div className='inputField'>
                            <p>Memória RAM:</p>
                            <select  
                                value={formData.sub_features[0]?.MemoryRAM || ""}
                                onChange={(e) => {
                                    const updatedFeature = { ...formData.sub_features[0] };
                                    updatedFeature.MemoryRAM = e.target.value;
                                    const updatedFeatures = [...formData.sub_features];
                                    updatedFeatures[0] = updatedFeature;
                                    setFormData({ ...formData, sub_features: updatedFeatures });
                                }}
                            >
                                <option value="">Escolher</option>
                                <option value="1GB">1GB</option>
                                <option value="2GB">2GB</option>
                                <option value="4GB">4GB</option>
                                <option value="8GB">8GB</option>
                                <option value="16GB">16GB</option>
                                <option value="32GB">32GB</option>
                                <option value="64GB">64GB</option>
                            </select>
                        </div>
                        <div className='inputField'>
                            <p>Sistema operativo:</p>
                            <select  
                                value={formData.sub_features[0]?.OperatingSystem || ""}
                                onChange={(e) => {
                                    const updatedFeature = { ...formData.sub_features[0] };
                                    updatedFeature.OperatingSystem = e.target.value;
                                    const updatedFeatures = [...formData.sub_features];
                                    updatedFeatures[0] = updatedFeature;
                                    setFormData({ ...formData, sub_features: updatedFeatures });
                                }}
                            >
                                <option value="">Escolher</option>
                                <option value="Microsoft Windows">Microsoft Windows</option>
                                <option value="MacOS">MacOS</option>
                                <option value="Linux">Linux</option>
                            </select>
                        </div>
                    </>
                }
            {/*Especificações dos Monitores e Tv*/}
                {subsubcategoria === "Tv" || subsubcategoria === "Projectores" || subsubcategoria === "Portáteis" || subsubcategoria === "Monitores" ?
                    <>
                        <div className='inputField'>
                            <p>Resolução:</p>
                            <select  
                                value={formData.sub_features[0]?.Resolution || ""}
                                onChange={(e) => {
                                    const updatedFeature = { ...formData.sub_features[0] };
                                    updatedFeature.Resolution = e.target.value;
                                    const updatedFeatures = [...formData.sub_features];
                                    updatedFeatures[0] = updatedFeature;
                                    setFormData({ ...formData, sub_features: updatedFeatures });
                                }}
                            >
                                <option value="">Escolher</option>
                                <option value="1920x1080 (Full HD)">1920x1080 (Full HD)</option>
                                <option value="2560x1440 (QHD)">2560x1440 (QHD)</option>
                                <option value="3440x1440 (WQHD)">3440x1440 (WQHD)</option>
                                <option value="3840x1600 (WQHD+)">3840x1600 (WQHD+)</option>
                                <option value="3840x2160 (4K Ultra HD)">3840x2160 (4K Ultra HD)</option>
                                <option value="7860x4320 (8K Ultra HD)">7860x4320 (8K Ultra HD)</option>
                            </select>
                        </div>
                    </>
                : 
                    null
                }
            {/*Especificações dos portáteis, projectores, Tv e Monitores*/}
                {subsubcategoria === "Portáteis" || subsubcategoria === "Monitores" ?
                    <>
                        <div className='inputField'>
                            <p>Tamanho de ecrã:</p>
                            <select  
                                value={formData.sub_features[0]?.ScreenSize || ""}
                                onChange={(e) => {
                                    const updatedFeature = { ...formData.sub_features[0] };
                                    updatedFeature.ScreenSize = e.target.value;
                                    const updatedFeatures = [...formData.sub_features];
                                    updatedFeatures[0] = updatedFeature;
                                    setFormData({ ...formData, sub_features: updatedFeatures });
                                }}
                            >
                                <option value="">Escolher</option>
                                <option value="-21''">-21''</option>
                                <option value="24''">24''</option>
                                <option value="27''">27''</option>
                                <option value="28''">28''</option>
                                <option value="29''">29''</option>
                                <option value="31.5''">31.5''</option>
                                <option value="32''">32''</option>
                                <option value="34''">34''</option>
                                <option value="+38''">+38''</option>
                            </select>
                        </div>
                    </>
                : 
                    null
                }
                {subsubcategoria === "Projetores" || subsubcategoria === "Tv" ?
                    <>
                        <div className='inputField'>
                            <p>Tamanho de ecrã:</p>
                            <select  
                                value={formData.sub_features[0]?.ScreenSize || ""}
                                onChange={(e) => {
                                    const updatedFeature = { ...formData.sub_features[0] };
                                    updatedFeature.ScreenSize = e.target.value;
                                    const updatedFeatures = [...formData.sub_features];
                                    updatedFeatures[0] = updatedFeature;
                                    setFormData({ ...formData, sub_features: updatedFeatures });
                                }}
                            >
                                <option value="">Escolher</option>
                                <option value="-27''">-27''</option>
                                <option value="32''">32''</option>
                                <option value="43''">43''</option>
                                <option value="50''">50''</option>
                                <option value="55''">55''</option>
                                <option value="65''">65''</option>
                                <option value="75''">75''</option>
                                <option value="85''">85''</option>
                                <option value="+100''">+100''</option>
                            </select>
                        </div>
                    </>
                : 
                    null
                }
            {/*Especificações do Software*/}
                {subsubcategoria === "Software"  &&
                    <>
                        <div className='inputField'>
                            <p>Tipo de software:</p>
                            <input
                                type="text"
                                value={formData.sub_features.find(sub_feature => sub_feature.Validade)?.Validade || ''}
                                onChange={(e) => {
                                  const updatedSubFeature = {...formData.sub_features[0]};
                                  updatedSubFeature.Validade = e.target.value;
                                  const updatedSubFeatures = [...formData.sub_features];
                                  updatedSubFeatures[0] = updatedSubFeature;
                                  setFormData({ ...formData, sub_features: updatedSubFeatures });
                                }}                            
                            ></input>
                        </div>
                    </>
                }
            {/*Especificações do Armazenamento, Discos Externos, Internos, Servidores e Computadores*/}
                {subsubcategoria === "Armazenamento" || subsubcategoria === "Discos Externos"  || subsubcategoria === "Discos Internos" || subsubcategoria === "Servidores" || subsubcategoria === "Computadores" ?
                    <>
                        <div className='inputField'>
                            <p  style={{margin:'0 0 8px 0'}}>Capacidade de armazenamento:</p>
                            <select  
                                value={formData.sub_features[0]?.StorageAmount || ""}
                                onChange={(e) => {
                                    const updatedFeature = { ...formData.sub_features[0] };
                                    updatedFeature.StorageAmount = e.target.value;
                                    const updatedFeatures = [...formData.sub_features];
                                    updatedFeatures[0] = updatedFeature;
                                    setFormData({ ...formData, sub_features: updatedFeatures });
                                }}
                            >
                                <option value="">Escolher</option>
                                <option value="120GB">120GB</option>
                                <option value="256GB">250GB</option>
                                <option value="480GB">480GB</option>
                                <option value="500GB">500GB</option>
                                <option value="512GB">512GB</option>
                                <option value="960GB">960GB</option>
                                <option value="1TB">1TB</option>
                                <option value="2TB">2TB</option>
                                <option value="4TB">4TB</option>
                                <option value="+6TB">+6TB</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                    </>
                :
                    null
                }
            {/*Especificações dos Discos Externos, Internos e Computadores*/}
                {subsubcategoria === "Discos Externos"  || subsubcategoria === "Discos Internos" || subsubcategoria === "Computadores" ?
                    <>
                        <div className='inputField'>
                            <p style={{margin:'0 0 8px 0'}}>Tipo de armazenamento:</p>
                            <select  
                                value={formData.sub_features[0]?.StorageType || ""}
                                onChange={(e) => {
                                    const updatedFeature = { ...formData.sub_features[0] };
                                    updatedFeature.StorageType = e.target.value;
                                    const updatedFeatures = [...formData.sub_features];
                                    updatedFeatures[0] = updatedFeature;
                                    setFormData({ ...formData, sub_features: updatedFeatures });
                                }}
                            >
                                <option value="">Escolher</option>
                                <option value="SSD">SSD</option>
                                <option value="HDD">HDD</option>
                            </select>
                        </div>
                    </>
                : 
                    null
                }
            {/*Especificações dos Telemóveis e Tablets*/}
                {subsubcategoria === "Telemóveis" || subsubcategoria === "Tablets"  ? 
                    <>
                        <div>
                            <p>Sistema operativo:</p>
                            <select 
                                value={formData.sub_features[0]?.OperatingSystem || ""}
                                onChange={(e) => {
                                    const updatedFeature = { ...formData.sub_features[0] };
                                    updatedFeature.OperatingSystem = e.target.value;
                                    const updatedFeatures = [...formData.sub_features];
                                    updatedFeatures[0] = updatedFeature;
                                    setFormData({ ...formData, sub_features: updatedFeatures });
                                }}
                            >
                                <option value="">Escolher</option>
                                <option value="Android">Android</option>
                                <option value="iOS">iOS</option>
                                <option value="Windows Phone">Windows Phone</option>
                                <option value="BlackBerry OS">BlackBerry OS</option>
                                <option value="Harmony OS">Harmony OS</option>
                                <option value="Nenhum">Nenhum</option>
                            </select>
                        </div>
                    </>
                : 
                    null
                }
        </div>
    )
}

export default SubFeatures