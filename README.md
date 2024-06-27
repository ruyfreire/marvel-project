# Projeto Marvel

Projeto em React iniciado com Vite, que consome a API da Marvel

## Requisitos

- Node 20

## Rodar projeto local

- Criar uma cópia do arquivo `.env.test`, com o nome de `.env.local`, e adicionar as suas keys da api marvel conforme documentação
- [Marvel API Docs](https://developer.marvel.com/documentation/authorization)

```sh
# Instalar dependências
npm run install

# Rodar ambiente de dev
npm run dev
```

## Rodar testes unitários com vitest

```sh
npm run test
```

## Rodar testes e2e com cypress

### Requisitos Cypress

- Necessário atender aos requisitos do Cypress 13
- Para Linux, necessário instalar pacotes conforme documentação
- [Cypress Docs](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)

```sh
npm run test:e2e

# Abrir interface Cypress
npm run test:e2e:open
```

## Build

```sh
npm run build
```

## Linters

```sh
# ESlint
npm run lint

# Prettier
npm run prettier
```
