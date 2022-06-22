# Agoric React App Starter

This repo helps your start with the development of [Agoric](https://agoric.com/) dApps. This repo contains:

- [Local Agoric Chain](https://github.com/RBFLabs/agoric-react-app-starter/tree/main/agoric)
- [Smart Contract](https://github.com/RBFLabs/agoric-react-app-starter/blob/main/agoric/contract/src/contract.js) that can mint Moola tokens 
- [React App](https://github.com/RBFLabs/agoric-react-app-starter/tree/main/react-app) written in TypeScript (built with [Vite](https://vitejs.dev/), not using [create-react-app](https://create-react-app.dev/))
## Prerequisites

Install Agoric SDK from [Agoric repository](https://github.com/Agoric/Agoric-sdk) by executing the following steps:

> **Note**
> We recommend using Node 16 (you can use [nvm](https://github.com/nvm-sh/nvm) to switch between different Node versions).

```bash
node --version # 14.15.0 or higher
npm install --global yarn
git clone https://github.com/Agoric/agoric-sdk
cd agoric-sdk
yarn install
yarn build
yarn link-cli ~/bin/agoric
agoric --version
# 0.16.0 or higher should be printed out
```

For more detail check the Agoric [documentation](https://agoric.com/documentation/getting-started/before-using-agoric.html).

<br/>

## Getting Started

### Clone / Degit the repository. Or use it as a Template

#### Clone 

- Clone the repo: `git clone https://github.com/RBFLabs/agoric-react-app-starter.git`
- Enter the project folder: `cd agoric-react-app-starter` 

#### Degit

`degit` downloads the repo without git history attached to it (without `.git` file).

- Install [degit](https://github.com/Rich-Harris/degit): `npm install -g degit`
- Degit the repo: `degit https://github.com/RBFLabs/agoric-react-app-starter my-agoric-react-app`
- Enter the project folder: `cd my-agoric-react-app`

#### Template

GitHub's [template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository) allows you to use this repo as a template for your own app. Basically it creates a new repo with the same files and directory structure. 

- Login to you GitHub account
- Make sure you are at the root of this repo's [GitHub website](https://github.com/RBFLabs/agoric-react-app-starter)
- Find and click on the *"Use this template"* button 

<br/>

## Deploy the contract and run the React App 

In all of the following `<github-root>` is the directory with the clone of this repository.

### 1. Run the local Agoric chain

> **Note**
> Make sure you are using the same Node version as you used to build Agoric SDK.

- Open terminal #1
- `cd <github-root>/agoric`
- `agoric install`
- `agoric start --reset`

There will be several log messages printed out. Wait until the message

```
Deployed Wallet!
```

is printed out.

### 2. Open Agoric wallet in your browser

- When the chain is running, open terminal #2
- `cd <github-root>/agoric`
- `agoric open`

This will open up a new browser tab with the Agoric wallet.

### 3. Deploy the contract (in the same terminal #2)

- `cd <github-root>/agoric/contract`
- `yarn install`
- `agoric deploy deploy.js`

After successful completion, the deployment script should print out a message that looks like the following:

```
- SUCCESS! contract code installed on Zoe
-- Contract Name: moolaMinter
-- Installation Board Id: board02021
-- Instance Board Id: board01422
-- Token Issuer Board Id: board04719
-- Token Brand Board Id: board06120
writing .../react-app/src/dAppConstants.mts
```

This deploys the contract and generates `dAppConstants.mts` file in `react-app/src` folder.

### 4. Run the React App

Open terminal #3

- `cd <github-root>/react-app`
- `yarn install`
- `yarn dev`

