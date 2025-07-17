
# E-commerce React - Compass UOL

> Projeto desenvolvido durante estágio na Compass UOL. Trata-se de um sistema de e-commerce moderno, com autenticação, busca, filtros e visualização de produtos.

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura e Arquitetura](#estrutura-e-arquitetura)
4. [Instalação e Execução](#instalação-e-execução)
5. [Documentação da API](#documentação-da-api)
6. [Boas Práticas](#boas-práticas)
7. [Licença](#licença)

---

## Visão Geral

Sistema de e-commerce desenvolvido em React e TypeScript, com autenticação via Firebase, busca, filtros dinâmicos, visualização de detalhes de produtos e navegação protegida. O projeto foi pensado para ser escalável, modular e fácil de manter.

---

## Tecnologias Utilizadas

- **React** (v18+)
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **PostCSS**
- **ESLint**
- **Firebase Authentication**
- **React Router DOM**
- **Context API**
- **Babel**

---

## Estrutura e Arquitetura

```
commerce-project/
├── public/                      # Arquivos estáticos públicos
│   └── vite.svg                 # Ícone do projeto
├── src/
│   ├── assets/                  # Imagens e ícones
│   ├── components/
│   │   └── ui/                  # Componentes de UI reutilizáveis (Button, Card, Carousel, Input)
│   ├── context/                 # Contextos globais (ex: AuthContext)
│   ├── data/                    # Dados mockados ou estáticos (ex: products.ts)
│   ├── firebase/                # Configuração do Firebase
│   ├── pages/                   # Páginas principais da aplicação
│   │   ├── ExploreProducts/     # Página de exploração de produtos
│   │   ├── FilterScreen/        # Modal de filtros
│   │   ├── Home/                # Página inicial
│   │   ├── Login/               # Autenticação
│   │   ├── ProductDetails/      # Detalhes do produto
│   │   └── Search/              # Busca de produtos
│   ├── App.tsx                  # Componente principal
│   ├── main.tsx                 # Ponto de entrada
│   ├── index.css                # Estilos globais (Tailwind)
│   └── index.html               # HTML base
├── package.json                 # Dependências e scripts
├── tailwind.config.js           # Configuração do Tailwind
├── postcss.config.cjs           # Configuração do PostCSS
├── tsconfig*.json               # Configurações do TypeScript
├── vite.config.ts               # Configuração do Vite
├── eslint.config.js             # Configuração do ESLint
└── README.md                    # Documentação
```

---

## Instalação e Execução

### Pré-requisitos

- Node.js >= 18
- npm >= 9

### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/PatrickMCardoso/e-commerce.git
   cd e-commerce/commerce-project
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configuração do Firebase:**

   - As credenciais já estão presentes em `src/firebase/firebaseConfig.ts`.
   - Para produção, recomenda-se usar variáveis de ambiente e proteger as chaves.

4. **Execução do projeto:**

   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**

   [http://localhost:5173](http://localhost:5173)

---

## Documentação da API

Este projeto utiliza autenticação do Firebase. Para mais detalhes, consulte a [documentação oficial do Firebase Auth](https://firebase.google.com/docs/auth).

Caso haja endpoints próprios, documente-os aqui.

---

## Boas Práticas

- **Componentização:** Componentes reutilizáveis para UI e lógica.
- **Context API:** Gerenciamento global de autenticação.
- **Rotas protegidas:** Uso de `PrivateRoute` para páginas restritas.
- **Tipagem estática:** TypeScript para segurança e clareza.
- **Linting:** ESLint configurado para manter padrões de código.
- **Estilização moderna:** Tailwind CSS para estilos rápidos e consistentes.
- **Arquitetura modular:** Separação clara de responsabilidades.
- **Controle de estado:** Hooks e Context para estados globais e locais.
- **Segurança:** Uso de autenticação via Firebase.

---

## Licença

Este projeto está sob a licença MIT.
