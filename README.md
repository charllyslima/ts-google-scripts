# TS Google Scripts

Este repositório é um molde para utilizar TypeScript em operações com Google Scripts, permitindo gerenciar tudo pelo
repositório.

## Pré-requisitos

- Node
- clasp

## Comandos disponíveis

### Limpeza

Remove todos os arquivos JavaScript do diretório `dist`.

```shell
npm run clean
```

### Construção

Limpa o diretório dist e executa o rollup para construir o projeto.

```shell
npm run build
```

### Login

Realiza o login no Google Clasp.

```shell
npm run login
```

### Publicação

Publica o projeto usando o Google Clasp.

```shell
npm run publish
```

## Como usar

1. Clone o repositório:

```shell
git clone https://github.com/seu-usuario/ts-gscripts.git
cd ts-google-scripts
```

2. Instale as dependências:

```shell
npm install
```

3. Realize o login com o Clasp:

```shell
npm run login
```
4. Crie os arquivos de configuração necessários:

Após o login, você precisa configurar o Clasp para o seu projeto. Isso criará o arquivo .clasp.json. Se você ainda não tem um projeto configurado, use:

```shell
clasp create --type standalone --title "Nome do seu projeto"
```

Você também precisará de um arquivo `appsscript.json` no diretório `/dist`. Crie este arquivo manualmente ou copie o mesmo gerado na `/src` com o comando anterior com a seguinte estrutura mínima:

```json
{
  "timeZone": "America/Sao_Paulo",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER"
}

```

5.  Construa o projeto:

```shell
npm run build
```

5. Publique o projeto:

```shell
npm run publish
```

## Recomendações

Para organizar melhor o seu código e facilitar a visibilidade no Google Scripts, recomendamos:

1. Crie um arquivo main.ts dentro do diretório src:

```shell
src/main.ts
```

2. Baseie sua estrutura de código em classes:

Estruture seu código em classes para modularidade e reutilização. Por exemplo:

```typescript
// src/enntities/MyClass.ts
export class MyClass {
    public static myFunction() {
        // Seu código aqui
    }
}
```

3. Defina as funções que deseja chamar diretamente no Google Scripts no arquivo main.ts:

    Apenas as funções que você precisa agendar para execução (como em um cron job) devem ser definidas diretamente no main.ts:

```typescript
// src/main.ts
import { MyClass } from './MyClass';

myFunction = () => {
    MyClass.myFunction();
};
```
Desta forma, apenas as funções necessárias estarão visíveis no Google Scripts, facilitando a configuração e a manutenção dos cron jobs.

4. Adapte a arquitetura do seu projeto conforme necessário:

Sinta-se livre para utilizar a arquitetura que desejar. Quando o comando build for executado, o código TypeScript será convertido para JavaScript e todos os arquivos resultantes serão movidos para a pasta dist. Isso permite que você organize seu código de forma modular e mantenha a base de código limpa e gerenciável:

```shell
src/
├── main.ts
├── Entities/MyClass.ts
└── ...

```

Após a construção, a estrutura será adaptada para:

```shell
dist/
├── main.js
├── MyClass.js
└── ...
```

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
