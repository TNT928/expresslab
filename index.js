import express from 'express'
import Cart from './cart-items.js'

const app = express()
const port = 3000;
app.use(express.json());




app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`)
})


app.get('/cart-items',(req, res) =>{
    res.json(Cart)
} )

app.get('/cart-items/:id',(req, res) =>{
    const id = parseInt(req.params.id)
    const result = Cart.find(item => item.id == id)
    if (result){
        res.status(200)
        res.json(result)
    } else 
    res.status(404)
        res.json('item not found')
     
} )

app.post('/cart-items', (req, res)=>{
    const id = Math.floor((Math.random() * 100000000) + 1);
    const body = req.body
    const newItem = {
        id: id,
        product: body.product,
        price: body.price,
        quantity: body.quantity
    }
    res.status(201)
    Cart.push(newItem)
    res.json(newItem)
    console.log(Cart)
})

app.put('/cart-items/:id', (req,res) =>{
    const i = parseInt(req.params.id)
    const index = Cart.findIndex(item => item.id == i)
    const newItem = req.body
    newItem.id =i
    Cart.splice(index , 1 , newItem)
    res.json("Updating Fact")
})

app.delete('/cart-items/:id', (req,res) =>{
    const i = parseInt(req.params.id)
    const index = Cart.findIndex(item => item.id == i)
    res.status(204)
    Cart.splice(index , 1)
    res.end()
})

