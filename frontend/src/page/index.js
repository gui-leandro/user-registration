import React, { useState, useEffect } from 'react'
import api from '../services/api'   //API do back-end com Axios
import './style.css'

import logoImg from '../assets/logo.png'
import gitImg from '../assets/github.png'
import linkedinImg from '../assets/linkedin.png'

export default function Main() {
    //Variáveis que armazenam os dados do formulário
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    let [id, setId] = useState('')

    //Dispara uma função em determinado momento, nesse caso assim que é mostrado em tela
    const [users, setUsers] = useState([])
    useEffect(() => {
        api.get('/').then(res => {
            setUsers(res.data)
        })
    }, []) // Com o array vazio executa apenas uma única vez no fluxo do componente

    //Função que pega os dados do form salvos
    async function userRegister(e) {
        e.preventDefault()

        let data = {
            name,
            email,
            phone
        }
        //Salva os dados do novo usuário no banco de dados do back-end
        try {
            const response = await api.post('/', data)
            alert(`Novo usuário de ID:${response.data.id} cadastrado.`)
            data = {
                name: setName(''),
                email: setEmail(''),
                phone: setPhone('')
            }
            //Recarrega a página para atualizar a lista
            window.location.reload();
        } catch(error) {
            alert('Erro no cadastro.')
            data = {
                name: setName(''),
                email: setEmail(''),
                phone: setPhone('')
            }
        }
    }
    //Função que chama o método do back responsável pela exclusão do usuário
    function userDelete(e) {
        e.preventDefault()

        api.delete(`/${id}`)
        //Atualiza a lista de usuários mostrando apenas quem não foi excluído
        setUsers(users.filter(user => user.id !== id))
        id = setId('')
    }
    //Interface do sistema, retorno do HTML
    return (
        <div id="mainContainer">
            <header id="header">
                <img src={logoImg} alt="logo" />
            </header>

            <div className="container">
                <div id="userlist">
                    <div className="list">
                        <h3>User List</h3>
                    </div>
                    
                    { users.map(user => (
                        <ul key={user.id}>
                            <li style={{ color: "#ff0000" }}><strong>ID: {user.id}</strong></li>
                            <li>Name: {user.name}</li>
                            <li>E-mail: {user.email}</li>
                            <li>Phone: {user.phone}</li>
                        </ul>
                    ))}
                    
                </div>
                <div id="form">
                    <form onSubmit={userRegister}>
                        <p>Register User</p>
                        <input
                            type="text" 
                            placeholder="Name" 
                            maxLength="50" 
                            value={name} 
                            onChange={e => setName(e.target.value)}   
                        />
                        <input 
                            type="email" 
                            placeholder="E-mail" 
                            maxLength="50" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}    
                        />
                        <input 
                            type="text" 
                            placeholder="Phone" 
                            maxLength="11" 
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
                            maxLength="8" 
                            value={id}
                            onChange={e => setId(e.target.value)}    
                        />
                        <input className="button" type="submit" value="Delete"/>   
                    </form>
                </div>
            </div>
            <footer id="footer">
                <a href="https://www.linkedin.com/in/guirdy1/" target="_blank"><img src={linkedinImg} alt="Linkedin" /></a>
                <a href="https://github.com/Guirdy/user-registration" target="_blank"><img src={gitImg} alt="Github" /></a>
                <p>Copyright {'\u00A9'} User Registration | Todos os direitos reservados.</p>
            </footer>
        </div>
    )
}