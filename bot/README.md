# discord.js v14 のセットアップ

## install

```shell
yarn init
yarn add -D @types/dotenv @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser dotenv eslint
yarn add -D eslint-config-prettier ts-node-dev typescript
yarn add discord.js
yarn tsc --init
npm init @eslint/config
```

## `npm init @eslint/config`

```text
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · commonjs
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ What format do you want your config file to be in? · JavaScript
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · yarn
```
