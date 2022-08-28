class User {
    constructor(name, surname, books = [], pets = []) {
        this.name = name
        this.surname = surname
        this.books = books
        this.pets = pets
    }

    getFullName() {
        return `name: ${this.name}. surname: ${this.surname}.`
    }

    addPet(pet) {
        this.pets.push(pet)
    }

    countPets() {
        return `${this.name} has ${this.pets.length} pets.`
    }

    addBook(title, author) {
        let book = {
            title: title,
            author: author
        }
        return this.books.push(book)
    }

    getBookNames() {
        return this.books.map((book) => console.log (`Book title: ${book.title}`))
    }
}

const user1 = new User('Joaco', 'Martin Lanfranchi')
user1.addPet('Turtle')
user1.addBook('A Study in Scarlet', 'Arthur Conan Doyle')
user1.addBook('My Inventions', 'Nikola Tesla')
console.log(user1.getFullName())
console.log(user1.countPets())
user1.getBookNames()

const user2 = new User('John', 'Salchichon', [{ title: 'Martin Fierro', author: 'Jose Hernandez' }, { title: 'Mal de amores', author: 'Angeles Mastretta' }], ['Cat', 'Dog']);
console.log(user2.getFullName())
console.log(user2.countPets())
user2.getBookNames()