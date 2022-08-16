const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')
const BlockchainNode = require('./blockchainNode')

const express = require('express')
const app = express()

const arguments = process.argv
let PORT = 8080

if (arguments.length > 2){

    PORT = arguments[2]
}
//console.log(process.argv)

//body parser for JSON
app.use(express.json())

let transactions = []
let nodes = []

let genesisBlock = new Block()
//let blockchain = new Blockchain(genesisBlock)

app.post('/nodes/register', (req,res)=>{

    const urls = req.body
    urls.forEach(url => {
        console.log(url)
        const node = new BlockchainNode(url)
        nodes.push(node)

    })
    res.send('Registering Node!')

})


app.post('/transactions', (req, res) =>{

    const from =req.body.from
    const to = req.body.to    
    const amount = req.body.amount

    let transaction = new Transaction(from, to, amount)
    transactions.push(transaction)

    res.json(transactions)
 })

 app.get('/mine', (req,res)=>{
    let block = blockchain.getNextBlock(transactions)
    blockchain.addBlock(block)
    res.json(block)
    transactions = []
 })

app.get('/blockchain', (req,res)=> {
/*
    let transaction = new Transaction("Marry", "John", 100)

    let genesisBlock = new Block()
    let blockchain = new Blockchain (genesisBlock)
    
    let block = blockchain.getNextBlock([transaction])
    blockchain.addBlock(block)
    
    let anotherTransaction = new Transaction('Steven', 'Brianna', 1580)
    let block1 = blockchain.getNextBlock([anotherTransaction])
    blockchain.addBlock(block1)
*/
    res.json(blockchain)

})

app.listen(PORT, () =>{console.log('Server is running on Port:' + PORT)})




//console.log(blockchain)