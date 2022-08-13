
const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

let transaction = new Transaction("Marry", "John", 100)

let genesisBlock = new Block()
let blockchain = new Blockchain (genesisBlock)

let block = blockchain.getNextBlock([transaction])
blockchain.addBlock(block)


console.log(blockchain)