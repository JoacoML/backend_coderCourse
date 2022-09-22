const express = require("express")
const cors = require("cors")
const router = require("../routes/products.route")

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.productsPath = '/api/products'

    // Middlewares
    this.middlewares()

    // Routes
    this.routes()
  }

  middlewares() {

    // CORS
    this.app.use(cors());
    // Server takes the JSON data and transforms it into a JavaScript object.
    this.app.use(express.urlencoded({ extended: true }))
    // Read and parse body 
    this.app.use(express.json())
    // Public directory
    this.app.use(express.static("public"))

  }

  // Routes
  routes() {
    this.app.use(this.productsPath, router)
  }

  // Start server
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })
  }
}

module.exports = Server