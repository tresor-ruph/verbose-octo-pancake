const EventStatus = ({status}) => {
 
    return (
        <div>

            { status === 'inactive' ?
                <div className="container bootstrap snippet">
                    <div className="main-div">
                        <div className="center-div">
                            <p className="text-res">The Event has not begun</p>
                        </div>
                    </div>
                </div> :
                <div className="container bootstrap snippet">
                    <div className="main-div">
                        <div className="center-div">
                            <p className="text-res">The event has ended</p>
                        </div>
                    </div>
                </div>}

        </div>
    );
}

export default EventStatus