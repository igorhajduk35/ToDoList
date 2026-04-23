import { useState } from "react";
import { useEffect } from "react";
import './ProfileSection.css';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// make every link /profile/USERNAME
// if page no exist show something


function ProfileSection({username}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!username) {
            console.log("Nope");
            return;
        };

        const fetchUserInfo = async() => {
            const res = await fetch(`http://localhost:5050/user/${username}`);

            const data = await res.json();
            setUser(data);
        }

        fetchUserInfo();

        console.log(username);
    }, [username]);


    if (!user) return <div>Loading..</div>

    return(
        <div className="d-flex flex-column align-items-center text-center py-3">
            <Col>
                <Image
                    src="/photo.png"
                    roundedCircle
                    width={300}
                    height={300}
                    className="me-3"
                />
            </Col>
            <div className="fw-semibold mt-3">
                <h2>{user.username}</h2>
            </div>
        </div>
    );
}

export default ProfileSection;