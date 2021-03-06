import React, { Component } from "react";
import "./userProfile.css";
import meme from "./meme.jpg";
import ProfileField from "./ProfileField"

class UserProfile extends Component {
    constructor() {
        super();

        this.state = {
            id: 2,
            name: "undefined user name",
            email: "undefined email",
            isInEditMode: false
        };
    };

    changeEditMode = () =>  {
        this.setState({ isInEditMode: !this.state.isInEditMode });
    };

    updateName = e => {
        this.setState({
            name: e.target.value
        });
    };

    updateEmail = e => {
        this.setState({
            email: e.target.value
        });
    }

    componentDidMount() {
        let userid = this.state.id;
        fetch(`http://localhost:5000/users/${userid}`)
            .then((response) => response.json())
            .then((responseJson) => {
                const { name, email } = responseJson;
                this.setState({ name, email })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { name, email } = this.state;

        return (

            <div className="userProfile">
                <div className="myProfile-bar">
                    <p>My Profile</p>
                </div>
                <button className="edit-save-btn" onClick={this.changeEditMode}>{this.state.isInEditMode ? "Save" : "Edit"}</button>

                <div className="infos">
                    <img src={meme} alt="image user" />
                    <div>
                        <ProfileField value={name} onChange={this.updateName} isEditing={this.state.isInEditMode} />
                        <ProfileField value={email} onChange={this.updateEmail} isEditing={this.state.isInEditMode} />
                    </div>
                </div>
            </div>
        )
    }
}





export default UserProfile;
