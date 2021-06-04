import { useState, useRef } from 'react'
import { Modal, Button, Popover, OverlayTrigger } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { storage } from 'helper/firebaseConfig'
import { PasswordVerification } from "helper/detailsVerification";
import Avatar from './Avatar'
import axios from 'axios'
import "helper/axiosConfig"
import 'customcss/settings.scss'

const UserSettings = ({ show, onHide }) => {
    const userInfo = useSelector(state => state.SessionReducer.user)
    const [userName, setUserName] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confDelete, setConfDelete] = useState(false)
    const [revealDeleteButton, setRevealDeleteButton] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)
    const [file, setFile] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [passwordErr, setPasswordErr] = useState(false)

    const dispatch = useDispatch();

    const user = useRef(null);

    //-------------------------------------Avater select and upload functions --------------------------


    const handleUploadImage = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setImgSrc(reader.result)
            setFile(file)
        }
        reader.readAsDataURL(file)
        console.log(file)


    }

    const handleUpdateUserInfo = () => {

        if (file === null) {
            let data = {
                username: userName,
                imageUrl: userInfo.picture
            }
            axios.put('/user', data).then(res => {
                console.log(res)
                dispatch({
                    type: "UPDATE_USER",
                    payload: {
                        username: userName,
                        picture: userInfo.picture
                    },
                });
                alert('update succesful')

            }).catch(err => {
                console.log(err)
                console.log(err.response)
            })
        }
        else {
            const uploadTask = storage.ref(`images/${file.name}`).put(file)
            uploadTask.on('state_changed', (snapshot) => {

            }, (error) => {

            }, () => {
                storage.ref('images').child(file.name).getDownloadURL().then(url => {
                    setImgUrl(url)
                    console.log('success')
                    if (userName.length < 3) {
                        console.log('please enter username')
                        return
                    }
                    let data = {
                        username: userName,
                        imageUrl: url
                    }
                    axios.put('/user', data).then(res => {
                        console.log(res)
                        dispatch({
                            type: "UPDATE_USER",
                            payload: {
                                username: userName,
                                picture: url
                            },
                        });

                    }).catch(err => {
                        console.log(err)
                        console.log(err.response)
                    })
                })
            })
        }

    }
    //-------------------------------------Avater select and upload functions --------------------------
    const handleName = (event) => {
        setUserName(event.target.value)
    }
    const handleOldPassword = (event) => {
        setOldPassword(event.target.value)
    }

    const handleNewPassword = (event) => {
        setNewPassword(event.target.value)
    }
    const handleNewPasswordFocus = () => {
        setPasswordErr(false)
    }
    const handlePasswordUpdate = () => {
        if (!PasswordVerification(newPassword)) {
            setPasswordErr(true)
            return
        }
        const data =
        {
            from_settings: true,
            oldPassword: oldPassword,
            password: newPassword
        }
        axios.put('/password', data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
            console.log(err.response)
        })

    }
    const handleDeleteAccount = () => {
        setConfDelete(true)

    }
    const handleConfirmDelete = (event) => {
        if (event.target.value === 'delete') {
            setRevealDeleteButton(true)
        } else {
            setRevealDeleteButton(false)

        }
    }
    const handleRemoveAccount = () => {
        console.log('test', userInfo.username)
        axios.delete(`/user/${userInfo.username}`).then(res => {
            dispatch({
                type: "LOG_OUT",
            });

        }).catch(err => {
            console.log(err)
            console.log(err.response)
        })

    }
    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                your password should contain atleast. 1 capital letter 1 small letter and
                6 characters
          </Popover.Content>
        </Popover>
    );

    return (
        <div>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onHide} backdrop="static" scrollable={true} dialogClassName="modal-90w" contentClassName='mod-content'>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='settings'>
                        <div className='setting-elt'>
                            <div className='item-title main-title'><FontAwesomeIcon icon='info-circle' style={{ marginRight: '10px' }} /><span style={{ fontWeight: 'bolder', }}>User Info</span></div>
                            <div className='item-title content-title'> Edit your user name and profile picture</div>
                            <div className='row user-info'>
                                <div className='col-md-3'>
                                    <Avatar imgSrc={userInfo.picture} handleUploadImage={handleUploadImage} />
                                </div>
                                <div className='col-md-5 username-info'>
                                    <input type='text' className='form-control username-inp field--not-empty' placeholder='Username' onChange={(event) => handleName(event)} required />

                                </div>

                            </div>
                            <div className='upd-usename'>
                                <Button onClick={() => handleUpdateUserInfo()}>update userinfo</Button>
                            </div>
                            <hr />

                        </div>
                        <div className='setting-elt'>
                            <div className='item-title main-title'> <FontAwesomeIcon icon='shield-alt' style={{ marginRight: '10px' }} /><span style={{ fontWeight: 'bolder' }}>Change Password</span></div>
                            <div className='item-title content-title'> Change your password</div>
                            <div className='user-info'>

                                <div className='col-md-5 username-info'>
                                    <input type='text' className='form-control username-inp field--not-empty' placeholder='Enter your old password' onChange={(event) => handleOldPassword(event)} />
                                </div>
                                <div className='col-md-5 username-info'>
                                    <div className='row' style={{ width: '30vw' }}>
                                        <div className='col-md-9'>
                                            <input type='text' className='form-control username-inp field--not-empty' placeholder='Enter your new password' onChange={(event) => handleNewPassword(event)} onFocus={() => handleNewPasswordFocus()} />
                                            {passwordErr && (
                                                <span className="pwd-inv-mess">password not valid</span>
                                            )}
                                        </div>
                                        <div className='col-md-1'>
                                            <OverlayTrigger
                                                rootClose={true}
                                                trigger="click"
                                                placement="right"
                                                overlay={popover}
                                            >
                                                <i
                                                    id="password"
                                                    className="far fa-question-circle title-i"
                                                    style={{ marginTop: '15px', color: '#888' }}
                                                ></i>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                </div>

                                <div className='username-info '>
                                    <Button onClick={() => handlePasswordUpdate()}>update password</Button>
                                </div>

                            </div>
                            <hr />

                        </div>
                        <div className='setting-elt'>
                            <div className='item-title main-title elt-del'> <FontAwesomeIcon icon='trash-alt' style={{ marginRight: '10px' }} /><span style={{ fontWeight: 'bolder' }}>Delete Account</span></div>
                            <div className='item-title content-title'> If you delete your account, all the data related to the app will be lost</div>
                            <div className='username-info'>
                                <Button variant="danger" onClick={() => handleDeleteAccount()}>Delete Account</Button>
                            </div>
                            {confDelete && <div className='col-md-5 username-info'>
                                <span style={{ fontSize: '0.9rem', color: '#888' }}>To delete your account, please enter the the word 'delete'</span>
                                <input type='text' className='form-control username-inp field--not-empty' placeholder="Enter the word 'delete'" onChange={(event) => handleConfirmDelete(event)} />
                            </div>}
                            {revealDeleteButton && <div className='username-info'>
                                <Button variant="danger" onClick={() => handleRemoveAccount()}> Confirm </Button>
                            </div>}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UserSettings