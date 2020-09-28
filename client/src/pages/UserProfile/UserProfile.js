import React, { useState, useEffect } from "react"
import "./UserProfile.css"
import ProfileImage from "../../components/images/business-2.jpg"
import API from "../../utils/API/API"

const UserProfile = () => {

  // Function to show / hide input area when click on "Edit Profile" Button
  const [showInput, setShowInput] = useState({
    show: "",
  })

  function editProfileBtn() {
    if (showInput.show === "") setShowInput({ show: "profile-input-show" })
    else setShowInput({ show: "" }) 
  }

  const [userState, setUserState] = useState({
    realname:'',
    username: '',
    email: '',
    account_type:'',
    Reviews:[],
    Buisness: '',
    Settings: {},
    user:[],
    profileImg: '',
    bioChange: '',
    instaChange: '',
    facebookChange: '',
  })

  userState.handleInputChange = event => {
    setUserState({ ...userState, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    API.getUser()
      .then(({data}) => {
        let dataComeback = data[0]

        console.log("USER SETTINGS ", dataComeback.Settings)

        setUserState({ ...userState, realname: dataComeback.realname, username: dataComeback.username, email: dataComeback.email, account_type: dataComeback.account_type, Reviews: dataComeback.Reviews || [], Buisness: dataComeback.Buisness, Settings: dataComeback.Settings || {}})

        console.log("API DATA ", dataComeback)
      })
      .catch(err => console.log(err))
    
  },[])

  const handleSaveBtn = () => {
    console.log('jello')
    console.log(userState)
    let settings = {
      img: userState.profileImg,
      bio: userState.bioChange,
      instagram: userState.instaChange,
      facebook: userState.facebookChange
    }

    console.log(settings)
    if (userState.Settings === null){
      API.createSettings(settings)
      .then((data) => {
        // API.getUser()
        //   .then(({ data }) => {
        //     let dataComeback = data[0]

        //     setUserState({ ...userState, Settings: dataComeback.Settings })

        //     console.log(dataComeback.Settings)
        //   })
        //   .catch(err => console.log(err))
        console.log(data)
      })
      .catch((err) => console.log(err))
    } else {
      API.updateSettings(settings)
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
      console.log('else')
    }

    console.log(localStorage.getItem('user'))

    
  } 

  const handleUpdateBtn = () => {
    console.log(userState)
  }

  return (
    <div className="user-profile-page">

      <div className="changing-basic-info-area">
        <img className="profile-image" src={ProfileImage} alt="Profile Image" />
        <h1>{userState.realname}</h1>
        <p>City Of The User</p>

        <button className={`update-account-btn`} onclick={handleUpdateBtn}>Update Your Account</button>

        <button
          className={`edit-profile-btn ${showInput.show}`}
          onClick={editProfileBtn}
        >
          Edit Profile
        </button>


        <ul className={`hide ${showInput.show}`}>
          <li>
            <label>
              <i class="fas fa-signature"></i>
              <input
                type="text"
                name="bioChange"
                placeholder="Change Your Bio ..."
                onChange={userState.handleInputChange}
              />
            </label>
          </li>
          <li>
            <label>
              <i class="fas fa-unlock-alt"></i>
              <input
                type="text"
                name="instaChange"
                placeholder="Link Instagram..."
                onChange={userState.handleInputChange}
              />
            </label>
          </li>
          <li>
            <label>
              <i class="fas fa-city"></i>
              <input
                type="text"
                name="facebookChange"
                placeholder="Link Facebook ..."
                onChange={userState.handleInputChange}
              />
            </label>
          </li>

          <li>
            <label>
              <i class="fas fa-camera"></i>
              <input 
              type="submit" 
              name="profileImg" 
              value="Change Profile Picture" 
              onChange={userState.handleInputChange}
              />
            </label>
          </li>


          <div className="profile-save-cancel-btn">
            <button className="profile-save-btn" onClick={handleSaveBtn}>Save</button>
            <button className="profile-cancel-btn">Cancel</button>
          </div>
        </ul>
      </div>


      <div className="changing-account-type-area">
        <h1>Welcome back {userState.username}</h1>
        <h3>{userState.email}</h3>
        <div>
          <h3>Reviews</h3>
          {
            userState.Reviews.length > 0 ? (
              userState.Reviews.map(review => (
                <div key={review._id}>
                  <h4>{review.buisness.name}</h4>
                  <p>{review.rating}</p>
                  <p>{review.rating}</p>
                </div>
            ))) : null
          }
        </div>
      </div>
    </div>
  )
}
          
export default UserProfile;
