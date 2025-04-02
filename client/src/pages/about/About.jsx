import React from "react";
import "./about.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Our Blogging Platform</h1>
        <br></br>
        <p> Welcome to <strong>Bloggers Nook</strong>, a space where ideas come to life. 
          Our platform provides a place for writers, thinkers, and creators to 
          share their thoughts, experiences, and knowledge with the world.
</p>
      </div>

      {/* Why Choose Us Section */}
      <div className="info-block hover-effect">
        <h2>Why Choose Us?</h2>
        <br></br>
       <p>
          Express Freely – Share your unique ideas and opinions.
          <br></br>
          Write & Publish – Create blogs on diverse topics.
          <br></br>
          Community Learning – Learn from fellow bloggers.
          <br></br>
          Secure Platform – Your data is safe with us.
        </p>

      </div>

      {/* Our Mission Section */}
      <div className="info-block hover-effect">
        <h2>Our Mission</h2>
        <br></br>
        <p>To create a welcoming and engaging space for writers to share their thoughts, inspire others, and build a strong community of passionate bloggers.</p>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Users Say</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="testimonial-slider"
        >
          <SwiperSlide>
            <div className="testimonial">
              <p>"This platform has revolutionized the way I blog. A must-try for all writers!"</p>
              <h4>- Aditi Tiwari</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial">
              <p>"The best blogging community! The features and user experience are top-notch."</p>
              <h4>- Priya Sharma</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial">
              <p>"Beautifully designed and easy to navigate. I love writing here!"</p>
              <h4>- Rahul Kapoor</h4>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Get in Touch Section */}
      <div className="get-in-touch">
        <h2>Get in Touch</h2>
        <br></br>
        <p>Have questions or suggestions? We'd love to hear from you! Reach out to us anytime.</p>
        <button className="contact-button" onClick={() => navigate("/contact")}>Contact Us</button>
      </div>
    </div>
  );
};

export default About;