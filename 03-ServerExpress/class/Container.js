const fs = require('fs')

class Container {
    constructor(filePath) {
        this.filePath = filePath
        this.#readFile()
    }

    async #readFile() {
        try {
            const content = await fs.promises.readFile(this.filePath, 'utf-8')
            const parseContent = JSON.parse(content)
            return parseContent
        } catch (error) {
            const content = await fs.promises.writeFile(this.filePath, JSON.stringify([]), 'utf-8')
            return content
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
        try {
            const fileContent = await this.#readFile();
            return fileContent;
        } catch (error) {
            throw new Error(error, 'Error to get all products');
        }
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
        try {
            await fs.promises.writeFile(this.filePath, []);
            console.log('All products deleted');
        } catch (error) {
            throw new Error(error, 'Error. Cant delete products');
        }
    }
}

module.exports = Container