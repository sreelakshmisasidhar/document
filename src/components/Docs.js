import React, { useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';





import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot
} from 'firebase/firestore';
import {  useNavigate } from 'react-router-dom';
import ComModal from './ComModal';

export default function Docs({
    database
}) {

    let navigate = useNavigate();
    const isMounted = useRef()
    const [open, setOpen] = React.useState(false);
    const [docsData, setDocsData] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('');
    const collectionRef = collection(database, 'docsData')

    const addData = () => {
        if(title){
        addDoc(collectionRef, {
            title: title,
            docsDesc: ''
        })
            .then(() => {
                alert('Data Added');
                handleClose()
            })
            .catch(() => {
                alert('Cannot add data');
            });
        }
        else{
            alert('Title cannot be empty')
        }

    }
    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }))
        })
    }

    const getID = (id) => {
        navigate(`/editDocs/${id}`)
    }
    useEffect(() => {
        if (isMounted.current) {
            return
        }

        isMounted.current = true;
        getData()
    }, [])

    const deleteData =(id) => {
        const docRef = doc(database,'docsData',id);


        deleteDoc(docRef)
        .then(()=>{
            alert('Data Deleted');
        })
        .catch(()=>{
            alert('cannot delete data')
        })
        getData()
    };



    return (
        <div className='docs-main'>
                            <h1>Docs </h1>
                
                            <button
                                className='add-docs'
                                onClick={handleOpen}
                            >
                                Add a Document
                            </button>
                            <div className='grid-main'>
                         
                                    {docsData.map((doc) => {
                                        return (
                                            <div className='grid-child' >
                                                <p>{doc?.title}</p>                          
                                               <div style={{marginLeft:'20px'}}>
                                                <BorderColorIcon onClick={() => getID(doc?.id)}/>
                                                <DeleteIcon onClick={(e)=>deleteData(doc?.id)} /></div>
                                                <div dangerouslySetInnerHTML={{ __html: doc.docsDesc }} />
                                            </div>
                                        )
                                    })}
                    </div>
                    <ComModal
                        open={open}
                        setOpen={setOpen}
                        title={title}
                        setTitle={setTitle}
                        addData={addData}
                    />
        </div>
    )
}