const fs = require('fs')

class Container {
    constructor(filePath) {
        this.filePath = filePath
    }

    async #readFile() {
        try {
            const content = await fs.promises.readFile(this.filePath, 'utf-8')
            const parseContent = JSON.parse(content)
            return parseContent
        } catch (error) {
            console.log(error);
        }
    }

    async save(obj) {
        const fileContent = await this.#readFile()
        if (!fileContent || fileContent === []) {
            await fs.promises.writeFile(this.filePath, JSON.stringify([{...obj, id: 1 }], null, 2), 'utf-8')
        } else { 
            await fs.promises.writeFile(this.filePath, JSON.stringify([...fileContent, {...obj, id: fileContent[fileContent.length - 1].id + 1}], null, 2 ), 'utf-8')
        }
    }

    async getById(id) {
        const fileContent = await this.#readFile()
        try {
            const objeto = fileContent.find((objeto) => objeto.id === id)
            console.log(objeto)
        } catch (error) {
            throw new Error(error, 'Error. Cant get the product by id')
        }
    }

    async getAll() {
        const fileContent = await this.#readFile()
        console.log(fileContent)
    }

    async deleteById(id) {
        try {
            const content = await this.#readFile()
            const newArr = content.filter((producto) => producto.id !== id)
            console.log(newArr)
            await fs.promises.writeFile(this.filePath, JSON.stringify([...newArr], 'utf-8'))
            console.log('Deleted')
        } catch (error) {
            console.log(`Error. Cant delete product id ${id}.`)
        }
    }

    async deleteAll() {
        await fs.promises.writeFile(this.filePath, "", 'utf-8')
    }
}

// module.exports = Container

const products = new Container('./database.txt');
// products.save({
//     title: "The ocean cleanup",
//     price: 120,
//     risk: "AAA",
//     anualReturn: "15%",
//     quantity: "1",
//     type: "water",
//     img: "https://res.cloudinary.com/dbedp2gdb/image/upload/v1659194484/project1_wdomxq.jpg"
// });

// products.getById(1);
// products.getAll();
// products.deleteById(2);
products.deleteAll();