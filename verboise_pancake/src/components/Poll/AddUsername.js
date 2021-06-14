const { Button } = require('react-bootstrap')
import { InputText } from "primereact/inputtext";


const AddUsername = ({ pseudo, handlePseudo,handleFocus, handleValidatePseudo, userNameErr }) => {

    return (
        <div className='join-poll  p-d-flex p-jc-center ' >
            <div className='join-poll-body p-d-flex p-jc-center p-shadow-14'>
                <div  style={{marginTop: '20vh'}}>
                <div className="input-div">
                <span className="p-float-label">
                  <InputText
                    id="username"
                    value={pseudo}
                    className='inpt-join'
                    onFocus = {() =>handleFocus()}
                    onChange={(event) => handlePseudo(event.target.value)}                    
                  />
                  <label
                    htmlFor="username"
                    className="label-password"
                    
                  >
                    Entrez un nom d'utilisateur
                  </label>
                </span>
                </div>
                {userNameErr && <div class="error-div">
                    <small id="username2-help error-div" className="p-error">
                    Nom d'utilisateur invalide.{" "}
                    </small>
                  </div>}
                <div style = {{marginTop: '4vh'}} className=' p-d-flex p-jc-center'>
                <Button onClick={handleValidatePseudo}>Rejoindre </Button>
                </div>
                </div>
            </div>
        </div>
    )


}

export default AddUsername