
import { useState, useRef } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import axios from 'axios'
import "helper/axiosConfig"
import 'customcss/newEvent.scss'

/**
 * Composant modal pour la création d'un nouvel événement
 * 
 * @component NewEvents
 * @description Interface modale permettant aux utilisateurs de créer un événement
 * en spécifiant un nom et en sélectionnant un type parmi Gallup, Sondages ou Compétition
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {function} props.hide - Fonction de rappel pour fermer la modale
 *   - Appelée avec 'reload' pour indiquer qu'un rechargement est nécessaire
 *   - Appelée avec false pour simplement fermer la modale
 * 
 * @returns {JSX.Element} Interface modale de création d'événement
 * 
 * @example
 * <NewEvents hide={(action) => console.log('Modal action:', action)} />
 */
const NewEvents = ({ hide }) => {

    // États locaux pour la gestion du formulaire
    const [eventName, setEventName] = useState('') // Nom de l'événement saisi par l'utilisateur
    const [eventType, setEventType] = useState('') // Type d'événement sélectionné (gallup|polls|ranking)
    const [evtNameErr, setEvtNameErr] = useState(false) // État d'erreur pour le nom
    const [eventTypeErr, setEventTypeErr] = useState(false) // État d'erreur pour le type
    const toast = useRef(null); // Référence pour les notifications toast

    const footer = (
        <div style={{ marginRight: '4vw' }}>
            <Button label="Annuler" className='p-button-danger p-button-sm cancel-evt' onClick={() => hide(false)} />
            <Button label="Créer" className='p-button-sm save-evt' onClick={() => handleSubmit()} />
        </div>
    );

    /**
     * Gère la saisie du nom de l'événement
     * @param {Event} event - Événement de changement de l'input
     */
    const handleEventName = (event) => {
        setEventName(event.target.value)
    }

    /**
     * Gère la sélection du type d'événement
     * Met à jour l'interface visuelle et l'état
     * @param {string} x - Type d'événement sélectionné ('gallup'|'polls'|'ranking')
     */
    const handleSelect = (x) => {
        // Réinitialise le style de toutes les cartes
        let allCards = document.getElementsByClassName('p-card')
        Array.from(allCards).forEach(elt => {
            elt.style.backgroundColor = 'white'
        })
        // Met en évidence la carte sélectionnée
        let selectedCard = document.getElementsByClassName(`card-${x}`)
        Array.from(selectedCard)[0].style.backgroundColor = 'rgba(0,255,0,0.2)'
        setEventType(x)
        setEventTypeErr(false)
    }

    /**
     * Gère le focus sur le champ nom - supprime l'erreur
     */
    const handleEventNameFocus = () => {
        setEvtNameErr(false)
    }

    /**
     * Gère la perte de focus sur le champ nom - valide la saisie
     */
    const handleEventNameBlur = () => {
        if (eventName.length < 3) {
            setEvtNameErr(true)
        } else {
            setEvtNameErr(false)
        }
    }

    /**
     * Gère la soumission du formulaire de création d'événement
     * Valide les champs et envoie la requête de création
     */
    const handleSubmit = () => {
        let fieldError = false

        // Validation du nom d'événement
        if (eventName === '') {
            setEvtNameErr(true)
            fieldError = true
        }

        // Validation du type d'événement
        if (eventType === '') {
            setEventTypeErr(true)
            fieldError = true
        }

        if (fieldError) return

        const data = {
            title: eventName,
            selected: eventType
        }
        axios.post('/createEvent', data).then(res => {
            toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Événement créé avec succès', life: 3000 });
            hide('reload')

        }).catch(err => {
            console.log(err)

            if (err?.response?.status === 404) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Un événement avec ce nom existe déjà", life: 5000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Une erreur inattendue est survenue', life: 5000 });
            }
        })
    }

    return (
        <div >

            <Dialog header="Création d'un événement" showHeader={false} footer={footer} visible={true} style={{ width: '45vw' }} modal closable={false} onHide={() => hide(false)}>
                <Toast ref={toast} />
                <div>
                    <div className='new-event-body '>
                        <div >
                            <span className="p-float-label">
                                <InputText id="in" value={eventName} className='p-inputtext-md p-d-block p-mb-2 label-eventTitle' onChange={(e) => handleEventName(e)} onBlur={() => handleEventNameBlur()} onFocus={() => handleEventNameFocus()} />
                                <label htmlFor="in" style={{ color: 'gray', fontSize: '1vw' }}>Nom de l'événement</label>
                            </span>
                            {evtNameErr && <small id="in" className="p-error p-d-block">Le nom de l'événement doit contenir au moins 3 caractères.</small>}
                        </div>
                        <div className='evt-type'>
                            <span className='label-evt-type ' style={{ color: 'gray', fontSize: '1vw' }}>Type d'événement</span>
                        </div>
                        <div className='event-types row'>
                            <Card className='cards card-polls'>
                                <a className='stretched-link' onClick={() => handleSelect("polls")}>
                                    <div>
                                        <FontAwesomeIcon color='#888' icon='chart-bar' size="2x" />
                                    </div>
                                    Sondages
                                </a>
                            </Card>

                            <Card className='cards card-gallup' >

                                <a className='stretched-link' id='gallup' onClick={() => handleSelect("gallup")}>
                                    <div >
                                        <FontAwesomeIcon color='#888' icon='chart-line' size="2x" />
                                    </div>
                                    Gallup
                                </a>
                            </Card>

                            <Card className='cards card-ranking' id='ranking'>
                                <a className='stretched-link' id='gallup' onClick={() => handleSelect("ranking")}>
                                    <div>
                                        <FontAwesomeIcon icon='trophy' color='#888' size="2x" />
                                    </div>
                                    Compétition
                                </a>
                            </Card>
                        </div>
                        <div className='event-type-error'>
                            {eventTypeErr && <small id="username2-help" className="p-error p-d-block">Veuillez sélectionner un type d'événement.</small>}
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
export default NewEvents