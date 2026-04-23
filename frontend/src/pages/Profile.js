import ProfileSection from '../components/ProfilePage/ProfileSection';
import { useParams } from 'react-router-dom';

function Profile() {
    const { username } = useParams();    

    return(
        <div>
            <ProfileSection username={username}/>
        </div>
    );
}

export default Profile;