import React, { useState } from 'react'
import api from '../services/api'
import './style.css'

import logoImg from '../assets/logo.png'

export default function Main() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [id, setId] = useState('')

    async function userRegister(e) {
        e.preventDefault()

        let data = {
            name,
            email,
            phone
        }

        try {
            const response = await api.post('/', data)
            alert(`Novo usuário de ID:${response.data.id} cadastrado.`)
            data = {
                name: setName(''),
                email: setEmail(''),
                phone: setPhone('')
            }
        } catch(error) {
            alert('Erro no cadastro.')
            data = {
                name: setName(''),
                email: setEmail(''),
                phone: setPhone('')
            }
        }
    }

    async function userDelete(e) {
        e.preventDefault()

        const data = {
            id
        }

        await api.delete(`/${data.id}`)
        alert('User deleted')
        data = {
            id: setId('')
        }
    }

    return (
        <div id="mainContainer">
            <header id="header">
                <img src={logoImg} alt="logo" />
            </header>

            <div className="container">
                <div id="userlist">
                    <div className="count">
                        <h3 id="flex1">User List</h3>
                        <h3 id="flex2">Total: 3</h3>
                    </div>
                    <ul>
                        <li>ID: 21174632</li>
                        <li>Name: Guilherme</li>
                        <li>E-mail: guilherme@email.com</li>
                        <li>Phone: 11970707070</li>
                    </ul>
                    <ul>
                        <li>ID: 21174632</li>
                        <li>Name: Guilherme</li>
                        <li>E-mail: guilherme@email.com</li>
                        <li>Phone: 11970707070</li>
                    </ul>
                    <ul>
                        <li>ID: 21174632</li>
                        <li>Name: Guilherme</li>
                        <li>E-mail: guilherme@email.com</li>
                        <li>Phone: 11970707070</li>
                    </ul>
                </div>
                <div id="form">
                    <form onSubmit={userRegister}>
                        <p>Register User</p>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}   
                        />
                        <input 
                            type="email" 
                            placeholder="E-mail" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}    
                        />
                        <input 
                            type="text" 
                            placeholder="Phone" 
                            value={phone}
                            onChange={e => setPhone(e.target.value)}    
                        />
                        <input className="button" type="submit" value="Register"/>               
                    </form>
                    <form onSubmit={userDelete}>
                        <p>Delete User</p>
                        <input 
                            type="text" 
                            placeholder="User ID" 
                            value={id}
                            onChange={e => setId(e.target.value)}    
                        />
                        <input className="button" type="submit" value="Delete"/>   
                    </form>
                </div>
                <div>

                </div>
            </div>
            <footer id="footer">
                <img src={logoImg} alt="Logo" />
                <p>Copyright {'\u00A9'} User Registration | Todos os direitos reservados</p>
            </footer>
        </div>
    )
}