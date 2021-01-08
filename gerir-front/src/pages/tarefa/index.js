import React from 'react';

const Tarefas = () => {
    return (
        <div>
            <Container>
      
                <Card>
                    <Card.Body>
                        <Form>
                             <Form.Group controlId="formBasicEmail">
                        		<Form.Label>Título</Form.Label>
                        <Form.Control type="text" placeholder="Informe o titulo" required />
                    </Form.Group>

                             <Form.Group controlId="formBasicEmail">
                        		<Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" placeholder="Informe a descrição" required />
                    </Form.Group>

                           
                            <Button type="submit">Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            
                        </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </Table>
            </Container>
        </div>
    )
    export default Tarefas;
}