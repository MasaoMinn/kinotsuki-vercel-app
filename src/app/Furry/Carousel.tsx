import React from 'react';
import { Carousel, Image } from 'react-bootstrap';

const fursuitImages = [
  'furry1.jpg',
  'furry2.png',
  'furry3.jpg',
  'furry4.png',
  'furry5.png',
  'furry6.png',
  'furry7.jpg',
  'furry8.png',
  'furry9.png',
  'furry10.png',
  'furry11.png',
  'furry12.jpeg',
  'furry13.png',
  'furry14.png',
  'furry15.png',
  'furry16.jpg',
  'fursuit1.jpg',
  'fursuit2.jpg',
  'fursuit3.jpg',
  'fursuit4.jpg',
  'fursuit5.jpg',
  'fursuit6.jpg',
  'fursuit7.jpg',
  'fursuit8.jpg',
];

const FursuitCarousel: React.FC = () => {
  return (
    <Carousel>
      {fursuitImages.map((image, index) => (
        <Carousel.Item key={index}>
          <Image
            className="d-block w-100"
            src={`/fursuit/${image}`}
            alt={`Fursuit ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FursuitCarousel;