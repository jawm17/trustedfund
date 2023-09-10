import React from 'react';
import { Card, Icon, Image, Button, Item } from 'semantic-ui-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <Button 
        // className={className} 
        style={{ ...style, display: 'block', position: 'absolute', top:"calc(50% - 35px)", right: '10px',zIndex:"100"}} 
        onClick={onClick}
        icon='arrow right'
      />
    );
  }
  
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <Button 
        // className={className} 
        style={{ ...style, display: 'block', position: 'absolute', top:"calc(50% - 35px)", left: '10px',zIndex:"100"}} 
        onClick={onClick}
        icon='arrow left'
      />
    );
  }


const SliderWithCards = () => {
    const settings = {
        // dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        initialSlide: 1,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 5,
    //   slidesToScroll: 3,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  
    const cards = Array(15).fill().map((_, index) => (
      <div id="sliderc" key={index} >
        <Card >
            <h1 style={{position: "absolute", zIndex:100, bottom: "20px",left:"10px"}}>title</h1>
            <p style={{position: "absolute", zIndex:100, bottom: 0,left:"10px"}}>description</p>
          <Item wrapped ui={false} style={{borderRadius: "5px", backgroundColor: "black", /* backgroundImage: "url(https://via.placeholder.com/50)"*/ background: "fill", width: "300px", height: "250px"}}/> 
          {/* <Card.Content>
            <Card.Header>Card {index + 1}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2021</span>
            </Card.Meta>
            <Card.Description>
              This is a description for card {index + 1}.
            </Card.Description>
          </Card.Content> */}
        </Card>
      </div>
    ));
  
    return (
        <>
              <h1>hi</h1>
      <Slider className="slider-container" {...settings}>
        {cards}
      </Slider>
      </>
    );
  }
  
  export default SliderWithCards;
  