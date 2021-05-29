import React, { useState } from "react";
import {QRCode} from 'react-qr-svg'
import axios from 'axios'
import "helper/axiosConfig"

function Dashboard() {

  const [title, setTitle] = useState('')
  const [selected, setSelected] = useState('')
  const [link, setLink]= useState('')
  const [loaded, setLoaded] = useState(false)


  const generateLink =(x)=> {
    console.log(x)
   let url=process.env.REACT_APP_EVENTBASEURL + x
   setLink(url)
  }


  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleSelected = (event) => {
    setSelected(event.target.value)
  }

  const handleSubmit = () => {
    const data = {
      title: title,
      selected: selected
    }
    
    axios.post('/createEvent', data).then(res => {

      if(res.status === 200){
        console.log(res)
        generateLink(res.data.message)
        setLoaded(true)
      }
    }).catch(err => {
      console.log(err.response)
    })


  }
  return (
    <div className="container bootstrap snippet">
      <div className="main-div">
        <div className="center-div">
          <label htmlFor="exampleFormControlInput1" className="form-label">Titre</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="title" onChange={(event) => handleTitle(event)} />
          <select className="form-select" aria-label="Default select example" onChange={(event) => handleSelected(event)}>
            <option value="polls">Polls</option>
            <option value="reactions">Reaction</option>
          </select><br />
          <button className='btn-primary' onClick={() => handleSubmit()}>submit</button>
          {loaded && <div>
            <h3>{link}</h3>
            <QRCode  bgColor="#FFFFFF"
                fgColor="#000000"
                level="Q"
                style={{ width: 256 }}
                value={link} />
            {/* <QRCode src={link} /> */}
            </div>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
