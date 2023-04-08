export const teste = [
    {
        name: "Agricultura e Alimentos",
        subcategories: [
            { 
                name: "Arroz, Massa e Farinha",
                subsubcategories: [
                    "Arroz",
                    "Massa",
                    "Farinha e Pão Ralado",
                    "Feijão, Grão de Bico",
                    "Outros"
                ]
            },
            { 
                name: "Padaria e Pastelaria",
                subsubcategories: [
                    "Padaria",
                    "Pastelaria"
                ]
            },
            { 
                name: "Azeite, Óleo e Vinagre",
                subsubcategories: [
                    "Azeite",
                    "Óleo Alimentar",
                    "Vinagre"
                ]
            },
            { 
                name: "Frutas e Legumes",
                subsubcategories: [
                    "Frutas",
                    "Legumes",
                    "Frutos Secos",
                    "Sementes"
                ]
            },
            { 
                name: "Peixaria e Talho",
                subsubcategories: [
                    "Peixaria",
                    "Talho"
                ]
            },
            { 
                name: "Outros produtos",
                subsubcategories: [
                    "Outros Produtos Agricolas",
                    "Outros Produtos Alimentares"
                ]
            }
        ],
        features: [
            {
                LocaldeProducao: "",
                Validade: "date"
            }
        ]
        },
        {
            name: "Animais",
            subcategories: [
                { 
                    name: "Cão",
                    subsubcategories: [
                        "Alimentação",
                        "Saúde e Higiene",
                        "Acessórios para cão",
                        "Outros"
                    ]
                },
                { 
                    name: "Gato",
                    subsubcategories: [
                        "Alimentação",
                        "Saúde e Higiene",
                        "Acessórios para gato",
                        "Outros"
                    ]
                },
                { 
                    name: "Outros Animais",
                    subsubcategories: [
                        "Alimentação",
                        "Saúde e Higiene",
                        "Acessórios",
                        "Outros"
                    ]
                }
            ],
            features: [
                {
                    Marca: "",
                    Estado: ["Novo","Usado"]
                }
            ]
        },
        {
            name: "Bebé e Criança",
            subcategories: [
                { 
                    name: "Calçado",
                    subsubcategories: [
                        "Calçado Menino",
                        "Calçado Menina"
                    ],
                },
                { 
                    name: "Roupinhas",
                    subsubcategories: [
                        "Roupinhas Menino",
                        "Roupinhas Menina"
                    ],
                },
                { 
                    name: "Passeio",
                    subsubcategories: [
                        "Carrinhos de bebé",
                        "Cadeiras para automóvel"
                    ]
                },
                { 
                    name: "Relaxar e Dormir",
                    subsubcategories: [
                        "Berço e camas",
                        "Mantas",
                        "Almofadas"
                    ]
                },
                { 
                    name: "Refeição e utensilios",
                    subsubcategories: [
                        "Biberão",
                        "Chupetas",
                        "Utensilios"          
                    ]
                }
            ],
            features: [
                {
                    Marca: "",
                    Estado: ["Novo","Usado"]
                }
            ]
    },
    {
        name: "Carros, motos e barcos",
        subcategories: [
            { 
                name: "Mecância e Acessórios auto",
                subsubcategories: [
                    "Peças auto",
                    "Filtros",
                    "Acessórios auto",
                    "Outros"
                ]
            },
            { 
                name: "Pneus",
                subsubcategories: [
                    "Categoria A1",
                    "Categoria A2",
                    "Categoria C",
                    "Categoria CE",
                    "Categoria D",
                    "Categoria DE",
                    "Categoria F",
                    "Outros"
                ]
            },
            { 
                name: "Ferramentas",
                subsubcategories: [
                    "Chaves",
                    "Tecnologia em mecânica",
                    "Outras Ferramentas"
                ]
            }
        ],
        features: [
            {
                Marca: "",
                Estado: ["Novo","Usado"]
            }
        ]
    },
    {
        name: "Desportos",
        subcategories: [
            { 
                name: "Deporto",
                subsubcategories: [
                    "Futebol",
                    "Futsal",
                    "Surf e Bodyboard",
                    "Caminhada, Corrida e Atletismo",
                    "Patins, Skates e Trotinetes",
                    "Musculação e Fitness",
                    "Desportos de Combate",
                    "Outros Desportos"
                ]
            }
        ],
        features: [
            {
                Marca: "",
                Estado: ["Novo","Usado"],
                Garantia: ""
            }
        ]
    },
    {
        name: "Eletrodomésticos",
        subcategories: [
            { 
                name: "Grandes Domésticos",
                subsubcategories: [
                    "Frigoríficos e Arcas", 
                    "Máquinas de Roupa",            
                    "Máquinas de Loiça",   
                    "Eletrodomésticos de Encastre",
                    "Ar Condicionado",
                    "Fogões",    
                    "Painéis Solares" 
                ]
            },
            { 
                name: "Pequenos Domésticos",
                subsubcategories: [
                    "Micro-ondas e Mini Fornos",  
                    "Máquinas de Café",           
                    "Preparação de Alimentos",       
                    "Aspiradores e Máquinas de Limpeza",
                    "Aquecedores e Ventoinhas",
                    "Qualidade do Ar",
                    "Aquecimento de Água"
                ]
            } 
        ],
        features: [
            {
                Marca: "",
                Estado: ["Novo","Usado"],
                Garantia: "",
                ClasseEnergetica: ""
            }
        ]
    },
    {
        name: "Lazer",
        subcategories: [
            { 
                name: "Brinquedos e Jogos",
                subsubcategories: [
                    "Veículos e Circuitos",
                    "Jogos de Cartas e Tabuleiros",
                    "Legos e Puzzles",
                    "Bonecos e Figuras",
                    "Bonecas e Peluches",
                    "Brinquedos para Bebés",
                    "Drones e Acessórios",
                    "Outros"
                ]
            },
            { 
                name: "Instrumentos musicais",
                subsubcategories: [
                    "Guitarras e Baixos",
                    "Som, Audio e Equipamento DJ",
                    "Instrumentos Tradicionais",
                    "Pianos e Teclados",
                    "Instrumentos de Sopro",
                    "Baterias e Percussão",
                    "Acessórios para Instrumentos Musicais",
                    "Outros"
                ]
            },
            { 
                name: "Livros - Revistas",
                subsubcategories: [
                    "Livros Escolares",
                    "Arte",
                    "Banda Desenhada",
                    "Ciências",
                    "Desporto",
                    "Dicionários",
                    "Direito",
                    "Educação",
                    "Enciclopédias",
                    "Engenharia",
                    "Gastronomia",
                    "Gestão",
                    "História",
                    "Informática",
                    "Livros Escolares",
                    "Literatura Internacional",
                    "Literatura Portuguesa",
                    "Mapas",
                    "Política",
                    "Práticos",
                    "Religião",
                    "Revistas",
                    "Saúde",
                    "Viagens",
                    "Outros"
                ]
            },
            { 
                name: "Colecções - Antiguidades",
                subsubcategories: [
                    "Notas, Moedas e Medalhas",
                    "Cartas, Selos e Postais",
                    "Cadernetas e Cromos",
                    "Porta-Chaves, Isqueiros e Cinzeiros",
                    "Máquinas Coleccionáveis",
                    "Calendários e Posters",
                    "Outras"
                ]
            },
            { 
                name: "Bilhetes",
                subsubcategories: [
                    "Bilhetes para festivais",
                    "Bilhetes para espetáculos"
                ]
            },
            { 
                name: "Discos, DVD, CD",
                subsubcategories: [
                    "DVD - Filmes",
                    "Discos Vinil",
                    "CDS - Música"
                ]
            }
        ],
        features: [
            {
                Marca: "",
                Estado: ["Novo","Usado"]
            }
        ]
    },
    {
        name: "Moda",
        subcategories: [
            { 
                name: "Roupa",
                subsubcategories: [
                    "Homem",
                    "Mulher"
                ],
            },
            { 
                name: "Calçado",
                subsubcategories: [
                    "Homem",
                    "Mulher"
                ],
            },
            { 
                name: "Malas e Acessórios",
                subsubcategories: [
                    "Carteiras",
                    "Mochilas",
                    "Bolsas",
                    "Malas",
                    "Malas de Viagem",
                    "Óculos de Sol",
                    "Outras"
                ],
            },
            { 
                name: "Jóias, Relógios e Bijuteria",
                subsubcategories: [
                    "Relógios",
                    "Colares e Pendentes",
                    "Brincos",
                    "Pulseiras",
                    "Anéis",
                    "Outras"
                ],
            },
            { 
                name: "Saúde e Beleza",
                subsubcategories: [
                    "Cabelo",
                    "Cuidado De Mãos",
                    "Cuidado De Pés",
                    "Cuidado De Rosto",
                    "Cuidado Para O Corpo",
                    "Higiene Oral",
                    "Maquilhagem",
                    "Perfumes",
                    "Outros"
                ],
            }
        ],
        features: [
            {
                Marca: "",
                Estado: ["Novo","Usado"]
            }
        ]
    },
    {
        name: "Móveis, Casa e Jardim",
        subcategories: [
            { 
                name: "Utilidades e Decoração",
                subsubcategories: [
                    "Iluminação",
                    "Loiça e Acessórios",
                    "Quadros e Molduras",
                    "Têxteis",
                    "Cestas e Caixas de Arrumação",
                    "Espelhos",
                    "Velas e Cinzeiros",
                    "Relógios e Estatuetas",
                    "Almofadas",
                    "Outros"
                ]
            },
            { 
                name: "Jardim e Bricolage",
                subsubcategories: [
                    "Cortadores de Relva e Sistemas de Rega",
                    "Mobiliário de Jardim",
                    "Redes, Vedações e Portões",
                    "Vasos, Floreiras e Suportes",
                    "Piscinas e Acessorios",
                    "Churrasqueiras, Grelhadores e Acessórios",
                    "Adubos e Substratos",
                    "Outros"
                ]
            },
            { 
                name: "Móveis",
                subsubcategories: [
                    "Mesas e Secretárias",
                    "Sofás, Cadeirões e Poltronas",
                    "Cabeceiras, Camas e Colchões",
                    "Cadeiras e Bancos",
                    "Divisões Completas e Conjuntos",
                    "Estantes, Prateleiras e Vitrines",           
                    "Armários e Roupeiros",       
                    "Aparadores e Consolas",
                    "Cómodas e Camiseiros",  
                    "Móveis para TV e Multimédia", 
                    "Móveis WC",
                    "Cabides, Bengaleiros e Sapateiras",
                    "Louceiros e Cristaleiras",
                    "Bares e Garrafeiras",
                    "Outros"
                ]
            }
        ],
        features: [
            {
                Marca: "",
                Estado: ["Novo","Usado"]
            }
        ]
    },
    {
        name: "Tecnologia",
        subcategories: [
            { 
                name: "Videojogos e Consolas",
                subsubcategories: [
                    "Videojogos",
                    "Consolas",
                    "Acessórios Gaming"
                ]
            },
            { 
                name: "Computadores e Informática",
                subsubcategories: [
                    "Apple",
                    "Computadores",  //Processador, ram, sistema operativo, armazenamento, tipo de armazenamento
                    "Fotocopiadoras",
                    "Impressoras",
                    "Monitores",    //Polegadas, resolução
                    "Portáteis",    //Tamanho de ecrã
                    "Projectores",  //Tamanho de ecrã
                    "Redes",
                    "Scanners",
                    "Servidores",   //armazenamento
                    "Software",     //tipo de software
                    "Outros"
                ]
            },
            { 
                name: "Acessórios para Informática",
                subsubcategories: [
                    "Acessórios",
                    "Acessórios para Portáteis",
                    "Armazenamento",    //tamanho de armazenamento
                    "Componentes",
                    "Consumíveis Impressora",
                    "Discos Externos",  //tamanho de armazenamento, SSD ou HDD
                    "Discos Rígidos",   //tamanho de armazenamento
                    "Periféricos",
                    "Processadores",
                    "Outros"
                ]
            },
            { 
                name: "TV, Som e Fotografia",
                subsubcategories: [
                    "Tv", //Polegadas, resolução
                    "Som",
                    "Fotografia"
                ]
            },
            { 
                name: "Telemóveis e Tablets",
                subsubcategories: [
                    "Telemóveis",
                    "Tablets",
                    "Acessórios"
                ],
                features: [
                    {
                        SistemaOperativo: ["Android", "iOS", "Windows Phone", "BlackBerry OS", "Harmony OS", "Nenhum"],
                    }
                ]
            }       
        ],
        features: [
            {
                Marca: "",
                Estado: ["Novo","Usado"],
                Garantia: ""
            }
        ]
    },
    {
        name: "Outras Vendas",
        subcategories: [
            { 
                name: "Outros artigos",
                subsubcategories: [
                    "Material Escolar",
                    "Outros Artigos"
                ]
            }      
        ],
        features: [
            {
                Marca: "",
                Estado: ["Novo","Usado"]
            }
        ]
    }  
]