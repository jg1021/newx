import { dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const NxFactory = ({ userObj }) => {
    const [nx, setNx] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
        //const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            await uploadString(fileRef, attachment, 'data_url').then((snapshot) => {
                console.log('Uploaded a data_url string!');
            });   
            attachmentUrl = await getDownloadURL(ref(storageService, fileRef));
        }
        await addDoc(collection(dbService, "nx"), {
            text: nx,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        });
        setNx("");
        setAttachment("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target:{ value },
        } = event;
        setNx(value);
    };

    const onFileChange = (event) => {
        const {
            target:{files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget:{ result },
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit}>
            <input value={nx} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Nx" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" alt="attachment" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
                
            )}
        </form>
    )
};

export default NxFactory;