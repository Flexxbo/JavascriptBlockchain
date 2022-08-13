const SHA256 = require('js-sha256')
const Block = require('./block')

class Blockchain {
    constructor(genesisBlock) {
        this.blocks = []
        this.addBlock(genesisBlock)
    }

    addBlock(block){
        if(this.blocks.length == 0) {
            block.previousHash = "0000000000000000"
            block.hash = this.generateHash(block)
        }

        this.blocks.push(block)
    }

    getNextBlock([transactions]){
        let block = new Block()
        transactions.forEach((transaction)=>{
            block.addTransaction
        })
    }

    generateHash(block){
        const hash = SHA256(block.key)
        return hash

    }
}


module.exports = Blockchain