import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Swiper from "swiper";
import AOS from "aos";
import "./index.css";
import "aos/dist/aos.css";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import HeroImage from "../../assets/hero.svg";
import AboutImage from "../../assets/about.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Sticky Header on Scroll
     */
    const selectHeader = document.querySelector("#header");
    if (selectHeader) {
      let headerOffset = selectHeader.offsetTop;
      let nextElement = selectHeader.nextElementSibling;

      const headerFixed = () => {
        if (headerOffset - window.scrollY <= 0) {
          selectHeader.classList.add("sticked");
          if (nextElement) nextElement.classList.add("sticked-header-offset");
        } else {
          selectHeader.classList.remove("sticked");
          if (nextElement)
            nextElement.classList.remove("sticked-header-offset");
        }
      };
      window.addEventListener("load", headerFixed);
      document.addEventListener("scroll", headerFixed);
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = document.querySelectorAll("#navbar a");

    function navbarlinksActive() {
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;

        let section = document.querySelector(navbarlink.hash);
        if (!section) return;

        let position = window.scrollY + 200;

        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          navbarlink.classList.add("active");
        } else {
          navbarlink.classList.remove("active");
        }
      });
    }
    window.addEventListener("load", navbarlinksActive);
    document.addEventListener("scroll", navbarlinksActive);

    /**
     * Mobile nav toggle
     */
    const mobileNavShow = document.querySelector(".mobile-nav-show");
    const mobileNavHide = document.querySelector(".mobile-nav-hide");

    document.querySelectorAll(".mobile-nav-toggle").forEach((el) => {
      el.addEventListener("click", function (event) {
        event.preventDefault();
        mobileNavToogle();
      });
    });

    function mobileNavToogle() {
      document.querySelector("body").classList.toggle("mobile-nav-active");
      mobileNavShow.classList.toggle("d-none");
      mobileNavHide.classList.toggle("d-none");
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll("#navbar a").forEach((navbarlink) => {
      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      navbarlink.addEventListener("click", () => {
        if (document.querySelector(".mobile-nav-active")) {
          mobileNavToogle();
        }
      });
    });

    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector(".scroll-top");
    if (scrollTop) {
      const togglescrollTop = function () {
        window.scrollY > 100
          ? scrollTop.classList.add("active")
          : scrollTop.classList.remove("active");
      };

      window.addEventListener("load", togglescrollTop);
      document.addEventListener("scroll", togglescrollTop);

      scrollTop.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }

    /**
     * Init swiper slider with 3 slides at once in desktop view
     */
    new Swiper(".slides-3", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });

    /**
     * Animation on scroll function and init
     */
    function aos_init() {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }

    window.addEventListener("load", () => {
      aos_init();
    });
  }, []);

  return (
    <div>
      {/* ======= Header ======= */}
      <header id="header" className="header d-flex align-items-center">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            NASRP
          </Typography>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a href={"#hero"}>Home</a>
              </li>
              <li>
                <a href={"#about"}>About</a>
              </li>
              <li>
                <a href={"#services"}>Services</a>
              </li>
              <li>
                <a href={"#contact"}>Contact</a>
              </li>
            </ul>
          </nav>
          {/* .navbar */}
          <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
        </div>
      </header>
      {/* End Header */}
      {/* ======= Hero Section ======= */}
      <section id="hero" className="hero">
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
              <h2>
                Nisar Ahmed Siddiqui <span>Rozgaar</span> Programme
              </h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <Typography
                  className="btn-get-started"
                  onClick={() => navigate("/login")}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Get Started
                </Typography>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <img
                src={HeroImage}
                className="img-fluid"
                alt=""
                data-aos="zoom-out"
                data-aos-delay={100}
              />
            </div>
          </div>
        </div>
      </section>
      {/* End Hero Section */}

      <main id="main">
        {/* ======= About Us Section ======= */}
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>About Us</h2>
            </div>
            <div className="row gy-4">
              <div className="col-lg-6 content">
                <p>
                  NASRP is an online marketplace and a service-providing
                  platform that aims to provide freelance services,
                  job/internship-hunting opportunities as well as fundraising
                  services for start-ups and companies. NASRP is an initiative
                  taken by the students of Sukkur IBA University to continue the
                  legacy of the founding father of the Sukkur IBA University,
                  the Late Nisar Ahmed Siddiqui, and follow his vision of
                  “service to the community”.
                </p>
              </div>
              <div className="col-lg-6 about-img">
                <img src={AboutImage} alt="Nisar Ahmed Siddiqui" />
              </div>
            </div>
          </div>
        </section>
        {/* End About Us Section */}

        {/* ======= Our Services Section ======= */}
        <section id="services" className="services sections-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Our Services</h2>
            </div>
            <div className="row gy-4" data-aos="fade-up" data-aos-delay={100}>
              <div className="col-lg-4 col-md-6">
                <div className="service-item  position-relative">
                  <div className="icon">
                    <i className="bi bi-terminal" />
                  </div>
                  <h3>Programming & Tech</h3>
                  <p>
                    Expert programming and tech services to help you build and
                    maintain your software, website or mobile app.
                  </p>
                  {/* <a href={""} className="readmore stretched-link">
                    Read more <i className="bi bi-arrow-right" />
                  </a> */}
                </div>
              </div>
              {/* End Service Item */}
              <div className="col-lg-4 col-md-6">
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-bounding-box-circles" />
                  </div>
                  <h3>Graphics & Design</h3>
                  <p>
                    Skilled designers can create stunning visuals, logos, and
                    graphics for your brand, website or marketing materials.
                  </p>
                  {/* <a href={""} className="readmore stretched-link">
                    Read more <i className="bi bi-arrow-right" />
                  </a> */}
                </div>
              </div>
              {/* End Service Item */}
              <div className="col-lg-4 col-md-6">
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-broadcast" />
                  </div>
                  <h3>Digital Marketing</h3>
                  <p>
                    Comprehensive digital marketing services to help you build
                    and grow your online presence and reach your target
                    audience.
                  </p>
                  {/* <a href={""} className="readmore stretched-link">
                    Read more <i className="bi bi-arrow-right" />
                  </a> */}
                </div>
              </div>
              {/* End Service Item */}
              <div className="col-lg-4 col-md-6">
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-translate" />
                  </div>
                  <h3>Writing & Translation</h3>
                  <p>
                    Professional writers and translators can provide
                    high-quality content for your website, blog, or marketing
                    materials in a variety of languages.
                  </p>
                  {/* <a href={""} className="readmore stretched-link">
                    Read more <i className="bi bi-arrow-right" />
                  </a> */}
                </div>
              </div>
              {/* End Service Item */}
              <div className="col-lg-4 col-md-6">
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-film" />
                  </div>
                  <h3>Audio & Video</h3>
                  <p>
                    Professional audio and video production services to help you
                    create engaging and compelling multimedia content.
                  </p>
                  {/* <a href={""} className="readmore stretched-link">
                    Read more <i className="bi bi-arrow-right" />
                  </a> */}
                </div>
              </div>
              {/* End Service Item */}
              <div className="col-lg-4 col-md-6">
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-graph-up-arrow" />
                  </div>
                  <h3>Lifestyle & Other</h3>
                  <p>
                    A wide range of lifestyle and other services such as virtual
                    assistance, personal shopping, and event planning to help
                    you manage your busy life.
                  </p>
                  {/* <a href={""} className="readmore stretched-link">
                    Read more <i className="bi bi-arrow-right" />
                  </a> */}
                </div>
              </div>
              {/* End Service Item */}
            </div>
          </div>
        </section>
        {/* End Our Services Section */}

        {/* ======= Testimonials Section ======= */}
        <section id="testimonials" className="testimonials">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Testimonials</h2>
            </div>
            <div
              className="slides-3 swiper"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <div className="d-flex align-items-center">
                        <img
                          src={require("../../assets/testimonials/testimonials-1.jpg")}
                          className="testimonial-img flex-shrink-0"
                          alt=""
                        />
                        <div>
                          <h3>Saul Goodman</h3>
                          <h4>Ceo &amp; Founder</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        I was blown away by the quality of work provided by the
                        freelancer I hired on this platform. They delivered on
                        time and exceeded my expectations. I will definitely be
                        using this service again!
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                    </div>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <div className="d-flex align-items-center">
                        <img
                          src={require("../../assets/testimonials/testimonials-2.jpg")}
                          className="testimonial-img flex-shrink-0"
                          alt=""
                        />
                        <div>
                          <h3>Sara Wilsson</h3>
                          <h4>Designer</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        As a freelancer, I appreciate how easy it is to find
                        work on this platform. The variety of services offered
                        is impressive, and I've been able to connect with
                        clients from all over the world. I have already
                        recommended this site to other freelancers.
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                    </div>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <div className="d-flex align-items-center">
                        <img
                          src={require("../../assets/testimonials/testimonials-3.jpg")}
                          className="testimonial-img flex-shrink-0"
                          alt=""
                        />
                        <div>
                          <h3>Jena Karlis</h3>
                          <h4>Store Owner</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        I needed some help with my digital marketing strategy,
                        and the freelancer I found on this platform was a
                        game-changer. They were knowledgeable and skilled, and
                        they helped me take my business to the next level. I
                        will definitely be using this service again!
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                    </div>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <div className="d-flex align-items-center">
                        <img
                          src={require("../../assets/testimonials/testimonials-4.jpg")}
                          className="testimonial-img flex-shrink-0"
                          alt=""
                        />
                        <div>
                          <h3>Matt Brandon</h3>
                          <h4>Freelancer</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        I am a freelancer who has been using this platform to
                        find work for the past year, and I have had nothing but
                        positive experiences. The clients are professional and
                        easy to work with, and the platform is user-friendly and
                        reliable.
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                    </div>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <div className="d-flex align-items-center">
                        <img
                          src={require("../../assets/testimonials/testimonials-5.jpg")}
                          className="testimonial-img flex-shrink-0"
                          alt=""
                        />
                        <div>
                          <h3>John Larson</h3>
                          <h4>Entrepreneur</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        I needed some graphic design work done for my business,
                        and I was hesitant to hire a freelancer. But I'm so glad
                        I did! The designer I found on this platform was amazing
                        - they understood my vision and brought it to life. I
                        highly recommend this service.
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                    </div>
                  </div>
                </div>
                {/* End testimonial item */}
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </section>
        {/* End Testimonials Section */}
        {/* ======= Frequently Asked Questions Section ======= */}
        <section id="faq" className="faq">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4">
              <div className="col-lg-4">
                <div className="content px-xl-5">
                  <h3>
                    Frequently Asked <strong>Questions</strong>
                  </h3>
                  <p>Here are some of the most asked questions from us.</p>
                </div>
              </div>
              <div className="col-lg-8">
                <div
                  className="accordion accordion-flush"
                  id="faqlist"
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  <div className="accordion-item">
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-content-1"
                      >
                        <span className="num">1.</span>
                        How do I find the right freelancer for my project?
                      </button>
                    </h3>
                    <div
                      id="faq-content-1"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqlist"
                    >
                      <div className="accordion-body">
                        We offer a search function that allows clients to filter
                        freelancers based on their skills, experience, and
                        ratings. Clients can also review freelancers' portfolios
                        and past work to find the best match for their project.
                      </div>
                    </div>
                  </div>
                  {/* # Faq item*/}
                  <div className="accordion-item">
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-content-2"
                      >
                        <span className="num">2.</span>
                        How do you ensure the quality of work provided by
                        freelancers?
                      </button>
                    </h3>
                    <div
                      id="faq-content-2"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqlist"
                    >
                      <div className="accordion-body">
                        We have a rating and review system that allows clients
                        to rate freelancers based on the quality of their work
                        and their professionalism. We also offer dispute
                        resolution services in case of any issues.
                      </div>
                    </div>
                  </div>
                  {/* # Faq item*/}
                  <div className="accordion-item">
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-content-3"
                      >
                        <span className="num">3.</span>
                        What fees do you charge for using your freelancing
                        website?
                      </button>
                    </h3>
                    <div
                      id="faq-content-3"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqlist"
                    >
                      <div className="accordion-body">
                        We charge a small fee for each project completed through
                        our platform. The fee is a percentage of the total
                        project cost and is used to cover the costs of
                        maintaining the website and providing customer support.
                      </div>
                    </div>
                  </div>
                  {/* # Faq item*/}
                  <div className="accordion-item">
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-content-4"
                      >
                        <span className="num">4.</span>
                        How does payment work on your freelancing website?
                      </button>
                    </h3>
                    <div
                      id="faq-content-4"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqlist"
                    >
                      <div className="accordion-body">
                        We use a secure payment system that allows clients to
                        fund a project upfront, and freelancers are paid once
                        the work is completed and approved by the client. Our
                        payment system offers protection for both clients and
                        freelancers.
                      </div>
                    </div>
                  </div>
                  {/* # Faq item*/}
                  <div className="accordion-item">
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-content-5"
                      >
                        <span className="num">5.</span>
                        Can I communicate with the freelancer I hire directly?
                      </button>
                    </h3>
                    <div
                      id="faq-content-5"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqlist"
                    >
                      <div className="accordion-body">
                        Yes, our platform allows for direct communication
                        between clients and freelancers. We encourage open
                        communication throughout the project to ensure that
                        everyone is on the same page.
                      </div>
                    </div>
                  </div>
                  {/* # Faq item*/}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Frequently Asked Questions Section */}

        {/* ======= Contact Section ======= */}
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Contact</h2>
            </div>
            <div className="row gx-lg-0 gy-4">
              <div className="col-lg-4">
                <div className="info-container d-flex flex-column align-items-center justify-content-center">
                  <div className="info-item d-flex">
                    <i className="bi bi-geo-alt flex-shrink-0" />
                    <div>
                      <h4>Location:</h4>
                      <p>
                        Nisar Ahmed Siddiqui Rd, Delhi Muslim Housing Society,
                        Sukkur, Sindh
                      </p>
                    </div>
                  </div>
                  {/* End Info Item */}
                  <div className="info-item d-flex">
                    <i className="bi bi-envelope flex-shrink-0" />
                    <div>
                      <h4>Email:</h4>
                      <p>info@example.com</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                  <div className="info-item d-flex">
                    <i className="bi bi-phone flex-shrink-0" />
                    <div>
                      <h4>Call:</h4>
                      <p>+0 0000 00000 00</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                  <div className="info-item d-flex">
                    <i className="bi bi-clock flex-shrink-0" />
                    <div>
                      <h4>Open Hours:</h4>
                      <p>24/7</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                </div>
              </div>
              <div className="col-lg-8">
                <form action="" method="post" className="email-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={7}
                      placeholder="Message"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message" />
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
              {/* End Contact Form */}
            </div>
          </div>
        </section>
        {/* End Contact Section */}
      </main>
      {/* End #main */}

      {/* ======= Footer ======= */}
      <footer id="footer" className="footer">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-info">
              <a href={"/"} className="logo d-flex align-items-center">
                <span>NASRP</span>
              </a>
              <p>
                NASRP is an online marketplace and a service-providing platform
                that aims to provide freelance services, job/internship-hunting
                opportunities as well as fundraising services for start-ups and
                companies.
              </p>
              <div className="social-links d-flex mt-4">
                <a href={"/#"} className="twitter">
                  <i className="bi bi-twitter" />
                </a>
                <a href={"/#"} className="facebook">
                  <i className="bi bi-facebook" />
                </a>
                <a href={"/#"} className="instagram">
                  <i className="bi bi-instagram" />
                </a>
                <a href={"/#"} className="linkedin">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href={"#hero"}>Home</a>
                </li>
                <li>
                  <a href={"#about"}>About us</a>
                </li>
                <li>
                  <a href={"#services"}>Services</a>
                </li>
                <li>
                  <a href={"/#"}>Terms of service</a>
                </li>
                <li>
                  <a href={"/#"}>Privacy policy</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <a href={"#services"}>Programming & Tech</a>
                </li>
                <li>
                  <a href={"#services"}>Graphics & Design</a>
                </li>
                <li>
                  <a href={"#services"}>Digital Marketing</a>
                </li>
                <li>
                  <a href={"#services"}>Writing & Translation</a>
                </li>
                <li>
                  <a href={"#services"}>Audio & Video</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Contact Us</h4>
              <p>
                Nisar Ahmed Siddiqui Rd, Delhi Muslim Housing Society, <br />{" "}
                Sukkur, Sindh
                <br />
                Pakistan <br />
                <br />
                <strong>Phone:</strong> +0 0000 00000 00
                <br />
                <strong>Email:</strong> info@example.com
                <br />
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* End Footer */}
      <a
        href={"/#"}
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </div>
  );
};

export default HomePage;
