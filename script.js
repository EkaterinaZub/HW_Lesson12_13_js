"Use strict"

const contact = {
    id: '1',
    name: 'Kati',
    email: 'kati@gmail.com',
    address: 'Minsk',
    phone: '45678818',

}
const contact2 = {
    id: '2',
    name: 'Refa',
    email: 'Refa@gmail.com',
    address: 'Minsk',
    phone: '4546365468',

}

class User {
    constructor(user) {
        this.data = user;

    }

    editData(newUser) {
        this.data = newUser;

    }

    getUser() {
        return this.data;
    }
}

let user = new User(contact);

// console.log(user);
// user.editData(contact);
// console.log(user);
// console.log(user.getUser());


class Contacts {
    constructor() {
        this.data = []
    }

    add(contact) {
        const newContact = new User(contact)
        this.data = [...this.data, newContact.data]
    }

    edit(id, data) {
        const contakts = this.data.map(element => {
            if (element.id === id) {
                return { ...element, ...data }
            }
            return element
        })
        user.editData.call(this, contakts)
        // console.log(contakts)
    }
    remove(id) {
        return this.data = this.data.filter(element => element.id !== id)
    }

    get() {
        return this.data
    }
}

const contacts = new Contacts()
// console.log(contacts)
// contacts.add(contact)
// contacts.add(contact2)
// contacts.edit('1', { name: 'Krol' })
// contacts.edit('2',{address: 'Mogilew'})
// console.log(contacts)
// contacts.remove('1')
// console.log(contacts.get())

class ContactsApp extends Contacts {
    constructor() {
        super();
        this.app()
        this.onRemove()
        this.onEdit()
        this.getLocalstorage()
        this.data


    }


    app() {

        const container = document.createElement('form')
        container.className = 'container';
        const body = document.querySelector('body')
        console.log(body)
        body.prepend(container)

        const attributes = [


            {
                name: 'phone',
                type: 'text',
                placeholder: 'phone'
            },

            {
                name: 'address',
                type: 'text',
                placeholder: 'address'
            },



            {
                name: 'email',
                type: 'text',
                placeholder: 'email'
            },

            {
                name: 'name',
                type: 'text',
                placeholder: 'name'
            },


            {
                name: 'id',
                type: 'text',
                placeholder: 'id'
            }


        ]

        attributes.forEach(elem => {
            console.log(elem)
            const input = document.createElement('input')
            input.className = 'input';

            console.log(Object.entries(attributes))
            Object.keys(elem).forEach(attr => {


                input.setAttribute(attr, elem[attr])

                input.innerHTML;
                container.prepend(input);
            })


        })



        const header = document.createElement('div')
        header.className = 'header__list';
        header.innerHTML = 'Создать контакт'
        const divHeader = document.querySelector('.container')
        console.log(divHeader)
        container.prepend(header)

        const button = document.createElement('button')
        button.className = 'button';
        button.innerHTML = 'Отправить'
        container.append(button)
        console.log(button)

        container.addEventListener("submit", (event) => {
            event.preventDefault()
            const { elements } = container

            let contact = {}

            Array.from(elements).filter(element => element.name).forEach(element => {
                const { name, value } = element
                contact[name] = value

                element.value = ""

            })

            super.add(contact);

            this.launchLocalStorage()


            console.log(contactsApp.data)


            const contactlist = document.querySelector('.list')

            const contactsHtml = `<div class="contact" id="${contact.id}">
        <div class="contact__content">
            <div class="content  name">${contact.name}</div>
            <div class="content  email">${contact.email}</div>
            <div class="content  address">${contact.address}</div>
            <div class="content  phone">${contact.phone}</div>
            </div>
            <div class="contact__button">
            <button class="button__edit" data-action="edit">edit</button>
            <button class="button__delete" data-action="delete">delete</button>
        </div>
    </div>`

            contactlist.insertAdjacentHTML('beforeend', contactsHtml)

        })





    }

    launchLocalStorage() {
        // console.log(contactsApp.data)
        if (!contactsApp.data.length) {
            return localStorage.removeItem('contactsApp')
        }

        localStorage.setItem('contactsApp', JSON.stringify(contactsApp.data))
        this.setCookie('storageExpiration', 'true')
    }

    setCookie(name, value) {
        let expires = new Date()
        expires.setDate(expires.getDate() + 10)
        document.cookie = `${name}=${value}; path=/; expires=${expires}`
    }

    getLocalstorage() {
        if (!localStorage.length) {
            this.getData()
        } else {
            return
        }

    }

    getData() {

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.data = data
                localStorage.setItem('Usersdata', JSON.stringify(this.data))

                console.log(this.data)
            })

    }




    onRemove() {
        super.remove(contact.id)

        const remove = document.querySelector('.list')
        remove.addEventListener('click', function (event) {
            event.preventDefault()
            const { target } = event

            console.log(target)

            if (event.target.dataset.action === "delete") {
                console.log(event.target)
                const node = event.target.closest('.contact')
                console.log(node.id)
                const id = node.id
                console.log(id)
                console.log(contactsApp)

                const index = Array.from(contactsApp.data).findIndex(function (elem) {
                    console.log(elem)
                    if (elem.id == id) {
                        return true
                    }

                })
                console.log(index)
                contactsApp.data.splice(index, 1)
                localStorage.setItem('contactsApp', JSON.stringify(contactsApp.data))

                node.remove()

            }



        })

    }



    onEdit() {
        super.edit(parent.id, {
            id: `${contact.id}`,
            name: `${contact.name}`,
            email: `${contact.email}`,
            address: `${contact.address}`,
            phone: `${contact.phone}`
        })

        const edit = document.querySelector('.list')
        edit.addEventListener('click', function (event) {


            if (event.target.dataset.action === "edit") {
                const node = event.target.closest('.contact')
                const id = node.id

                const name = node.firstElementChild.firstElementChild
                console.log(name)

                name.innerHTML = prompt("Сhange the name", name.textContent)


                const email = name.nextElementSibling
                console.log(email)
                email.innerHTML = prompt("Change email", email.textContent)

                const address = email.nextElementSibling
                console.log(address)
                address.innerHTML = prompt("Change address", address.textContent)

                const phone = address.nextElementSibling
                console.log(phone)
                phone.innerHTML = prompt("Change phone", phone.textContent)

                console.log(contactsApp.data)

            }
            console.log(contactsApp.data)
            localStorage.setItem('contactsApp', JSON.stringify(contactsApp.data))
        })


    }

}


const contactsApp = new ContactsApp()

console.log(contactsApp)

