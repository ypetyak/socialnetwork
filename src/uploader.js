import React from "react";
import axios from "./axios";

export default function Uploader(props) {
    function submit(e) {
        let file;
        // console.log("Our targete", e.target.files[0]);
        e.preventDefault();
        file = e.target.files[0];

        const fd = new FormData();

        fd.append("file", file);

        axios.post("/upload", fd).then(({ data }) => {
            props.updateImage(data.avatar_url);
        });
    }

    return (
        <div className="uploaderPopup">
            <p className="crossButton" onClick={props.closePopup}>
                X
            </p>
            <p className="popupText"> Change your avatar? </p>
            <input
                id="myInput"
                type="file"
                accept="image/*"
                onChange={submit}
            />
            <label className="uploadLabel" htmlFor="myInput">
                Update
            </label>
        </div>
    );
}

// loadImage() {
//     var file = $('input[type="file"]').get(0).files[0];
//     // console.log("File: ", file);
//     var formData = new FormData(); // formData is used when we are dealing with Files.
//     formData.append("file", file);
//
//     axios.post("/upload", formData).then(results => {
//         console.log(results);
//     });
//     // console.log("resp in POST /upload: ", res);

//     submit(){
//     const fd = new FormData;
//     axios.post('/upload', fd).then(
//         ({data}) => {
//             this.props.updateImage(data.imageUrl);
//         }
//     );
// }
//

// import React from 'react';
// import axios from './axios';
//
// export default function Uploader(props){
//
// function submit(e){
//
//     e.preventDefault();
//     var file = $('input[type="file"]').get(0).files[0];
//
//     const fd = new FormData;
//
//     fd.append("file", file);
//
//     axios.post('/upload', fd).then(
//         ({data}) => {
//             this.props.updateImage(data.imageUrl);
//         }
//     );
// }
// return (
//     <div className="uploader">
//         <input id="myInput" className="uploadInput" type="file" accept="image/*" onChange={this.submit}/>
//         <label className="uploadLabel" htmlFor="myInput">Update</label>
//     </div>
// );
// }
