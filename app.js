
const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

let transaction = new Transaction("Mary", "John", 100)

let genesisBlock = new Block()
let blockchain = new Blockchain (genesisBlock)

console.log(blockchain)