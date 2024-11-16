import { Card, Container } from 'react-bootstrap'
import { ListQuestionnaires } from './components/ListQuestionnaires';

export const ShowQuestionnaires = () => {
    const user = JSON.parse(localStorage.user);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>{user.rol == "administrator" ? "Cuestionarios creados" : "Tus cuestionarios"}</Card.Title>
                    <Card.Text><b>Formularios recientes:</b></Card.Text>
                    <ListQuestionnaires rol={user.rol} />
                </Card.Body>
            </Card>
        </Container>
    )
}
