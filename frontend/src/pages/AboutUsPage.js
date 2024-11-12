import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/AboutUsPage.scss";

// Import images
import AlexImage from "../assets/AlexImage.JPG";
import BraulioImage from "../assets/BraulioImage.jpeg";
import SteveImage from "../assets/StevenImage.jpeg";
import ChaveImage from "../assets/ChaveImage.jpeg";

function AboutUsPage() {
    return (
        <div className="about-us-page">
            <NavBar />
            <main className="content">
                <h1>About Us</h1>
                <section className="mission-section">
                    <h2>Our Mission</h2>
                    <p>
                        At Campus Connect, our mission is to bring students together, foster friendships,
                        and create a strong sense of community. Whether you're looking to connect with
                        classmates, join study groups, or find campus events, we're here to make it happen.
                    </p>
                </section>
                <section className="team-section">
                    <h2>Meet the Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <img src={AlexImage} alt="Alex Bernatowicz" />
                            <h3>Alex Bernatowicz</h3>
                            <p>Frontend Engineer</p>
                        </div>
                        <div className="team-member">
                            <img src={ChaveImage} alt="Isabella Linarez" />
                            <h3>Isabella Linarez</h3>
                            <p>Scrum Master</p>
                        </div>
                        <div className="team-member">
                            <img src={SteveImage} alt="Steven Reveles" />
                            <h3>Steven Reveles</h3>
                            <p>Community Manager</p>
                        </div>
                        <div className="team-member">
                            <img src={BraulioImage} alt="Braulio Duran" />
                            <h3>Braulio Duran</h3>
                            <p>Backend Engineer</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default AboutUsPage;