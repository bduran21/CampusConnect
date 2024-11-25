import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/HomePage.scss";
import HeroImage from "../assets/HeroImage.jpg";
import WhatWeDoImage from "../assets/WhatWeDoImage.jpg";
import FeaturesImage from "../assets/FeaturesImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      // Calculate the section's top position relative to the document
      const topPosition = featuresSection.offsetTop;

      // Adjust for offset (e.g., raising the scroll target by 50px or 3rem)
      const offset = -50; // Negative value raises the point
      window.scrollTo({
        top: topPosition + offset,
        behavior: "smooth",
      });
    }
  };
  
  return (
    <div style={{ "--hero-image": `url(${HeroImage})` }}>
      <NavBar />
      {/* CTA Bar */}
      <div className="cta-bar">
        <SignedIn>
          <button className="cta-button" onClick={() => navigate("/calendar")}>
            <span className="cta-text">
              Create Your Calendar Today
              <FontAwesomeIcon
                icon={faChevronRight}
                className="cta-icon"
                style={{ marginLeft: "10px" }}
              />
            </span>
          </button>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="cta-button">
              <span className="cta-text">
                Create Your Calendar Today
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="cta-icon"
                  style={{ marginLeft: "10px" }}
                />
              </span>
            </button>
          </SignInButton>
        </SignedOut>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1>Welcome to Campus Connect</h1>
            <p>
              Manage your events, collaborate with friends, and take control of
              your schedule with Campus Connect.
            </p>
          </div>
          <div className="hero-right"></div>
        </div>
      </section>


      {/* What We Do Section */}
      <section className="what-we-do">
        <div className="what-we-do-content">
          <div className="image-container">
            <img src={WhatWeDoImage} alt="What We Do" />
          </div>
          <div className="text-container">
            <h2>What We Do</h2>
            <p>
              At Campus Connect, we empower you to stay organized and
              collaborative. Whether you're managing events, sharing schedules,
              or connecting with friends, we've got the tools to make it
              seamless.
            </p>
            <p>
              With our easy-to-use platform, you can streamline your planning
              and focus on what truly matters—your success and connections.
            </p>
            <button
              className="learn-more-button"
              onClick={handleLearnMoreClick}
            >
              Learn More <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-content">
          {/* Left Column */}
          <div className="features-left">
            <div className="feature">
              <h3>Extend Collaboration</h3>
              <p>
                Work seamlessly with teams and friends to organize events and
                schedules efficiently.
              </p>
            </div>
            <div className="feature">
              <h3>Stay Organized</h3>
              <p>
                Our tools help you keep track of everything, from meetings to
                deadlines, in one place.
              </p>
            </div>
            <div className="feature">
              <h3>Improve Productivity</h3>
              <p>
                Focus on what matters by automating routine tasks and managing
                your time effectively.
              </p>
            </div>
            <div className="feature">
              <h3>Connect Seamlessly</h3>
              <p>
                Build stronger connections with shared calendars and real-time
                updates.
              </p>
            </div>
          </div>
          {/* Right Column */}
          <div className="features-right">
            <img src={FeaturesImage} alt="Features" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;