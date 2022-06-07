import express from 'express'
import Item from '../models/item'

const itensRouter = express.Router()

itensRouter.get('/', (req, res) => {
    res.send('Hello World from API')
})

itensRouter.post('/itens', (req, res) => {
    const item: Item = req.body
    const id = 123
    res.status(201).location(`/itens/${id}`).send()
})

itensRouter.get('/itens', (req, res) => {
    const itens: Item[] = [
        {
            id: 1,
            name: 'Produto 1',
            description: 'Descrição do produto 1'
        },
        {
            id: 2,
            name: 'Produto 2',
            description: 'Descrição do produto 2'
        }
    ]
    res.json(itens)
})

itensRouter.get('/itens/:id', (req, res) => {
    const id:number = +req.params.id
    const item: Item = {
        id: id,
        name: `Produto ${id}`,
        description: `Descrição do produto ${id}`
    }
    res.json(item)
})

itensRouter.put('/itens/:id', (req, res) => {
    const id:number = +req.params.id;
    res.status(204).send();
})

itensRouter.delete('/itens/:id', (req, res) => {
    const id:number = +req.params.id
    res.status(204).send();
})

export default itensRouter