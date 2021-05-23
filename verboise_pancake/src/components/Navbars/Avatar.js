import { useState } from 'react'
import avatar from 'assets/images/default-avatar.png'
import 'customcss/Avatar.scss'
const Avatar = () => {
  const [imgSrc, setImgSrc] = useState(null)
  const [file, setFile] = useState(null)

  const handleUploadImage = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImgSrc(reader.result)
      setFile(file)
    }
    reader.readAsDataURL(file)
    console.log(reader.result)
    console.log(file)


  }
  return (
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img htmlFor="avatar-pic photo-upload" className="avatar-pic"  src={imgSrc || avatar} />
      </div>
      <input id="photo-upload" type="file" onChange={(e) => handleUploadImage(e)} />
    </label>
  );
}

export default Avatar