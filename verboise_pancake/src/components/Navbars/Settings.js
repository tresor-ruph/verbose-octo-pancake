import { useState, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    const dispatch = useDispatch();

    const user = useRef(null);

    const handleName = (event) => {
        setUserName(event.target.value)
    }
    const handleOldPassword = (event) => {
        setOldPassword(event.target.value)
    }

    const handleNewPassword = (event) => {
        setNewPassword(event.target.value)
    }

    const handleUpdateUserInfo = () => {

    }
    const handlePasswordUpdate = () => {
        if (oldPassword == '' || newPassword == '') {
            console.log('passwords cannot be null')
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
        }
    }
    const handleRemoveAccount = () => {
        console.log('test',userInfo.username)
        axios.delete(`/user/${userInfo.username}`).then(res => {
            dispatch({
                type: "LOG_OUT",
              });
            
        }).catch(err=> {
            console.log(err)
            console.log(err.response)
        })

    }
    return (
        <div>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onHide} backdrop="static" scrollable={true} dialogClassName="modal-90w" contentClassName='mod-content'>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='settings'>
                        <div className='setting-elt'>
                            <div className='item-title main-title'><FontAwesomeIcon icon='info-circle' style={{ marginRight: '10px' }} /><span style={{ fontWeight: 'bolder' }}>User Info</span></div>
                            <div className='item-title content-title'> Edit your user name and profile picture</div>
                            <div className='row user-info'>
                                <div className='col-md-3'>
                                    <Avatar />
                                </div>
                                <div className='col-md-5 username-info'>
                                    <input type='text' className='form-control username-inp field--not-empty' placeholder='Username' onChange={(event) => handleName(event)} ref={user} />

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
                                    <input type='text' className='form-control username-inp field--not-empty' placeholder='Enter your new password' onChange={(event) => handleNewPassword(event)} />
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