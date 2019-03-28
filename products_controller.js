module.exports = {
    create: (req, res, next) => {
        const db = req.app.get("db")
        const {name, description, price, image_url} = req.body

        db.create_product([name, description, price, image_url])
        .then(products => {
            res.status(200).send(products)
        })
        .catch(err => {
            res.status(500).send({errorMessage: `Something went wrong`})
            console.log(err)
        }) 
    },

    getOne: (req, res, next) => {
        const db = req.app.get("db")
        const {id} = req.params

        db.read_product(id)
        .then(product => {
            res.status(200).send(product)
        })
        .catch(err => {
            res.status(500).send({errorMessage: `Something went wrong`})
            console.log(err)
        })
    },

    getAll: (req, res, next) => {
        const db = req.app.get("db")

        db.read_products()
        .then(products => {
            res.status(200).send(products)
        })
        .catch(err => {
            res.status(500).send({errorMessage: `Something went wrong`})
            console.log(err)
        })
    },

    update: (req, res, next) => {
        const db = req.app.get("db")
        const {id} =req.params
        const {desc} = req.query

        db.update_product([id, desc])
        .then(
            res.status(200).send(`product updated`)
        )
        .catch(err => {
            res.status(500).send({errorMessage: `Something went wrong`})
            console.log(err)
        })
    },

    delete: (req, res, next) => {
        const db = req.app.get("db")
        const {id} = req.params

        db.delete_product(id)
        .then(
            res.status(200).send(`product deleted`)
        )
        .catch(err => {
            res.status(500).send({errorMessage: `Something went wrong`})
            console.log(err)
        })
    }
}