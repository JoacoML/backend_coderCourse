class Container {
    constructor(products = []) {
        this.products = products,
            this.lastId = 1,
            this.error = { error: 'producto no encontrado' }
    }

    #productExists(id) {
        const product = this.products.find(product => product.id === parseInt(id));

        if (product) {
            return true
        }

        return false
    }

    save(data) {
        let { nombre, precio, urlImagen } = data;

        precio = parseInt(precio);

        if (this.products.length === 0) {
            this.products = [{ nombre, precio, urlImagen, id: this.lastId }];

            return this.lastId
        } else {
            this.lastId = this.products[this.products.length - 1].id + 1;
            this.products = [...this.products, { nombre, precio, urlImagen, id: this.lastId }];

            return this.lastId
        }
    }

    change(id, data) {
        const exists = this.#productExists(id)

        if (exists) {
            let { nombre, precio } = data;
            const productId = parseInt(id)
            precio = parseInt(precio);

            const indexProduct = this.products.indexOf(this.products.find(product => product.id === productId));

            this.products[indexProduct] = { nombre, precio, productId };
        }

        return exists
    }

    getAll() {
        return this.products
    }

    getById(id) {
        const exists = this.#productExists(id)

        if (exists) {
            const productFound = this.products.find(product => product.id === parseInt(id));
            return productFound
        }

        return exists
    }

    deleteById(id) {
        const exists = this.#productExists(id)

        if (exists) {
            const deletedProduct = this.products.indexOf(this.products.find(product => product.id === parseInt(id)));

            this.products.splice(deletedProduct, 1);

            return exists
        }

        return exists
    }

    deleteAll() {
        this.products = [];

        console.log("Productos borrados");
    }
}

const container = new Container(
    [
        {
            nombre: "Seabin fundation",
            precio: 100,
            urlImagen: "https://res.cloudinary.com/dbedp2gdb/image/upload/v1659194484/project2_rlo8p5.jpg",
            id: 1
        },
        {
            nombre: "Renovable verano",
            precio: 60,
            urlImagen: "https://res.cloudinary.com/dbedp2gdb/image/upload/v1659194485/project3_zu8ewr.jpg",
            id: 2
        },
        {
            
            nombre: "Sonic cleanup",
            precio: 50,
            urlImagen: "https://res.cloudinary.com/dbedp2gdb/image/upload/v1659194485/project4_hfyfzi.jpg",
            id: 3
        },
        {
            nombre: "ESCH",
            precio: 80,
            urlImagen: "https://res.cloudinary.com/dbedp2gdb/image/upload/v1659194484/project5_jrrarq.jpg",
            id: 4
        },
        {
            nombre: "Trash into treasure",
            precio: 50,
            urlImagen: "https://res.cloudinary.com/dbedp2gdb/image/upload/v1659194485/project6_w855gn.jpg",
            id: 5
        },
        {
            
            nombre: "Dronegenuity",
            precio: 200,
            urlImagen: "https://res.cloudinary.com/dbedp2gdb/image/upload/v1659194484/project7_hrmfhi.jpg",
            id: 6
        },
        {
            nombre: "Sustainable sewage",
            precio: 300,
            urlImagen: "https://res.cloudinary.com/dbedp2gdb/image/upload/v1659194484/project8_l2hoof.jpg",
            id: 7
        },
        {            
            nombre: "Green building",
            precio: 250,
            urlImagen: "https://res.cloudinary.com/dbedp2gdb/image/upload/v1659194484/project9_awxz9f.jpg",
            id: 8
        }
    ]
);

module.exports = container;