<p align="center">
    <img src="https://pt.freelogodesign.org/assets/img/categories/10/logo-img-01.svg" width="250">
</p> 

# <h1 align="center">Suportar a comunidade local</h1>
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
De seguida são apresentados 3 passos, que consiste em formas de rodar o código e interagir com o sistema. <br>
O **1ºpasso** consiste em como funciona o **react.js** e o **express.js**, também é apresentado um link de instalação para o nodejs. No fundo é uma primeira abordagem para os iniciantes, não há interação com o codigo disponível. <br>
No **2ºpasso** onde há interação com o código disponível, é o "default", ou melhor dizendo é a abordagem normal, com comandos de nodejs executados através do terminal e com chamadas ao **npm** e **npx**. <br>
O último passo que é o **3ºpasso**, consiste no uso do Docker de modo a automatizar a implementação da aplicação (ou de conjuntos de processos que constituem uma app) dentro de um ambiente de container, ou seja automatiza o 2ºpasso.  

## 1ºPasso: Get Started, how it works. 
**```Este passo como dito anteriormente é opcional, serve para instalar o nodejs e para conhecer o React.js e o Express.js, libray e framework respetivamente, que são usados para a construção do sistema.```** <br>

[Ir para o 2ºPasso ](#passo2)

### 1.1 Instalar o <a href="https://nodejs.org/en/download/"> nodejs </a> no computador. 

### 1.2 Criar o diretório principal 
```bash
mkdir your_folder_name
```
```bash
cd your_folder_name
```
### 1.3 Criar uma app React 
Criar uma app React cujo o nome é cliente
```bash
npx create-react-app client
```
Trocar para o diretório client
```bash
cd client
```
### 1.4 Iniciar app React
Iniciar a aplicação, que irá correr no http://localhost:3000/ (por default abre sozinho).
```bash
npm start
``` 

### 1.5 Criar o servidor <br>
**```Dentro do diretório principal```** 

Criar o ficheiro **package.json**
```bash
npm init -y npm
```

### 1.6 Alteração do package.json
**```Atenção esta parte, não é obrigatória, é apenas convenção!!```** <br>

Dentro do ficheiro **package.json**:<br>
Trocar a linha **```"main":"index.js"```** para **```"main":"server.js"```**

### 1.7 Criar o server
Criar o ficheiro **server.js**:
```bash
touch server.js
```
Instalar o express:
```bash
npm i express
``` 
Adicionar o seguinte código no **server.js** 
```diff 
const express = require('express');
const app = express(); 
const port = process.env.PORT || 5000;  

// create a GET route
app.get('/api', (req, res) => { //Line 9
    res.send({ express: 'HELLO WORLD, YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 
```
### 1.8 Iniciar o server
Iniciar o server, que irá correr no http://localhost:5000/api.
```bash
node server.js
``` 
## <span id="passo2"> 2ºPasso: </span> Inside the project **```(após clone do repositório)```**

### 2.1  Inicializar o server
Dentro da pasta **server**, instalar as dependências do node.
```bash
npm install
``` 
Para automaticamente detetar alterações no servidor e aplicá-lo sem ter a necessidade de reiniciar o server, **instalar o nodemon**. <br>

**```Este comando não é obrigatório, pois o comando anterior verifica as dependências no ficheiro package.json e instala.```** <br>
**```Caso tenha algum erro, sobre esta depedência é importante executá-lo!.```** <br>

```bash
npm i nodemon -D
```   
Para correr o server 
```bash
npx nodemon
```  
Note que dentro do ficheiro **package.json** em scripts há: ``` "dev": "nodemon server" ```, assim em vez do comando ``` npx nodemon ``` é possivel fazer o comando:
```bash
npm run dev
```  

### 2.2  Inicializar o client
Dentro da pasta **client**, instalar as dependências do node.
```bash
npm install
``` 
**Axios** é um biblioteca que permite uma integração do seu projeto React para qualquer serviço de API disponível. <br>

**```Este comando não é obrigatório, pois o comando anterior verifica as dependências no ficheiro package.json e instala.```** <br>
**```Caso tenha algum erro, sobre esta depedência é importante executá-lo!.```**

```bash
npm install axios
```  
Note que dentro do ficheiro **package.json** há: ``` "proxy": "htpp://server:5000" ``` (necessário por causa do docker), se que quiser usar este passo, é necessário trocá-lo para ``` "proxy": "htpp://localhost:5000" ```para o frontend comunicar com o backend sem problemas. <br>

Para correr o client 
```bash
npm start
```

## 3ºPasso: Implementação com o Docker 

### 3.1  Instalar dependências necessárias do client
```bash
cd client
```
```bash
npm install
```

### 3.2  Instalar dependências necessárias do server
```bash
cd ../server
```
```bash
npm install
```

### 3.3 Docker compose 
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
docker compose down --rmi all -v
```

<hr>

# Utils

### Docker 
Conjunto de produtos de plataforma como serviço que usam virtualização de nível de sistema operacional para entregar software em pacotes chamados contêineres <br>
https://www.docker.com/ 

### Wsl Windows
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
