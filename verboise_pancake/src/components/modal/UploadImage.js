

import {  useState, useEffect, useMemo } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { storage } from 'helper/firebaseConfig'
import {useSelector} from 'react-redux'

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
        if(files ===[]){
            return
        }

        const uploadTask = storage.ref(`${eventState[0].eventId}/${files[0].name}`).put(files[0]);
        uploadTask.on('state_changed', (snapshot)=> {

        }, (error) => {

        }, () =>{
            storage.ref(eventState[0].eventId).child(files[0].name).getDownloadURL().then(url => {
                const imageRef = storage.ref(eventState[0].eventId).child(files[0].name)
                hide(url, imageRef)

            })
        })
    }

    return (
        <div >
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={true} onHide={() => hide(false)} backdrop="static" scrollable={true} dialogClassName="modal-90w" contentClassName='mod-content'>
                <Modal.Header>
                    <div className='modal-event-title'>
                        {/* <span className='new-event-title'>New Event</span> */}
                    </div>
                    <hr />
                </Modal.Header>
                <Modal.Body>

                    <section className="container">
                        <div {...getRootProps({ style })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside style={thumbsContainer}>
                            {thumbs}
                        </aside>
                    </section>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="danger" onClick={() => hide()}>
                        Cancel
          </Button>
                    <Button variant="primary" onClick={() => submitImage()}>
                        Save
          </Button>



                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default UploadImage