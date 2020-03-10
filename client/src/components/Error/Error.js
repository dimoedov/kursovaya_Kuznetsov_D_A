import React, {Component} from "react";
import err from './404 _ Not Found.html';
let html = require('./404 _ Not Found.html');
let template = { __html: html };
class Error extends Component {
    render() {
        return (
            // <div dangerouslySetInnerHTML={template} />
            <iframe src={html }></iframe>
        );
    }
}

export default Error;