import 'customcss/Comment.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Comment = ({ message, handleBlock, handleUnblock }) => {


    return (<div>
        {
            message.length > 0 ?
                (<div>
                    <div>
                        {message.map((elt, index) => (
                            <div className='p-d-flex p-jc-between comment-div row' key={index}>
                                <div className='col-9'>
                                    {elt.freeText}
                                </div>
                                <div className='col-2'>
                                    <FontAwesomeIcon icon="lock-open" color='#5F98FA'  size='smaller' onClick={() => handleBlock(elt.id)} />
                                    <FontAwesomeIcon icon="lock" color='#5F98FA'  size='smaller' onClick={() => handleUnblock(elt.id)} />
                                </div>
                            </div>

                        ))}
                    </div>

                </div>
                ) : (
                    <div>
                        <span>Aucun commentaire pour le moment </span>
                    </div>
                )
        }
    </div>)
}

export default Comment