import { useState } from 'react'
import avatar from 'assets/images/default-avatar.png'
import 'customcss/Avatar.scss'

const Avatar = ({imgSrc , handleUploadImage}) => {
  
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