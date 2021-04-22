import { useState } from 'react';
import { Container, Row, Form, InputGroup } from 'react-bootstrap';
import EmTable from '../Table/Table';

const Main = () => {
    const [searchEm, setSearchEm] = useState('');

    const nameSearch = e => setSearchEm(e.target.value);

    return (
        <Container>
        <Row>
            <Form>
                <InputGroup className="mb-3 ml-3 mt-3">
                    <Form.Control type='text' placeholder='Search Employee Name...' onInput={nameSearch} style={{cursor: 'pointer'}}/>
                </InputGroup>
            </Form>
        </Row>
        <Row>
            <EmTable filter={searchEm}/>
        </Row>
    </Container>
    )
};

export default Main;