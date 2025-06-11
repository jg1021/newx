import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import NxFactory from "components/NxFactory";
import Nx from "components/Nx";
 
const Home = ({ userObj }) => {
    const [nxs, setNxs] = useState([]);
/*
    const getNxs = async () => {
        const dbNxs = await getDocs(collection(dbService, "nx"));
        dbNxs.forEach((doc) => {
            const nxObject = { ...doc.data(), id: doc.id };
            setNsx((prev) => [nxObject, ...prev])
        });        
    };*/

    useEffect(() => {
        //getNxs();
        onSnapshot(collection(dbService, "nx"), (snapshot) => {
            const newArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNxs(newArray);
        });
    }, []);



    return (
        <>
            <NxFactory userObj={userObj} />
            <div>
                {nxs.map((nx) =>(
                    /*
                    <div key={nxs.id}>
                        <h4>{nx.text}</h4>
                    </div>*/
                    <Nx key={nx.id} nxObj={nx} isOwner={nx.creatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
};

export default Home;