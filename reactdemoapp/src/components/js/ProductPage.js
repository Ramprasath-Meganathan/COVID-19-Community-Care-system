/**
 * The author of the file is Yaswanth Chiruvella - B00849892.
 */
import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import eye from "../../images/eye.jpg";
import gloves from "../../images/gloves.jpg";
import masks from "../../images/masks.jpg";
import fshield from "../../images/fshield.jpg";
import shield from "../../images/shield.jpg";
import wash from "../../images/wash.jpg";
import "../css/ProductPage.css";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      results: [],
      response: "",
      id: "",
      trigger: "",
      cards: [
        {
          id: "1",
          img: eye,
          title: "Eye Protective Gear",
          text: "Used for Eye Protection.",
        },
        {
          id: "2",
          img: gloves,
          title: "Gloves",
          text: "Used for Hand Protection.",
        },
        {
          id: "3",
          img: masks,
          title: "Masks",
          text: "Used for Face.",
        },
        {
          id: "4",
          img: fshield,
          title: "Face Shields",
          text: "Used as Face Shield",
        },
        {
          id: "5",
          img: shield,
          title: "Shields",
          text: "Used a Full Shield.",
        },
        {
          id: "6",
          img: wash,
          title: "Hand Wash",
          text: "Used as a Hand Wash.",
        },
      ],
    };
    this.cards = [
      {
        id: "1",
        img: eye,
        title: "Eye Protective Gear",
        text: "Used for Eye Protection.",
      },
    ];
  }

  // This will change the images accordingly based on the typed text.
  onChange = (e) => {
    const searchtext = e.target.value;
    let card = [];
    for (let i = 0; i < this.state.cards.length; i++) {
      if (this.state.cards[i].title.toLowerCase().indexOf(searchtext) > -1) {
        card.push(this.state.cards[i]);
        console.log("trigger");
      }
    }
    console.log(card);
    this.setState({
      search: searchtext,
      results: card,
    });
  };

  // The item target value triggered through event.
  displayContent = (event) => {
    let item = event.target.value;
    console.log(item);
    this.setState({ response: item });
  };

  // This will mounted intially when loading the page.
  componentDidMount() {
    let card = [];
    for (let i = 0; i < this.state.cards.length; i++) {
      if (
        this.state.cards[i].title.toLowerCase().indexOf(this.state.search) > -1
      ) {
        card.push(this.state.cards[i]);
      }
    }
    this.setState({
      results: card,
    });
  }

  render() {
    const res = this.state.response;
    console.log(res);
    return (
      <div>
        {this.state.response ? (
          <Redirect
            to={{
              pathname: "/DonorDetails",
              state: { data: this.state.response },
            }}
          />
        ) : (
          <React.Fragment>
            <div className="container">
              <div style={{ paddingTop: "15px" }}>
                <div className="input-group md-form form-sm form-1 pl-0">
                  <div className="input-group-prepend"></div>
                  <input
                    className="form-control my-0 py-1"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    value={this.state.search}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row products align-items-center">
                {this.state.results.map((element) => (
                  <div
                    className="col-12 col-sm-4"
                    key={element.id}
                    onClick={this.displayContent}
                  >
                    <Card>
                      <Card.Img variant="top" src={element.img} />
                      <Card.Body>
                        <Card.Title>{element.title}</Card.Title>
                        <Card.Text>{element.text}</Card.Text>
                        <Button
                          className="btn btn-primary my-2 my-sm-0"
                          type="submit"
                          value={element.title}
                        >
                          {" "}
                          Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
