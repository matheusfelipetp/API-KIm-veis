# 🏠 API KImóveis
<h3 align="center">Agendar uma visita a um imóvel nunca foi tão fácil!</h3>

<br>

# 🎲 **Sobre o projeto**
Essa API foi criada para ser utilizada por imobiliárias, visando gerenciar o agendamento de visitas a imóveis. O usuário poderá criar a sua conta, tendo a possibilidade de ser um administrador ou não, realizando o cadastro de novas visitas, além de informações referentes aos imóveis, como, por exemplo, o endereço e a categoria.

<br>

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

````
yarn install
````
<br>

**Configure as variáveis de ambiente no seu .env**, passando as credenciais corretas para conectar em seu banco local


Com isso feito, para rodar sua aplicação, basta utilizar o comando
````
yarn dev
````

<br>

# 🦾 **Tecnologias utilizadas**
- **TypeScript**
- **NodeJS**
- **Express**
- **Express-async-errors**
- **Jest**
- **PostgreSQL**
- **Bcrypt**
- **Jsonwebtoken**
- **Class-transformer**
- **Dotenv**
- **TypeORM**

<br>

# 🔨 **Sobre os testes**

Essa aplicação possui testes, que serão utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

<br>


# **Rodando os testes** 

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes
````
yarn test
````
#
### Rodar todos os testes e ter um log ainda mais completo
````
yarn test --all
````
#

### Rodar os testes de uma pasta específica
`detalhe: repare que tests está envolvido por 2 underlines. Isso se chama dunder.`
````
yarn test ./scr/__tests__/integration/<subpasta>
````
#
### Rodar os testes de um arquivo específico
````
yarn test ./scr/__tests__/integration/<subpasta>/<arquivo>
````
#
### Rodar um teste específico
````
yarn test -t <describe ou test específico envolto em aspas>
````
````
\\ ex: yarn test -t "/categories"
\\ rodaria os testes do describe "/categorias" no caminho
\\ ./scr/__tests__/integration/categories/categoriesRoutes.test.ts
````

<br>


**Caso você queira verificar todas as opções de execução de testes, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após rodar um dos comandos aparecerá um log no seu terminal, contendo as informações da execução do teste.

**Observação:** O teste pode demorar alguns segundos para ser finalizado. Quanto maior for o teste, mais tempo será consumido para a execução.

<br>

# ➡️ **Rotas da aplicação**
### Rotas do usuário

#### 1) Criação do usuário - POST /users

``
Exemplo de body
``

```
{
    "name": "Matheus",
    "email": "devmatheus@email.com",
    "password": "123456",
    "isAdm": true
}
```

``
Exemplo de response - 201
`` 

```
{
	"name": "Matheus",
	"email": "devmatheus@email.com",
	"isAdm": true,
	"isActive": true,
	"id": "ce0c381c-ac99-4456-9cd8-e4db932d82a6",
	"createdAt": "2022-12-21T13:59:06.216Z",
	"updatedAt": "2022-12-21T13:59:06.216Z"
}
```

``
Exemplo de response com e-mail já existente - 409
``

```
{
	"message": "Email already exists"
}
```

<br>

#### 2) Listar todos os usuários - GET /users
Essa rota só pode ser acessada por usuários administradores.

``
Exemplo de response - 200
`` 

```
[
	{
		"id": "ed33fa96-8c6e-46da-a294-33145073ac53",
		"name": "Matheus",
		"email": "matheus@email.com",
		"isAdm": true,
		"isActive": true,
		"createdAt": "2022-12-13T17:39:52.499Z",
		"updatedAt": "2022-12-13T17:39:52.499Z"
	},
  {
		"id": "b17019b3-fcb2-417f-8c9c-d5d67bb2a39b",
		"name": "Carlos",
		"email": "carlos@email.com",
		"isAdm": true,
		"isActive": true,
		"createdAt": "2022-12-13T17:40:58.952Z",
		"updatedAt": "2022-12-13T20:29:49.624Z"
	},
  {
		"id": "35fdae1a-9162-4436-a835-3e5103e09b7c",
		"name": "Shayany Brasil",
		"email": "shay@email.com",
		"isAdm": false,
		"isActive": true,
		"createdAt": "2022-12-13T20:24:43.403Z",
		"updatedAt": "2022-12-13T20:40:43.291Z"
	}
]
```

``
Exemplo de response caso o usuário não seja administrador - 401
`` 
```
{
	"message": "Invalid Token"
}
```

<br>

#### 3) Editar o usuário - PATCH /users/id
O usuário administrador poderá editar qualquer outro usuário da plataforma. Já o usuário comum, só poderá editar a si próprio.

``
Exemplo de body
``

```
{
    "name": "Matheus Felipe",
    "email": "matheusfelipe123@email.com"
}
```

``
Exemplo de response - 200
``

