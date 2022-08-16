const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

const express = require('express')
const app = express()

//body parser for JSON
app.use(express.json())

let transactions = []

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

app.post('/transactions', (req, res) =>{

    const from =req.body.from
    const to = req.body.to    
    const amount = req.body.amount

    let transaction = new Transaction(from, to, amount)
    transactions.push(transaction)

    res.json(transactions)
 })

 app.get('mine', (req,res)=>{
    let block = blockchain.getNextBlock(transactions)
    blockchain.addBlock(block)
    res.json(block)
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

app.listen(8080, () =>{console.log('Server is running')})




//console.log(blockchain)