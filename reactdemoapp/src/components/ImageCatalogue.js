import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Redirect } from "react-router-dom";
import { Button, Col } from "react-bootstrap";
import { animateScroll as scroll } from "react-scroll";
import Image from "react-bootstrap/Image";
import "./ImageCatalogue.css";

export default class ImageCatalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  takemeTop = () => {
    scroll.scrollToTop();
  };

  takemehome = () => {
    this.setState({
      showComponent: true,
    });
  };
  render() {
    return (
      <div>
        <div id="mycarousel" className="carousel slide">
          <Carousel>
            <Carousel.Item>
              {/* The First slide is referenced in the Image references Section in Readme.md file [11]. */}
              <Image
                src="https://images.unsplash.com/photo-1588777013292-a184dc5048aa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920"
                fluid
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              {/* The First slide is referenced in the Image references Section in Readme.md file [12]. */}
              <Image
                src="https://images.unsplash.com/photo-1583947581380-3d27ed02f76f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920"
                fluid
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              {/* The First slide is referenced in the Image references Section in Readme.md file [13]. */}
              <Image
                src="https://images.unsplash.com/photo-1585328802553-72162f7ac77d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920"
                fluid
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="container">
          <div className="row row-content align-items-center">
            <div className="col-12 col-sm-4">
              <h1>Who we are</h1>
              <p>
              We are a group of Dalhousie computer science students who came 
                together to develop an application that can help people during the
                Covid-19 pandemic. We wanted to simplify community help efforts for everyone.
              </p>
            </div>
            <div className="col-12 col-sm-4">
              <h1>What we do</h1>
              <p>
                We provide a platform that connects people in need of PPE with those that have 
                the resources to give. Our goal is to offer a straight-forward way
                for everyone to contribute in their community, as well as reach out for help,
                during this difficult time.
              </p>
            </div>
            <div className="col-12 col-sm-4">
              <h1>Our protective gear</h1>
              <p>
              The Personal Protective Equipment featured on our site is 
                not produced by us in any way - it is offered by members of the community! 
                If you are in need of PPE, register as a requestor and see what is available.
                On the other hand, if you have PPE to give and want to help, register as a donor and make a post!
              </p>
            </div>
          </div>
        </div>

        <div className="jumbotron">
          <h1 style={{ textAlign: "center" }}>
            Where there is a will there is a way
          </h1>
        </div>
        <div className="container">
          <div className="row row-content align-items-center">
            <div className="col-12 col-sm">
              <h1 style={{ textAlign: "center" }}>Connect with us</h1>
              <p style={{ textAlign: "center" }}>
              If there is something you think we could add to our site,
                or you just want to tell us we are doing a good job,
                feel free to get in touch by pressing the button below!
              </p>
            </div>
          </div>
        </div>
        <div className="FooterToTop">
          <span onClick={this.takemeTop}>Back to Top</span>
        </div>
      </div>
    );
  }
}
