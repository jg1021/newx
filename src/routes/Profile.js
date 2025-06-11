import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, query, doc, where,addDoc, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            console.log("userObj" + userObj);
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
        
    }

    /*
    const getMyNxs = async () => {
        const q = query(collection(dbService, "nx"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "asc"));
        const nxs = await getDocs(q);
        console.log(nxs.docs.map((doc) => doc.data()));
    }

    useEffect(() => {
        getMyNxs();
    }, []);*/

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;