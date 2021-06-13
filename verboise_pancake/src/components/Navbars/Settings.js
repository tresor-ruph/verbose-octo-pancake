import React, { useState, useRef } from 'react'
import { Button } from 'react-bootstrap'
import { Dialog } from 'primereact/dialog';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { storage } from 'helper/firebaseConfig'
import { PasswordVerification } from "helper/detailsVerification";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Toast } from 'primereact/toast';

import Avatar from './Avatar'
import axios from 'axios'
import "helper/axiosConfig"
import 'customcss/settings.scss'

const UserSettings = ({ show, onHide }) => {
    const userInfo = useSelector(state => state.SessionReducer.user)
    const [userName, setUserName] = useState(userInfo.username)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confDelete, setConfDelete] = useState(false)
    const [revealDeleteButton, setRevealDeleteButton] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)
    const [file, setFile] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [passwordErr, setPasswordErr] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null);
    const toast = useRef(null);

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
                    if (userName.length < 3) {
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
                        toast.current.show({severity:'success', summary: 'user updated', detail:'User updated', life: 3000});


                    }).catch(err => {
                        console.log(err)
                        console.log(err.response)
                        toast.current.show({severity:'error', summary: 'Error', detail:'An error occured', life: 5000});

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
            toast.current.show({severity:'success', summary: 'user updated', detail:'password updated', life: 3000});

        }).catch(err => {
            console.log(err)
            console.log(err.response)
            toast.current.show({severity:'error', summary: 'Error', detail:'An error occured', life: 5000});

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
        axios.delete(`/user/${userInfo.username}`).then(res => {
            dispatch({
                type: "LOG_OUT",
            });

        }).catch(err => {
            console.log(err)
            console.log(err.response)
        })

    }
 


    return (
        <div>
            <Dialog header="" showHeader={true} visible={show} style={{ width: '70vw' }} closable modal onHide={onHide}>


                <div className='settings'>
                    <Accordion activeIndex={0}>
                        <AccordionTab header={<React.Fragment> <div className='item-title main-title'><FontAwesomeIcon icon='info-circle' style={{ marginRight: '10px' }} /><span style={{ fontWeight: 'bolder', }}>User Info</span></div>
                        </React.Fragment>}>
                            <div className='setting-elt'>
                                <div className='item-title content-title'> Edit your user name and profile picture</div>
                                <div className='row user-info'>
                                    <div className='col-md-3'>
                                        <Avatar imgSrc={userInfo.picture || imgSrc} handleUploadImage={handleUploadImage} />
                                    </div>
                                    <div className='col-md-5 username-info'>
                                        <span className="p-float-label">
                                            <InputText id="username" className='usr-name' value={userName} onChange={(event) => handleName(event)} />
                                            <label htmlFor="username" className='usr-lbl'>Username</label>
                                        </span>
                                    </div>

                                </div>
                                <div className='upd-usename'>
                                    <Button onClick={() => handleUpdateUserInfo()}>update userinfo</Button>
                                </div>
                              

                            </div>
                        </AccordionTab>
                        <AccordionTab header={<React.Fragment> <div className='item-title main-title'><FontAwesomeIcon icon='shield-alt' style={{ marginRight: '10px' }} /><span style={{ fontWeight: 'bolder' }}>Change Password</span></div>
                        </React.Fragment>}>
                            <div className='setting-elt'>
                                <div className='item-title main-title'> </div>
                                <div className='item-title content-title'> Change your password</div>
                                <div className='user-info'>

                                    <div className='col-md-5 username-info'>
                                        <span className="p-float-label">
                                            <Password className='usr-name' onChange={(event) => handleOldPassword(event)} feedback={false} toggleMask />
                                            <label htmlFor="password" className='usr-lbl'>Enter your old password</label>
                                        </span>
                                    </div>

                                    <div className='col-md-5 username-info' style={{ marginTop: '4vh' }}>
                                        <span className="p-float-label">
                                            <Password className='usr-name' onChange={(event) => handleNewPassword(event)} feedback={false} toggleMask onFocus={() => handleNewPasswordFocus()} />
                                            <label htmlFor="password" className='usr-lbl'>Enter your new password</label>
                                            {passwordErr && (
                                                <span className="pwd-inv-mess">password not valid</span>
                                            )}
                                        </span>
                                    </div>

                                    <div className='username-info '>
                                        <Button onClick={() => handlePasswordUpdate()}>update password</Button>
                                    </div>

                                </div>
                                <hr />

                            </div>
                        </AccordionTab>
                        <AccordionTab header={<React.Fragment> <div className='item-title main-title'><FontAwesomeIcon icon='trash-alt' style={{ marginRight: '10px' }} /><span style={{ fontWeight: 'bolder' }}>Delete Account</span></div>
                        </React.Fragment>}>
                            <div className='setting-elt'>
                                <div className='item-title content-title'> If you delete your account, all the data related to the app will be lost</div>
                                <div className='username-info'>
                                    <Button variant="danger" onClick={() => handleDeleteAccount()}>Delete Account</Button>
                                </div>
                                {confDelete && <div className='col-md-5 username-info'>
                                    <span style={{ fontSize: '0.9rem', color: '#888' }}>To delete your account, please enter the the word 'delete'</span><br /><br />
                                    <div className='username-info'>
                                        <span className="p-float-label">
                                            <InputText id="deleteAcc" className='usr-name' onChange={(event) => handleConfirmDelete(event)} />
                                            <label htmlFor="deleteAcc" className='usr-lbl'>Type <span className='text-danger'>delete</span> to confirm</label>
                                        </span>
                                    </div>
                                </div>}
                                {revealDeleteButton && <div className='username-info'>
                                    <Button variant="danger" onClick={() => handleRemoveAccount()}> Confirm </Button>
                                </div>}
                            </div>
                        </AccordionTab>
                    </Accordion>
                </div>

            </Dialog>
        </div>
    )
}

export default UserSettings