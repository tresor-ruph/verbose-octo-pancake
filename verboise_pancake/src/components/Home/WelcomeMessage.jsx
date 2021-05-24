import { Button } from "react-bootstrap";


import "customcss/Welcome.scss";
const WelcomeMessage = ({ userName, handleEvent }) => {
  return (
    <div>
      <div className="home">
        <div className="card content p-shadow-23">
          <span className="welcome-title">{`Welcome ${userName}  !`}</span>
          <div className="welcome-content">
            Create your first event now and include your audience
          </div>
          <div className='start-btn'>
            <Button size="lg" className='test' onClick={() => handleEvent()}>
             <span style={{fontWeight: 'bold', fontSize:'1.1rem' }}>Create your first Event</span> 
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
