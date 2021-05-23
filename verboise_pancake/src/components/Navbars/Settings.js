import { useState, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from './Avatar'
import 'customcss/settings.scss'

const UserSettings = ({ show, onHide }) => {

    const [userName, setUserName] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
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

    }
    const handleRemoveAccount = () => {

    }
    return (
        <div>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onHide} backdrop="static" scrollable={true} dialogClassName="modal-90w" contentClassName='mod-content'>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='settings'>
                        <div className='setting-elt'>
                            <div className='item-title main-title'><FontAwesomeIcon icon='info-circle' size='md' style={{ marginRight: '10px' }} /><span style={{ fontWeight: 'bolder' }}>User Info</span></div>
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
                            <div className='item-title main-title'> <FontAwesomeIcon icon='shield-alt' size='sm' style={{ marginRight: '10px' }} /><span style={{ fontWeight: 'bolder' }}>Change Password</span></div>
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
                            <div className='item-title main-title elt-del'> <FontAwesomeIcon icon='trash-alt' size='sm' style={{ marginRight: '10px' }} /><span style={{ fontWeight: 'bolder' }}>Delete Account</span></div>
                            <div className='item-title content-title'> If you delete your account, all the data related to the app will be lost</div>
                            <div className='username-info'>
                                <Button variant="danger" onClick={() => handleRemoveAccount()}>Delete Account</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UserSettings