const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')
const BlockchainNode = require('./blockchainNode')
const fetch = require('node-fetch')

const express = require('express')
const { response } = require('express')
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
let allTransactions = []

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

app.get('/resolve', (req,res)=>{

    nodes.forEach(node=>{

        fetch(`${node.url}/blockchain`)
        .then(response => response.json())
        .then(otherBlockchain => {

            if(blockchain.blocks.length < otherBlockchain.blocks.length){
                //transactions = []
                allTransactions.forEach(transaction => { 

                    fetch(`${node.url}/transactions`, {
                        method: 'POST', 
                        headers: {
                            'Content-Type':'application/json'
                        }, 
                        body: JSON.stringify(transaction)
                    }).then(response => response.json())
                    .then(_ =>{
                        fetch(`${node.url}/mine`)
                        .then(response=> response.json())
                        .then(_ =>{
                            fetch(`${node.url}/blockchain`)
                            .then(response => response.json())
                            .then(updatedBlockchain => {
                                console.log(updatedBlockchain)
                                console.log('das ist alltransactions'+allTransactions)
                                blockchain = updatedBlockchain
                                res.json(blockchain)
                            })
                        })
                    })
                })
            } else{
                res.json(blockchain)
            }
        })
    })

})


app.post('/nodes/register', (req,res)=>{

    const urls = req.body
    urls.forEach(url => {
        console.log(url)
        const node = new BlockchainNode(url)
        nodes.push(node)
        console.log(nodes)
        console.log(nodes[0].url)

    })
    res.json(nodes)

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
    transactions.forEach(transaction => {
        allTransactions.push(transaction)
    })
    /*
    console.log('das ist transactions aus mine vor Löschung' + transactions)
    console.log('das ist alltransactions aus mine' + allTransactions)
    transactions = []
    console.log('das ist transactions aus mine' + transactions)
    console.log('das ist alltransactions aus mine' + allTransactions) */
    res.json(block)
 })

app.get('/blockchain', (req,res)=> {

    res.json(blockchain)
    })

app.listen(PORT, () =>{console.log('Server is running on Port:' + PORT)})




console.log(blockchain)