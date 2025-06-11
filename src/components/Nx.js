import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Nx = ({ nxObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNx, setNewNx] = useState(nxObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        //console.log(ok);
        if(ok) {
            //console.log(nxObj.id);
            const data = doc(dbService, "nx", nxObj.id);
            //console.log(data);
            await deleteDoc(data);
            if(nxObj.attachmentUrl !== ""){
                const desertRef = ref(storageService, nxObj.attachmentUrl); 
                await deleteObject(desertRef);  
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNx(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const data = doc(dbService, "nx", nxObj.id);
        await updateDoc(data, {text: newNx});
        setEditing(false);  
    };

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newNx} required />
                        <input type="submit" value="Update Nx" />
                    </form>
                    <button onClick={{toggleEditing}}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nxObj.text}</h4>
                    {nxObj.attachmentUrl && (
                        <img src={nxObj.attachmentUrl} width="50px" height="50px" alt="" />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nx</button>
                            <button onClick={toggleEditing}>Edit Nx</button>
                        </>
                    )}
                </>
            )}           
        </div>
    );
};

export default Nx;