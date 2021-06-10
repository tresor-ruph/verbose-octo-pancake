const { Button } = require('react-bootstrap')


const AddUsername = ({ pseudo, handlePseudo, handleValidatePseudo }) => {

    return (
        <div>
            <div>
                <input type='text' className='form-control' onChange={(event) => handlePseudo(event.target.value)} value={pseudo} placeholder='enter your pseudo' />
                <Button onClick={handleValidatePseudo}> JOIN </Button>
            </div>
        </div>
    )


}

export default AddUsername