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
              "Outros em Arroz, Massa e Farinha"
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
              "Outros Produtos em Agricultura",
              "Outros Produtos em Alimentos"
            ]
          }
        ],
        features: [
          {
            "Local de Produção": "",
            "Validade": "date"
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
              "Outros cães"
            ]
          },
          { 
            name: "Gato",
            subsubcategories: [
              "Alimentação",
              "Saúde e Higiene",
              "Acessórios para gato",
              "Outros em Gatos"
            ]
          },
          { 
            name: "Outros Animais",
            subsubcategories: [
              "Alimentação",
              "Saúde e Higiene",
              "Acessórios",
              "Outros em Animais"
            ]
          }
        ],
        features: [
          {
            "Marca": "",
            "Estado": ["Novo","Usado"]
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
            features: [
              {
                "Género": ["Menino","Menina"]
              }
            ]
          },
          { 
            name: "Roupinhas",
            subsubcategories: [
              "Calçado Menino",
              "Calçado Menina"
            ],
            features: [
              {
                "Género": ["Menino","Menina"]
              }
            ]
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
            name: "Refeição e Utensílios",
            subsubcategories: [
              "Biberão",
              "Chupetas",
              "Utensílios"          
            ]
          }
        ],
        features: [
          {
            "Marca": "",
            "Estado": ["Novo","Usado"]
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
              "Outros em Mecância e Acessórios auto"
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
              "Outros pneus"
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
            "Marca": "",
            "Estado": ["Novo","Usado"]
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
            "Marca": "",
            "Estado": ["Novo","Usado"]
          }
        ]
      },
    
    
      {
          name: "Eletrodomésticos",
          subcategories: [
            { 
              name: "Grandes Eletrodomésticos",
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
              name: "Pequenos Eletrodomésticos",
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
              "Marca": "",
              "Estado": ["Novo","Usado"],
              "Garantia": ""
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
              "Outros Brinquedos e Jogos"
            ]
          },
          { 
            name: "Instrumentos Musicais",
            subsubcategories: [
              "Guitarras e Baixos",
              "Som, Audio e Equipamento DJ",
              "Instrumentos Tradicionais",
              "Pianos e Teclados",
              "Instrumentos de Sopro",
              "Baterias e Percussão",
              "Acessórios para Instrumentos Musicais",
              "Outros Instrumentos Musicais"
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
              "Outros não listados"
            ],
            features: [
              {
                "Auto": ""
              }
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
              "Outras Colecções e Antiguidades"
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
            "Marca": "",
            "Estado": ["Novo","Usado"]
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
            features: [
              {
                "Género": ["Homem","Mulher"]
              }
            ]
          },
          { 
            name: "Calçado",
            subsubcategories: [
              "Homem",
              "Mulher"
            ],
            features: [
              {
                "Género": ["Homem","Mulher"]
              }
            ]
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
              "Outras Malas e Acessórios"
            ],
            features: [
              {
                "Género": ["Homem","Mulher"]
              }
            ]
          },
          { 
            name: "Jóias, Relógios e Bijuteria",
            subsubcategories: [
              "Relógios",
              "Colares e Pendentes",
              "Brincos",
              "Pulseiras",
              "Anéis",
              "Outras Jóias, Relógios e Bijuteria"
            ],
            features: [
              {
                "Género": ["Homem","Mulher"]
              }
            ]
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
              "Outros em Saúde e Beleza"
            ],
            features: [
              {
                "Género": ["Homem","Mulher"]
              }
            ]
          }
        ],
        features: [
          {
            "Marca": "",
            "Estado": ["Novo","Usado"]
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
              "Outros Utilidades e Decoração"
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
              "Outros em Jardim e Bricolage"
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
              "Outros Móveis"
            ]
          }
        ],
        features: [
          {
            "Marca": "",
            "Estado": ["Novo","Usado"]
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
              "Computadores",
              "Fotocopiadoras",
              "Impressoras",
              "Monitores",
              "Portáteis",
              "Projectores",
              "Redes",
              "Scanners",
              "Servidores",
              "Software",
              "Outros Computadores e Informática"
            ]
          },
          { 
            name: "Acessórios para Informática",
            subsubcategories: [
              "Acessórios",
              "Acessórios para Portáteis",
              "Armazenamento",
              "Componentes",
              "Consumíveis Impressora",
              "Discos Externos",
              "Discos Rígidos",
              "Periféricos",
              "Processadores",
              "Outros Accesórios de Computadores e Informática"
            ]
          },
          { 
            name: "TV, Som e Fotografia",
            subsubcategories: [
              "Tv",
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
            ]
          }       
        ],
        features: [
          {
            "Marca": "",
            "Estado": ["Novo","Usado"]
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
            "Marca": "",
            "Estado": ["Novo","Usado"]
          }
        ]
      }  
]