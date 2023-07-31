import React from 'react';

// css
import "../../assets/css/Announcement.css";

// reactstrap components
import {  Card, Container,CardText, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import AnnouncementList from './AnnouncementList';

function AnnouncementPage() {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
      document.body.classList.add("register-page");
      return function cleanup() {
        document.body.classList.remove("register-page");
      };
    });
    return (
      <>
        <ExamplesNavbar />
        <div
          className="page-header"
          style={{
            backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                  <h3 className="title mx-auto">Announcement</h3>
                  <CardText><AnnouncementList/></CardText>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="footer register-footer text-center">
            <h6>
              © {new Date().getFullYear()}, made by{" GON"}
              <i className="fa fa-heart heart" /> 
            </h6>
          </div>
        </div>
      </>
    );
  }
  
  export default AnnouncementPage;