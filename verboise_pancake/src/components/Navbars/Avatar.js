
import avatar from 'assets/images/default-avatar.png'
import 'customcss/Avatar.scss'
const Avatar = () => {

    return(
        <label for="photo-upload" className="custom-file-upload fas">
          <div className="img-wrap img-upload" >
            <img for="avatar-pic photo-upload" className="avatar-pic" src={avatar}/>
          </div>
          <input id="photo-upload" type="file" /> 
        </label>
      );
}

export default Avatar