```
{
	"id": "946c67c2-7746-447e-98eb-6ad59e5e1b95",
	"name": "Matheus Felipe",
	"email": "matheusfelipe123@email.com",
	"isAdm": false,
	"isActive": true,
	"createdAt": "2022-12-21T14:10:36.359Z",
	"updatedAt": "2022-12-21T14:13:33.064Z"
}
```

``
Exemplo de response sem autorização - 401
``

```
{
	"message": "Missing authorization headers"
}
```

``
Exemplo de response com ID do usuário inválido - 404
``

```
{
	"message": "User not found"
}
```

``
Exemplo de response tentando alterar o campo de administrador - 401
``

```
{
	"message": "Unable to change fields"
}
```

``
Exemplo de response usuário comum tentando editar outro usuário - 403
``

```
{
	"message": "Missing admin permissions"
}
```

<br>

#### 4) Deletar o usuário - DELETE /users/id
Essa rota só pode ser acessada por usuários administradores. É realizado um soft delete no usuário, alterando a sua propriedade isActive para false.

Caso tudo dê certo, o retorno será um status 204 sem conteúdo.

``
Exemplo de response sem autorização - 401
``

```
{
	"message": "Missing authorization headers"
}
```

``
Exemplo de response com ID do usuário inválido - 404
``

```
{
	"message": "User not found"
}
```

``
Exemplo de response usuário comum tentando realizar a operação - 403
``

```
{
	"message": "Missing admin permissions"
}
```

<br>

### Rota de login
#### 1) Realizar o login na plataforma - POST /login

``
Exemplo de body
``

```
{
    
    "email": "matheus@email.com",
    "password": "1234"
 
}
```

