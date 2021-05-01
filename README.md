# OurBank
## _Own your bank, DIY, powered by blockchain_

OurBank is a simple bank smartcontract written in solidity. Own your finance, own your bank !

## Features

- Enroll user
- Deposit Eth
- Withdraw Eth
- Check balance
- Tests included

## Tech

OurBank uses a number of open source projects to work properly:

- [truffle](https://www.trufflesuite.com/truffle) - The most popular development framework for Ethereum with a mission to make your life a whole lot easier !
- [web3.js](https://web3js.readthedocs.io/en/v1.3.4/) - web3.js is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.
- [ganache](https://www.trufflesuite.com/ganache) - Quickly fire up a personal Ethereum blockchain which you can use to run tests, execute commands, and inspect state while controlling how the chain operates.
- [solidity](https://docs.soliditylang.org/en/latest/) - Solidity is an object-oriented, high-level language for implementing smart contracts.
- [mochajs](https://mochajs.org/) - Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun.
- [chai](https://www.chaijs.com/) - Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
- [Openzeppelin Test Environment](https://docs.openzeppelin.com/test-environment/0.1/) - Blazing fast smart contract testing. One-line setup for an awesome testing experience.
- [Openzeppelin Test Helpers](https://docs.openzeppelin.com/test-helpers/0.5/) - Assertion library for Ethereum smart contract testing. Make sure your contracts behave as expected!

## Installation

OurBank requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm i
```

## Compile the project
In order to compile the project, open your terminal and run the following command :
```sh
truffle compile
```


## Run tests

In order to run the tests, open your terminal and run the following command :
```
npm test
```

NB : make sure to compile before

## Useful testing snippets
* Test files headers
```js
const { accounts, contract } = require('@openzeppelin/test-environment');
const Web3 = require('web3');
const { assert } = require('chai');
const { expectRevert, expectEvent, balance } = require('@openzeppelin/test-helpers');
const OurBank = contract.fromArtifact('OurBank'); // Loads a compiled contract

const ether = 10 ** 18; // 1 ether = 1000000000000000000 wei
const [owner, alice, bob] = accounts;
const OurBank = contract.fromArtifact('OurBank'); // Loads a compiled contract
```

* Empty test body
```js
describe("OurBank", () => {
    it("should check something", async () => {
    });
});
```

* Deploy an instance of our contract
```js
//const OurBank = contract.fromArtifact('OurBank');
describe("OurBank", () => {
    it("should check something", async () => {
        const bank = OurBank.new({from: owner});
    });
});
```

## Deploy on Ganache-CLI
1) run a ganache-cli instance :
```sh
ganache-cli -p 8545
```

2) Migrate :
```sh
truffle migrate --network development
```

3) Open the truffle console :
```sh
truffle console
```

## License

MIT

**Free Software, Hell Yeah!**

Join our community :
- [Discord](https://discord.com/invite/uhUjd6UHar)
- [Twitter](https://twitter.com/OhreeeOfficial)
- [LinkedIn](https://www.linkedin.com/showcase/ohreee/)
- [Medium](https://ohreee.medium.com/)
- [Youtube](https://www.youtube.com/channel/UCTM1Zk9rDvcsGg_ecAvSqhA)