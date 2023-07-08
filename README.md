<p align="center">
    <img src="https://pt.freelogodesign.org/assets/img/categories/10/logo-img-01.svg" width="250">
</p> 

# <h1 align="center">Suportar a comunidade local (Amazon Shop)</h1>
<h4 align="center">Projeto Final do curso de Tecnologias de Informação (2022/2023)</h4> 

<hr>

# Objetivo
O sistema deve informar os utilizadores de um mercado online sobre o impacto das suas encomendas na comunidade onde reside, bem a como a comercialização de produtos, devendo ajudar a escolher as opções que favoreçam fornecedores locais. <br>
Para o mesmo produto, podem existir vários fornecedores, uns na mesma freguesia, outros no mesmo município, ou distrito, ou país, ou continente, até fornecedores noutro continente, logo com um impacto muito reduzido ou nulo na comunidade local.

<hr> 

# Atores

Os atores que interagem com o sistema são, os seguintes:
* Consumidor: encomenda produtos a fornecedores.
* Fornecedor: informa sobre a gama de produtos e satisfaz as encomendas dos consumidores. <br>
Para além destes atores, são habitualmente considerados administradores de sistema bem como sistemas externos que oferecem serviços de autenticação de utilizadores, pagamentos online, mapas digitais, entre outros.
* Administradores: gere o sistema.

<hr> 

# Notas importantes sobre o sistema

* Para aceder ao sistema, os utilizadores devem usar um browser Web que comunica com um servidor aplicacional. 
* **Integridade dos dados**: O sistema garante a coerência e integridade dos dados, de acordo com as regras do negócio. 
* **Interoperabilidade**: O sistema tem uma API (REST por exemplo) que lhe permite interagir com outras aplicações.
* **Segurança – Autenticação e autorização**: O sistema e as redes estão cobertas por políticas de segurança que fazem uso de mecanismos de proteção de modo a impedir o acesso não autorizado a recursos e dados e também impedir a disrupção do serviço.
* **Lançamento para produção (deployment)**: O sistema tem um automatismo que permite lançá-lo em produção a partir de um repositório de código.
* **Escalabilidade**: O sistema têm uma capacidade ajustável para atender pedidos. 
* **Tolerância a faltas**: O sistema é tolerante a falha de qualquer dos seus componentes, através de principalmente oferecer redundância ativa. 
* **Disponibilidade**: O sistema responde a qualquer pedido dentro de um tempo razoável pré-definido. 
* **Tempo de resposta e desempenho**: O sistema tem um tempo de resposta e um desempenho adequados à expetativa dos utilizadores. 
* **Privacidade**: O sistema está de acordo com os regulamentos para a privacidade dos dados (RGPD).
* **Segurança - Configuração de firewall**: O sistema computacional e as redes estão cobertas por políticas de segurança que fazem uso dos mecanismos de proteção adequados de modo a impedir o acesso não-autorizado a recursos e dados e também impedir a disrupção do serviço. 
* **Elasticidade**: Capaz de adaptar-se a carga de trabalho através de provisionamento e desprovisionamento de recursos automaticamente 
* **Salvaguarda de dados**: Os dados são salvaguardados regularmente através de uma política adequada à importância dos dados e configurações.
* **Testes - carga e vulnerabilidade**: O sistema é desenvolvido com uma política integrada de testes que permitem ir testando à medida que se adicionam novos componentes ou que se alteram componentes existentes.

<hr> 

# Instruções
### (Instruções feitas para Linux ou Windows Wsl)

### Instalar dependências necessárias do client
```bash
cd client
```
```bash
yarn install
```

### Instalar dependências necessárias do server
```bash
cd server
```
```bash
npm install
```

### Docker compose 
**```Dentro do diretório principal```**

```bash
docker compose up -d
```

### Docker notes

**``` Outra opção mas mais demorada,opção sem docker compose ```** 

```bash
docker build -t {app-name} {path of docker file}
```

**```Se quiser apagar os containers, imagens e volumens, ou seja limpar tudo```** 

```bash 
docker system prune
```

```bash 
docker compose down --rmi all -v
```

<hr>


# Base de dados
### (Instruções para construir e gerir a base de dados)

### Criar as tabelas necessárias

```bash 
npm run db-tables-migrate
```

### Criar dados fake

```bash 
npm run db-tables-seed
```

### Limpar dados de todas as tabelas

```bash 
npm run db-tables-reset
```

### Apagar todas as tabelas

```bash 
npm run db-tables-delete
```

<hr>

# Utils

### Docker 
Conjunto de produtos de plataforma como serviço que usam virtualização de nível de sistema operacional para entregar software em pacotes chamados contêineres <br>
https://www.docker.com/ 

### Wsl Windows
Instalar nodejs no windows wsl
https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl

### DBeaver 
Aplicativo de software cliente SQL e uma ferramenta de administração de banco de dados <br>
https://dbeaver.io/download/

### Postman 
Plataforma de API para desenvolvedores projetar, construir, testar e iterar suas APIs <br>
https://www.postman.com/downloads/ 

### How to install mysql local 

Mac and Windows: https://www.mysql.com/downloads/

Linux 
```bash 
sudo apt-get install mysql-server 
```

<hr> 

# Visual Studio Tips 

**``` JavaScript (ES6) code snippets ```** <br>
This extension contains code snippets for JavaScript in ES6 syntax for Vs Code 

**``` Babel ES6/ES7 ```** <br>
Improves majorly on the grammar distributed by default with vscode. 

**``` Docker ```** <br>
Extension makes it easy to build, manage, and deploy containerized applications  

**``` Dev Containers ```** <br>
Extension lets you use a Docker container as a full-featured development environment.

**``` ES7 React/Redux/GraphQL/React-Native snippets ```** <br>
This extension provides you JavaScript and React/Redux snippets in ES7 with Babel plugin features for VS Code. 

**``` ES7+ React/Redux/React-Native snippets ```** <br>
JavaScript and React/Redux snippets in ES7+ with Babel plugin features

**``` Simple React Snippets ```** <br>
These snippets were selected carefully from my own day-to-day React use. 

**``` React Native Tools ```** <br>
Provides a development environment for React Native projects. Using this extension, you can debug your code and quickly run react-native commands from the command palette

**``` Search node_modules ```** <br>
Simple plugin for VS Code that allows you to quickly navigate the file inside your project's node_modules directory.

**``` ESLint ```** <br>
ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.

**``` Git History ```** <br>
Git History, Search and More (including git log)

**``` Git Project Manager ```** <br>
Git Project Manager (GPM) is a Microsoft VSCode extension that allows you to open a new window targeting a git repository directly from VSCode window

**``` GitLens — Git supercharged ```** <br>
GitLens supercharges Git inside VS Code and unlocks untapped knowledge within each repository. It helps you to visualize code authorship. 

**``` IntelliCode ```** <br>
Insights based on understanding your code context combined with machine learning. 

**``` Prettier - Code formatter ```** <br>
It enforces a consistent style by parsing your code and re-printing it 
