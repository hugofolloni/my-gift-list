import express from 'express'
import { Event, User, Gift } from '../models/item'
import eventsRepository from '../repositories/events-repository'
import giftRepository from '../repositories/gifts-repository'
import userRepository from '../repositories/users-repository'

const itensRouter = express.Router()

itensRouter.get('/', (req, res) => {
    res.send('Hello World from API')
})

itensRouter.post('/events', (req, res) => {
    const event: Event = req.body
    eventsRepository.create(event, (id) => {
        if(id){
            res.status(201).location(`/events/${id}`).send();
        }
        else {
            res.status(400).send();
        }
    })
   
})

itensRouter.get('/events', (req, res) => {
    if(req.query.owner && req.query.name){
        eventsRepository.readFullFiltered(req.query, (events) => {
            res.json(events)
        }
        )
    }
    else if(req.query.owner){
        eventsRepository.readOwnerFiltered({owner: req.query.owner}, (events) => {
            res.json(events)
        }
        )
    }
    else {
        eventsRepository.readAll((events) => {
            res.json(events)
        })
    }
})

itensRouter.get('/events/:id', (req, res) => {
    const id:number = +req.params.id
    eventsRepository.read(id, (item) => {
        if(item){
            res.json(item)
        }
        else{
            res.status(404).send()
        }
    })
})

itensRouter.put('/events/:id', (req, res) => {
    const id:number = +req.params.id;
    eventsRepository.update(id, req.body, (notFound) => {
        if(notFound){
            res.status(404).send()
        }
        else{
            res.status(204).send()
        }
    })
})

itensRouter.delete('/events/:id', (req, res) => {
    const id:number = +req.params.id
    eventsRepository.delete(id, (notFound) => {
        if(notFound){
            res.status(404).send()
        }
        else{
            res.status(204).send()
        }
    })
})

itensRouter.get('/users', (req, res) => {
    if(req.query.username){
        userRepository.readFiltered({username: req.query.username}, (users) => {
            res.json(users)
        }
        )
    }
    else {
        userRepository.readAll((users) => {
            res.json(users)
        })
    }
})

itensRouter.post('/users', (req, res) => {
    const user: User = req.body
    userRepository.create(user, (id) => {
        if(id){
            res.status(201).location(`/users/${id}`).send();
        }
        else {
            res.status(400).send();
        }
    })
})

itensRouter.get('/users/:id', (req, res) => {
    const id:number = +req.params.id
    userRepository.read(id, (item) => {
        if(item){
            res.json(item)
        }
        else{
            res.status(404).send()
        }
    })
})

itensRouter.put('/users/:id', (req, res) => {
    const id:number = +req.params.id;
    userRepository.update(id, req.body, (notFound) => {
        if(notFound){
            res.status(404).send()
        }
        else{
            res.status(204).send()
        }
    })
})

itensRouter.delete('/users/:id', (req, res) => {
    const id:number = +req.params.id
    userRepository.delete(id, (notFound) => {
        if(notFound){
            res.status(404).send()
        }
        else{
            res.status(204).send()
        }
    })
})

itensRouter.get('/gifts', (req, res) => {
    if(req.query.event && req.query.name){
        giftRepository.readFullFiltered({event: req.query.event, name: req.query.name}, (gifts) => {
            res.json(gifts)
        }
        )
    }
    else if(req.query.event){
        giftRepository.readEventFiltered({event: req.query.event}, (gifts) => {
            res.json(gifts)
        }
        )
    }
    else {
        giftRepository.readAll((gifts) => {
            res.json(gifts)
        })
    }
})

itensRouter.post('/gifts', (req, res) => {
    const gift: Gift = req.body
    giftRepository.create(gift, (id) => {
        if(id){
            res.status(201).location(`/gifts/${id}`).send();
        }
        else {
            res.status(400).send();
        }
    })
})

itensRouter.get('/gifts/:id', (req, res) => {
    const id:number = +req.params.id
    giftRepository.read(id, (item) => {
        if(item){
            res.json(item)
        }
        else{
            res.status(404).send()
        }
    })
})

itensRouter.put('/gifts/:id', (req, res) => {
    const id:number = +req.params.id;
    giftRepository.update(id, req.body, (notFound) => {
        if(notFound){
            res.status(404).send()
        }
        else{
            res.status(204).send()
        }
    })
})

itensRouter.delete('/gifts/:id', (req, res) => {
    const id:number = +req.params.id
    giftRepository.delete(id, (notFound) => {
        if(notFound){
            res.status(404).send()
        }
        else{
            res.status(204).send()
        }
    })
})


export default itensRouter