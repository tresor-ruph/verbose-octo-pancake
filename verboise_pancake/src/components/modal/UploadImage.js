

import { useState, useEffect, useMemo } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { storage } from 'helper/firebaseConfig'
import { useSelector } from 'react-redux'
import { Dialog } from 'primereact/dialog';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const UploadImage = ({ hide, eventId }) => {
    const [files, setFiles] = useState([]);
    const eventState = useSelector(state => state.EventReducer.event)

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/*', maxFiles: 1,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {

        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files])

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const submitImage = () => {
        if (files === []) {
            return
        }

        const uploadTask = storage.ref(`${eventState.eventId}/${files[0].name}`).put(files[0]);
        uploadTask.on('state_changed', (snapshot) => {

        }, (error) => {
            console.log(error)
        }, () => {
            storage.ref(eventState.eventId).child(files[0].name).getDownloadURL().then(url => {
                const imageRef = storage.ref(eventState.eventId).child(files[0].name)
                hide(url, imageRef)

            })
        })
    }

    const footer = (
        <div>
            <Button variant="danger" onClick={() => hide()}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => submitImage()}>
                Save
            </Button>
        </div>

    )

    return (
        <div >
            <Dialog header="Create Event" showHeader={false} footer={footer} visible={true} style={{ width: '45vw' }} modal closable={false} onHide={() => hide(false)}>

                <section className="container" style={{ marginTop: '10vh' }}>
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside style={thumbsContainer}>
                        {thumbs}
                    </aside>
                </section>

            </Dialog>

        </div>
    )
}
export default UploadImage