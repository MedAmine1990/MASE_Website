import React, {useState} from 'react'
import ReactDOM from "react-dom";
import { Container, Header, Message, Segment, Button } from "semantic-ui-react";
import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import { Divider } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Dot } from "pure-react-carousel";


import "pure-react-carousel/dist/react-carousel.es.css";




export default function InfoSight() {

    const CustomDotGroup = ({ slides, size }) => (
        <Container textAlign="center">
          <Button.Group size={size}>
            {[...Array(slides).keys()].map(slide => (
              <Button as={Dot} key={slide} icon="circle" slide={slide} />
            ))}
          </Button.Group>
        </Container>
      );
      
      CustomDotGroup.defaultProps = {
        size: "mini"
      };
      
      CustomDotGroup.propTypes = {
        slides: PropTypes.number.isRequired,
        size: PropTypes.string
      };


  return (
    <div className="InfoSight" style={{backgroundColor:"#5544D4"}}>
        <Segment attached="top">
        <Header as="h2" content="Image carousel" />
        <p>
          This prototype features how to create a carousel with images, take a
          look into <code>examples/ImageCarousel</code> to get more details.
        </p>
      </Segment>
      <Segment attached="bottom">
      <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={3}
  >
    <Slider>
      <Slide tag="a" index={0}>
        <Image src="https://cdn.wallpapersafari.com/55/39/BpvgtQ.jpg" />
      </Slide>
      <Slide tag="a" index={1}>
        <Image src="https://lorempixel.com/800/800/cats/1" />
      </Slide>
      <Slide tag="a" index={2}>
        <Image src="https://lorempixel.com/800/800/cats/2" />
      </Slide>
    </Slider>

    <Divider />
    <CustomDotGroup slides={3} />

  </CarouselProvider>

      </Segment>
    </div>
  )
  }