``
Exemplo de response - 200
``

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhldXNAZW1haWwuY29tIiwiaWF0IjoxNjcxNjM0NDAwLCJleHAiOjE2NzE3MjA4MDAsInN1YiI6ImVkMzNmYTk2LThjNmUtNDZkYS1hMjk0LTMzMTQ1MDczYWM1MyJ9.p0sl91Sv17_B_CGfRy079Wn4rODEdzDy1Enhn8dWsFo"
}
```

``
Exemplo de response com usuário ou senha inválido - 403
``

```
{
	"message": "Invalid user or password"
}
```

<br>

### Rotas de categoria
#### 1) Criação de uma categoria - POST /categories
Essa rota só pode ser acessada por usuários administradores.

``
Exemplo de body
``

```
{
    "name": "Casa"
}
```

``
Exemplo de response - 201
``

```
{
	"name": "Casa",
	"id": "7716aca7-2c0d-4d44-ac46-181520ccee69"
}
```

``
Exemplo de response caso a categoria já exista - 409
``

```
{
	"message": "Category already exists"
}
```

``
Exemplo de response sem autorização - 401
``

```
{
	"message": "Missing authorization headers"
}
```

``
Exemplo de response usuário comum tentando realizar a operação - 403
``

```
{
	"message": "Missing admin permissions"
}
```

<br>

#### 2) Listar todas as categorias - GET /categories
Essa rota pode ser acessada sem autenticação.

``
Exemplo de response - 200
``

```
[
	{
		"id": "d560c877-083a-45e7-b0df-a55a61db5381",
		"name": "Apartamento"
	},
	{
		"id": "7716aca7-2c0d-4d44-ac46-181520ccee69",
		"name": "Casa"
	}
]
```

<br>

#### 3) Listar propriedades pertencentes a uma categoria - GET /categories/id/properties
Essa rota pode ser acessada sem autenticação.

``
Exemplo de response - 200
``

```
{
	"id": "d560c877-083a-45e7-b0df-a55a61db5381",
	"name": "Apartamento",
	"properties": []
}
```

``
Exemplo de response caso a categoria não exista - 404 
``

```
{
	"message": "Category not found"
}
```

<br>

### Rotas de propriedade
#### 1) Criação de uma propriedade - POST /properties
Essa rota só pode ser acessada por usuários administradores.

``
Exemplo de body
``

```
{	
    "value": 1000000,
    "size": 350,
    "address": {
        "district": "Rua Ali Perto",
        "zipCode": "18150000",
        "number": "67",
        "city": "São Bernardo",
        "state": "SP"
    },
    "categoryId": "791d2ee0-6bc3-4fed-892d-e989b64af2e5"
}
```

``
Exemplo de response - 201
``

```
{
	"value": 1000000,
	"size": 350,
	"address": {
		"id": "0a8535b2-c5f5-44b4-9d27-931ee9072027",
		"district": "Rua Ali Perto",
		"zipCode": "18150000",
		"number": "67",
		"city": "São Bernardo",
		"state": "SP"
	},
	"category": {
		"id": "791d2ee0-6bc3-4fed-892d-e989b64af2e5",
		"name": "Casa de Praia"
	},
	"id": "4f46e8c4-4b9b-4a96-8372-77b4405d6ee2",
	"sold": false,
	"createdAt": "2022-12-21T15:09:16.033Z",
	"updatedAt": "2022-12-21T15:09:16.033Z"
}
```


``
Exemplo de response sem autorização - 401
``

```
{
	"message": "Missing authorization headers"
}
```

``
Exemplo de response usuário comum tentando realizar a operação - 403
``

```
{
	"message": "Missing admin permissions"
}
```

``
Exemplo de response caso o imóvel possua o campo state maior que 2 digítios e o zipCode maior que 8 digítos - 400
`` 

```
{
	"message": "The field is not a valid"
}
```

``
Exempo de response caso a categoria não exista - 404 
``

```
{
	"message": "Category not found"
}
```

<br>

#### 2) Listar todas as propriedades - GET /properties
Essa rota pode ser acessada sem autenticação.

``
Exemplo de response - 200
``

```
[
	{
		"id": "ef56127d-f7f7-4782-8f4c-4479019706b6",
		"sold": false,
		"value": "1000000.00",
		"size": 350,
		"createdAt": "2022-12-19T19:53:06.251Z",
		"updatedAt": "2022-12-19T19:53:06.251Z"
	},
	{
		"id": "b024f4de-d7f8-4d3a-b650-e43dc9c85ada",
		"sold": false,
		"value": "1000000.00",
		"size": 350,
		"createdAt": "2022-12-19T19:54:19.295Z",
		"updatedAt": "2022-12-19T19:54:19.295Z"
	},
	{
		"id": "9a19e6b6-b09f-49c9-9d58-e46aa5889a2c",
		"sold": false,
		"value": "1000000.00",
		"size": 350,
		"createdAt": "2022-12-19T19:57:34.056Z",
		"updatedAt": "2022-12-19T19:57:34.056Z"
	}
]
```

<br>

### Rotas de agendamento
#### 1) Criação de um agendamento - POST /schedules
Só é possível realizar um agendamento em horários comerciais (Seg. à Sex. das 08h às 18h).

``
Exemplo de body
``

```
{
	"date": "2022/8/16",
	"hour": "12:30",
	"propertyId": "4f46e8c4-4b9b-4a96-8372-77b4405d6ee2"
}
```

``
Exemplo de response - 201
``

```
{
	"date": "2022/8/16",
	"hour": "12:30",
	"property": {
		"id": "dd2fe2c6-9959-456e-a5f1-1712d66df801",
		"sold": false,
		"value": "1000000.00",
		"size": 350,
		"createdAt": "2022-12-19T21:24:45.785Z",
		"updatedAt": "2022-12-19T21:24:45.785Z"
	},
	"user": {
		"id": "ed33fa96-8c6e-46da-a294-33145073ac53",
		"name": "Matheus",
		"email": "matheus@email.com",
		"password": "$2b$10$YnvFV/R1LZ.C3K/LfyFng.jleM5KABvN.oDJ/zLvlQVi63L8fp6Bi",
		"isAdm": true,
		"isActive": true,
		"createdAt": "2022-12-13T17:39:52.499Z",
		"updatedAt": "2022-12-13T17:39:52.499Z"
	},
	"id": "ffdf698d-7bdb-45c4-9ab5-1761fc3f5cdf"
}
```

``
Exemplo de response sem autorização - 401
``

```
{
	"message": "Missing authorization headers"
}
```

``
Exemplo de response de um agendamento que já existe ou em outra propriedade na mesma data e hora - 409
``

```
{
	"message": "There's already a visit scheduled with the same date and hour"
}
```

``
Exemplo de response fora do horário comercial - 400
`` 

```
{
	"message": "Business hours are from 8 am to 6 pm"
}
```

``
Exemplo de response fora dos dias da semana - 400
``

```
{
	"message": "Appointment only from Monday to Friday"
}
```

<br>

#### 2) Listar todos os agendamentos de um imóvel - GET /schedules/properties/id
Essa rota só pode ser acessada por usuários administradores.

``
Exemplo de response - 200
``

```
{
	"schedules": [
		{
			"id": "a7b03b8d-ba64-467a-972a-3e2ba163052c",
			"date": "2022-02-16",
			"hour": "11:30:00",
			"user": {
				"id": "ed33fa96-8c6e-46da-a294-33145073ac53",
				"name": "Matheus",
				"email": "matheus@email.com",
				"password": "$2b$10$YnvFV/R1LZ.C3K/LfyFng.jleM5KABvN.oDJ/zLvlQVi63L8fp6Bi",
				"isAdm": true,
				"isActive": true,
				"createdAt": "2022-12-13T17:39:52.499Z",
				"updatedAt": "2022-12-13T17:39:52.499Z"
			}
		}
	]
}
```

``
Exemplo de response sem autorização - 401
``

```
{
	"message": "Missing authorization headers"
}
```

``
Exemplo de response usuário comum tentando realizar a operação - 403
``

```
{
	"message": "Missing admin permissions"
}
```

``
Exemplo de response caso o ID da propriedade seja inválido - 404
``

```
{
	"message": "Property not found"
}
```
