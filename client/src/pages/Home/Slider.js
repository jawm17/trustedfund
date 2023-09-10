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
        style={{ ...style,  position: 'absolute', bottom: "-80px" , right: 'calc(50% - 100px)',zIndex:"100"}} 
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
        style={{ ...style,  position: 'absolute',bottom: "-80px", left: 'calc(50% - 100px)',zIndex:"100"}} 
        onClick={onClick}
        icon='arrow left'
      />
    );
  }


const SliderWithCards = (props) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4.5,
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
  
    const cards = props?.projects.map((project, index) => (
      <div key={index} >
        <Card id="cardInfoSlider" href={'/project/' + project._id} >
            <h1 style={{position: "absolute", zIndex:100, bottom: "20px",left:"10px"}}>{project.title}</h1>
            <p style={{position: "absolute", zIndex:100, bottom: 0,left:"10px"}}>{project.description.slice(0,22) + "..."}</p>
          <Item wrapped id="slideItem" ui={false} style={{backgroundImage: "url(" + project.media + ")"}}/> 
        </Card>
      </div>
    ));
  
    return (
        <>
              <h1 id="sliderTile">Popular Projects</h1>
        <div id="helpers1"></div>
      <Slider id="slider" {...settings}>
        {cards}
      </Slider>
        <div id="helpers2"></div>
      </>
    );
  }
  
  export default SliderWithCards;
  