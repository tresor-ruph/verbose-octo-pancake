import 'customcss/eventStatus.scss'
const EventStatus = ({status}) => {
 
    return (
        <div className="event-status ">

            { status === 'inactive' ?
                <div >
                    <div className="main-div">
                        <div className=" p-d-flex p-jc-center evt-status-text">
                            <span className="">The event has not started</span>
                        </div>
                    </div>
                </div> :
                <div className=" ">
                    <div className="main-div">
                        <div className="p-d-flex p-jc-center evt-status-text">
                            <span className="">The event is over</span>
                        </div>
                    </div>
                </div>}

        </div>
    );
}

export default EventStatus