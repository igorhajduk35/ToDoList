import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
    const currentUser = "Adam";

    return(
        <Nav variant="underline" className="justify-content-center" activeKey="/home">
            <Nav.Item>
                <Nav.Link as={NavLink} to="/home">
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/my_tasks">
                    My Tasks
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/my_team">
                    My Team
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to={`/profile/${currentUser}`}>
                    Me
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default NavigationBar;