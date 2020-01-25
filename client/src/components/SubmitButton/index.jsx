import React, { Component } from "react";
import axios from "axios";
// This needs to be a smart component so that it can store the file in state
export default class UploadBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // This file starts at null because no files are selected at default
      selectedFile: null
    };
    this.uploadFileHandler = this.uploadFileHandler.bind(this);
    this.submitPhotoForUpload = this.submitPhotoForUpload.bind(this);
  }
  // This will set the file to the state
  uploadFileHandler(event) {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      editMenu: ""
    });
  }
  // This will send the file to the server
  submitPhotoForUpload(event) {
    // This assigns the file to a class object named FormData which is required to send the file
    // !!! WARNING !!! //
    // You cannot console log form data on server or on client, because it is a class object
    let thisFilesName = this.state.selectedFile.name
      .toLowerCase()
      .split(".")[0];
    const data = new FormData();
    data.append(thisFilesName, this.state.selectedFile);

    // This call is sending the name of the file before it sends the file
    axios
      .post("/cms/GD8PQX3UV18999AARONWITHANEY/filename", {
        body: this.state.selectedFile.name
      })
      .then(returnedData => {
        console.log(returnedData);
        // This call sends the file
        axios
          .post("/cms/GD8PQX3UV18999AARONWITHANEY/upload", data, {
            // receive two    parameter endpoint url ,form data
          })
          // This returns the result
          .then(res => {
            // then print response status
            console.log(res.statusText);
            console.log(res.data);
            console.log("File uploaded");
          });
      });
  }
  render() {
    return (
      <div className="upload_img_root">
        <input type="file" name="file" onChange={this.uploadFileHandler} />
        <button
          type="button"
          className="button"
          onClick={this.submitPhotoForUpload}
        >
          <ion-icon name="ios-save"></ion-icon>
        </button>
      </div>
    );
  }
}
// Notes: This component is positioned absolute top right and requires ion icons.
// Notes: The server will name the photo after it's original upload name. And is not friendly to "." in the names.
