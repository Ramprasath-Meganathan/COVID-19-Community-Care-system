import React, { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <article className="row justify-content-center">
          <div className="text-center">
            <a
              href="http://www.facebook.com/profile.php?id="
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fa fa-facebook fa-lg"
                style={{ margin: 10, color: "#3b5998" }}
              ></i>
            </a>
            <a
              href="http://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fa fa-linkedin fa-lg"
                style={{ margin: 10, color: "#0e76a8" }}
              ></i>
            </a>
            <a
              href="http://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fa fa-twitter fa-lg"
                style={{ margin: 10, color: "#1DA1F2" }}
              ></i>
            </a>
            <a
              href="http://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fa fa-youtube fa-lg"
                style={{ margin: 10, color: " #FF0000" }}
              ></i>
            </a>
          </div>
        </article>
        <div style={{ color: "#FFF" }} className="row justify-content-center">
          <p>© Copyright 2020 CommunityCare.org</p>
        </div>
      </div>
    );
  }
}
