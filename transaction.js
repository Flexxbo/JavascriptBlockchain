
class Transaction {                                     //Erstelle Transaction - Klasse Step 1
    constructor(from, to, amount)   {                   //Transactions können immer 3Argumente/Parameter haben - von, zu, Menge
        this.from = from
        this.to = to
        this.amount = amount
    }                    
}


module.exports = Transaction