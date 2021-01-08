import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Table, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Tarefas = () => {

    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dataentrega, setDataEntrega] = useState('');
    const [status, setStatus] = useState('');
    const [tarefa, setTarefa] = useState([]);

    useEffect(() => {
        listarTarefas();
    }, [])
    const listarTarefas = () => {
        //Por padrão no fetch é get 
        fetch('https://localhost:5001/api/tarefa', {
            method: 'Get',
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token-gerir')
        }})

            .then(response => response.json())
            .then(resposta => {
                setTarefa(resposta.data)
                console.log("Lista: ", resposta)
            })
            

    }
    const salvar =(event) => {
        event.preventDefault();

        //Crio o objeto tarefa
        const tarefa = {
            titulo : titulo,
            descricao : descricao,
            categoria : categoria,
            dataentrega : dataentrega,
            status : status
        }

        console.log(tarefa);

        const method = (id === 0 ? 'POST' : 'PUT');
        const urlRequest = (id === 0 ? 'https://localhost:5001/api/tarefa' : 'https://localhost:5001/api/tarefa/' + id);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(tarefa),
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-gerir'),
                'content-type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Tarefa salva');

            listarTarefas();
            limparCampos();
        })
    }

        const editar = (event) => {
            event.preventDefault();
            fetch('https://localhost:5001/api/tarefa/buscartarefa/' + event.target.value,{
                method : 'GET' , 
                headers : {
                    'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setId(data.id);
                setTitulo(data.titulo);
                setDescricao(data.descricao);
                setCategoria(data.categoria);
                setDataEntrega(data.dataEntrega.substring(0,10));
                setStatus(data.status);
            })
            .catch ( error => {
                console.error(error);
            })
        }

        const excluir = (event) => {
            if(window.confirm("Deseja realmente excluir a sua tarefa?")){
                fetch("https://localhost:5001/api/tarefa/" + event.target.value , {
                    method : 'Delete',
                    headers : {
                        'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
                    }
                })
                .then(() =>{
                    alert('Tarefa excluida! Não tem mais volta >:)');
                    listarTarefas();
                } )
            }
        }
        
        const alterar = (event) => {
            if(window.confirm("Deseja realmente alterar a sua tarefa?")){
                fetch("https://localhost:5001/api/tarefa/alterarstatus/" + event.target.value , {
                    method : 'PUT',
                    headers : {
                        'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
                    }
                })
                .then(() =>{
                    alert('Tarefa Alterada!');
                    listarTarefas();
                } )
            }
        }

        const limparCampos = () => {
            setId (0);
            setTitulo ('');
            setDescricao ('');
            setCategoria ('');
            setDataEntrega ('');
            setStatus (false);
        }
    return (
        <div>
            <Container>

                <Card>
                    <Card.Body>
                        <Form onSubmit = { event => salvar(event)} >
                            <Form.Group controlId="formBasicTitulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" value = {titulo} placeholder="Informe o titulo" onChange={event => setTitulo (event.target.value)} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDescricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" placeholder="Informe a descrição"  value={descricao} onChange={event => setDescricao (event.target.value)} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control type="text" placeholder="Informe a categoria" value={categoria}  onChange={event => setCategoria (event.target.value)} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDataEntrega">
                                <Form.Label>Data de Entrega</Form.Label>
                                <Form.Control type="date" placeholder="Informe a data de entrega" value={dataentrega}  onChange={event => setDataEntrega (event.target.value)} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDataEntrega">
                                <Form.Label>Status</Form.Label>
                                <InputGroup.Prepend>
                                    <InputGroup.Checkbox value={status} onChange={event => setStatus(event.target.value)} arial-label="Checkbox for following" />
                                </InputGroup.Prepend>
                            </Form.Group>


                            <Button type="submit">Salvar</Button>

                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Data de Entrega</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tarefa.map((item , index) => {
                                return (
                                    <tr>
                                        <td>{item.titulo}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.dataEntrega}</td>
                                        <td>{item.status ? 'Para fazer' : 'Feito'}</td>
                                        <td>
                                    <Button variant="warning" value={item.id} onClick ={event => editar(event) }>Editar</Button>
                                    <Button variant="danger"  value={item.id} onClick = {event => excluir(event)}   >Excluir</Button>
                                    <Button variant="warning" value={item.id} onClick = {event => alterar(event)}>Alterar Status</Button>
                                </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>
            </Container>
        </div>
    )
}
export default Tarefas;