const Comment = ({ message,handleBlock,handleUnblock }) => {


    return (<div>
        {
            message.length > 0 ?
                (<div>
                    <ul>
                        {message.map((elt, index) => (
                            <li key={index}>{elt.freeText}<button onClick={() => handleBlock(elt.id)}>block</button><button onClick={() => handleUnblock(elt.id)}>unblock</button></li>

                        ))}
                    </ul>

                </div>
                ) : (
                    <div>
                        <span>No comments </span>
                    </div>
                )
        }
    </div>)
}

export default Comment