import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Homepage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);

    const carouselSlides = [
        {
            image: 'https://img.icons8.com/fluency/480/dashboard-layout.png',
            title: 'Smart Dashboard Overview',
            description: 'Get a complete view of your finances with our intuitive dashboard'
        },
        {
            image: 'https://img.icons8.com/fluency/480/money-bag.png',
            title: 'Easy Expense Tracking',
            description: 'Track your expenses and categorize them effortlessly'
        },
        {
            image: 'https://img.icons8.com/fluency/480/artificial-intelligence.png',
            title: 'AI-Powered Insights',
            description: 'Receive intelligent suggestions to improve your financial health'
        }
    ];

    const testimonials = [
        {
            text: "PennyPlan has transformed how I manage my finances. The AI insights are incredibly helpful for planning my monthly budget.",
            author: "Shravya"
        },
        {
            text: "I've been using this app for tracking my expenses, and it's made a huge difference in my saving habits. The interface is so intuitive!",
            author: "Taran"
        },
        {
            text: "The real-time tracking and instant updates make it super easy to stay on top of my spending. Best financial app I've used!",
            author: "Akshatha"
        },
        {
            text: "What I love most about PennyPlan is how it simplifies complex financial tracking into easy-to-understand visuals.",
            author: "Bhavana"
        },
        {
            text: "The dashboard is amazing! It gives me a clear picture of my finances at a glance. Exactly what I needed for better money management.",
            author: "Keerthana"
        },
        {
            text: "The AI financial advisor feature is a game-changer! It's like having a personal financial expert guiding you every step of the way.",
            author: "Ashwith"
        },
        {
            text: "I appreciate how the app helps me stay organized with my expenses. The budget tracking features are particularly useful!",
            author: "Sameeksha"
        }
    ];

    useEffect(() => {
        // Add Roboto font
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap';
        document.head.appendChild(link);
        
        // Carousel auto-play
        const interval = setInterval(() => {
            setCurrentSlide(current => (current + 1) % carouselSlides.length);
        }, 3000);

        // Testimonials carousel auto-play
        const testimonialInterval = setInterval(() => {
            setCurrentTestimonialSlide(current => 
                current + 1 >= Math.ceil(testimonials.length / 3) ? 0 : current + 1
            );
        }, 5000);
        
        return () => {
            document.head.removeChild(link);
            clearInterval(interval);
            clearInterval(testimonialInterval);
        };
    }, []);

    const features = [
        {
            title: "Simple money tracker",
            description: "It takes seconds to record daily transactions. Put them into clear and visualized categories such as Expense: Food, Shopping or Income: Salary, Gift.",
            image: "https://img.icons8.com/fluency/96/000000/money-bag.png"
        },
        {
            title: "Painless budgeting",
            description: "Set budgets that are easy to stick to, based on your spending habits. Get notified when you're close to overspending.",
            image: "https://img.icons8.com/fluency/96/000000/line-chart.png"
        },
        {
            title: "The whole picture in one place",
            description: "One report to give a clear view on your spending patterns. Understand where your money comes and goes with easy-to-read graphs.",
            image: "https://img.icons8.com/fluency/96/000000/analytics.png"
        }
    ];

    const additionalFeatures = [
        {
            title: "Multiple devices",
            description: "Safely synchronize across devices with bank standard security.",
            icon: "https://img.icons8.com/fluency/48/000000/multiple-devices.png"
        },
        {
            title: "Recurring transaction",
            description: "Get notified of recurring bills and transactions before due date.",
            icon: "https://img.icons8.com/fluency/48/000000/recurring-appointment.png"
        },
        {
            title: "AI-Powered Insights",
            description: "Get personalized financial advice based on your spending patterns.",
            icon: "https://img.icons8.com/fluency/48/000000/artificial-intelligence.png"
        },
        {
            title: "Saving plan",
            description: "Keep track on savings process to meet your financial goals.",
            icon: "https://img.icons8.com/fluency/48/000000/savings.png"
        }
    ];

    return (
        <HomepageStyled>
            <Navbar>
                <Logo onClick={() => navigate('/')}>
                    <img src="https://img.icons8.com/fluency/96/stack-of-coins.png" alt="Coins Logo" />
                    <h1>
                        <span className="penny">Penny</span>
                        <span className="plan">Plan</span>
                    </h1>
                </Logo>
                <AuthButtons>
                    {!user ? (
                        <>
                            <LoginButton onClick={() => navigate('/login')}>Sign In</LoginButton>
                            <SignupButton onClick={() => navigate('/register')}>Sign Up</SignupButton>
                        </>
                    ) : (
                        <>
                            <DashboardButton onClick={() => navigate('/dashboard')}>Dashboard</DashboardButton>
                            <LogoutButton onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                navigate('/');
                                window.location.reload();
                            }}>Sign Out</LogoutButton>
                        </>
                    )}
                </AuthButtons>
            </Navbar>

            <HeroSection>
                <HeroContent>
                    <h1>
                        <span className="green-text">Simple way</span>
                        <span className="gray-text">to manage </span>
                        <span className="finance-text">personal finances</span>
                    </h1>
                    {!user && (
                        <GetStartedButton onClick={() => navigate('/register')}>
                            Download for free
                        </GetStartedButton>
                    )}
                    <Stats>
                        <StatItem>
                            <img src="https://img.icons8.com/fluency/48/cloud-sync.png" alt="Real-time" />
                            <h3>Real-time</h3>
                            <p>Instant Updates</p>
                        </StatItem>
                        <StatItem>
                            <img src="https://img.icons8.com/fluency/48/certificate.png" alt="Trust" />
                            <h3>100%</h3>
                            <p>Secure & Private</p>
                        </StatItem>
                        <StatItem>
                            <img src="https://img.icons8.com/fluency/48/star.png" alt="Rating" />
                            <h3>Free</h3>
                            <p>No Hidden Costs</p>
                        </StatItem>
                    </Stats>
                </HeroContent>
            </HeroSection>

            <CarouselSection>
                <CarouselContainer>
                    <CarouselTrack style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {carouselSlides.map((slide, index) => (
                            <CarouselSlide key={index}>
                                <img src={slide.image} alt={slide.title} />
                                <div className="slide-content">
                                    <h2>{slide.title}</h2>
                                    <p>{slide.description}</p>
                                </div>
                            </CarouselSlide>
                        ))}
                    </CarouselTrack>
                </CarouselContainer>
                <CarouselDots>
                    {carouselSlides.map((_, index) => (
                        <Dot 
                            key={index} 
                            active={currentSlide === index}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </CarouselDots>
            </CarouselSection>

            <AboutSection>
                <h2>About PennyPlan</h2>
                <p>
                    PennyPlan is your ultimate financial companion, designed to make personal finance management simple and effective. 
                    Our platform combines intuitive expense tracking with AI-powered insights to help you make smarter financial decisions.
                    With our state-of-the-art dashboard, you can visualize your spending patterns, set budgets, and track your financial goals all in one place.
                </p>
                <p>
                    Whether you're saving for a goal, managing daily expenses, or planning for the future, PennyPlan provides all the tools 
                    you need in one secure platform. With real-time updates and comprehensive analytics, staying on top of your finances 
                    has never been easier.
                </p>
                <p>
                    Our AI-powered financial advisor analyzes your spending patterns and provides personalized recommendations to help you 
                    save more and spend wisely. From automated categorization of expenses to intelligent budget suggestions, PennyPlan 
                    makes financial management effortless and engaging.
                </p>
            </AboutSection>

            <TestimonialsSection>
                <h2>Why people use PennyPlan</h2>
                <TestimonialsContainer>
                    <TestimonialsTrack style={{ transform: `translateX(-${currentTestimonialSlide * 100}%)` }}>
                        {Array(Math.ceil(testimonials.length / 3)).fill().map((_, groupIndex) => (
                            <TestimonialGroup key={groupIndex}>
                                {testimonials.slice(groupIndex * 3, groupIndex * 3 + 3).map((testimonial, index) => (
                                    <TestimonialCard key={index}>
                                        <p>{testimonial.text}</p>
                                        <h3>{testimonial.author}</h3>
                                    </TestimonialCard>
                                ))}
                            </TestimonialGroup>
                        ))}
                    </TestimonialsTrack>
                </TestimonialsContainer>
                <TestimonialDots>
                    {Array(Math.ceil(testimonials.length / 3)).fill().map((_, index) => (
                        <Dot 
                            key={index} 
                            active={currentTestimonialSlide === index}
                            onClick={() => setCurrentTestimonialSlide(index)}
                        />
                    ))}
                </TestimonialDots>
            </TestimonialsSection>

            <ContactSection>
                <h2>Contact Us</h2>
                <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                <SocialLinks>
                    <SocialLink href="mailto:contact@pennyplan.com" target="_blank">
                        <img src="https://img.icons8.com/fluency/48/mail.png" alt="Email" />
                        <span>Email Us</span>
                    </SocialLink>
                    <SocialLink href="https://twitter.com/pennyplan" target="_blank">
                        <img src="https://img.icons8.com/fluency/48/twitter.png" alt="Twitter" />
                        <span>Follow on Twitter</span>
                    </SocialLink>
                    <SocialLink href="https://instagram.com/pennyplan" target="_blank">
                        <img src="https://img.icons8.com/fluency/48/instagram-new.png" alt="Instagram" />
                        <span>Follow on Instagram</span>
                    </SocialLink>
                </SocialLinks>
            </ContactSection>
        </HomepageStyled>
    );
};

const HomepageStyled = styled.div`
    min-height: 100vh;
    background: white;
    position: relative;
    overflow: hidden;
`;

const Navbar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.5rem 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    background: white;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.8rem;
    font-weight: 600;
    color: #2ABF4A;
    text-decoration: none;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: 40px;
        height: 40px;
        object-fit: contain;
    }
`;

const AuthButtons = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
`;

const LoginButton = styled.button`
    padding: 0.8rem 1.8rem;
    background: transparent;
    border: 2px solid #2ABF4A;
    color: #2ABF4A;
    border-radius: 30px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;

    &:hover {
        background: #2ABF4A;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(42, 191, 74, 0.2);
    }
`;

const SignupButton = styled.button`
    padding: 0.8rem 1.8rem;
    background: #2ABF4A;
    border: none;
    color: white;
    border-radius: 30px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;

    &:hover {
        background: #229F3E;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(42, 191, 74, 0.2);
    }
`;

const DashboardButton = styled.button`
    padding: 0.8rem 1.8rem;
    background: #2ABF4A;
    border: none;
    color: white;
    border-radius: 30px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;

    &:hover {
        background: #229F3E;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(42, 191, 74, 0.2);
    }
`;

const LogoutButton = styled.button`
    padding: 0.8rem 1.8rem;
    background: #666666;
    border: none;
    color: white;
    border-radius: 30px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;

    &:hover {
        background: #4d4d4d;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

const HeroSection = styled.section`
    padding: 0 10%;
    background: white;
    min-height: 90vh;
    display: flex;
    align-items: flex-start;
`;

const HeroContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding-top: 250px;
    position: relative;
    z-index: 1;

    h1 {
        font-size: 5rem;
        line-height: 1.2;
        margin-bottom: 2rem;
        font-weight: 500;
        letter-spacing: -0.02em;
        font-family: 'Roboto', sans-serif;
        color: #000000;

        .green-text {
            color: #2ABF4A;
            font-weight: 500;
            font-size: 6rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .gray-text {
            color: #666;
            font-weight: 300;
            font-size: 5rem;
        }

        .finance-text {
            color: #2ABF4A;
            font-weight: 500;
            font-size: 5rem;
        }
    }

    p {
        font-size: 1.4rem;
        color: #000000;
        margin-bottom: 3rem;
        font-weight: 400;
        line-height: 1.6;
        font-family: 'Roboto', sans-serif;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }
`;

const Stats = styled.div`
    display: flex;
    justify-content: center;
    gap: 4rem;
    margin-top: 6rem;
    position: relative;
    z-index: 1;
`;

const StatItem = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    img {
        width: 32px;
        height: 32px;
        margin-bottom: 0.5rem;
    }

    h3 {
        font-size: 2rem;
        color: #2ABF4A;
        margin-bottom: 0.3rem;
        font-weight: 600;
        font-family: 'Roboto', sans-serif;
    }

    p {
        font-size: 1rem;
        color: #666;
        font-weight: 400;
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }
`;

const CarouselSection = styled.section`
    padding: 12rem 10% 6rem 10%;
    background: white;
    position: relative;
    overflow: hidden;
`;

const CarouselContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    border-radius: 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    background: white;
`;

const CarouselTrack = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
    height: 500px;
`;

const CarouselSlide = styled.div`
    flex: 0 0 100%;
    position: relative;
    background: #f8f9fc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    
    img {
        width: 220px;
        height: 220px;
        object-fit: contain;
        margin-bottom: 2.5rem;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }
    }

    .slide-content {
        position: static;
        padding: 2rem;
        background: transparent;
        color: #222260;
        text-align: center;

        h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            font-family: 'Roboto', sans-serif;
            font-weight: 600;
            color: #2ABF4A;
        }

        p {
            font-size: 1.2rem;
            opacity: 0.9;
            font-family: 'Roboto', sans-serif;
            color: #666;
            line-height: 1.6;
        }
    }
`;

const CarouselDots = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 3rem;
`;

const Dot = styled.button`
    width: 12px;
    height: 12px;
    min-width: 12px;
    min-height: 12px;
    padding: 0;
    margin: 0 6px;
    border-radius: 50%;
    border: none;
    outline: none;
    background-color: ${props => props.active ? '#2ABF4A' : '#ddd'};
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: ${props => props.active ? '#2ABF4A' : '#999'};
        transform: scale(1.2);
    }

    &:focus {
        outline: none;
    }
`;

const AboutSection = styled.section`
    padding: 6rem 10%;
    background: white;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    h2 {
        font-size: 3rem;
        margin-bottom: 2.5rem;
        color: #000000;
        font-weight: 600;
    }

    p {
        font-size: 1.2rem;
        color: #000000;
        margin-bottom: 2rem;
        max-width: 900px;
        line-height: 1.6;
    }
`;

const TestimonialsSection = styled.section`
    padding: 8rem 10%;
    background: white;
    overflow: hidden;
    text-align: center;

    h2 {
        font-size: 3rem;
        margin-bottom: 4rem;
        color: #000000;
        font-weight: 600;
    }
`;

const TestimonialsContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
`;

const TestimonialsTrack = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
`;

const TestimonialGroup = styled.div`
    display: flex;
    gap: 2rem;
    flex: 0 0 100%;
    justify-content: center;
`;

const TestimonialCard = styled.div`
    background: #f8f9fc;
    padding: 2rem;
    border-radius: 20px;
    width: 300px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    p {
        font-size: 1.1rem;
        color: #000000;
        margin-bottom: 1.5rem;
        line-height: 1.6;
        flex-grow: 1;
    }

    h3 {
        font-size: 1.2rem;
        color: #2ABF4A;
        margin: 0;
        font-weight: 500;
    }
`;

const TestimonialDots = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 3rem;
`;

const ContactSection = styled.section`
    padding: 0 10%;
    background: white;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    h2 {
        font-size: 3rem;
        margin-bottom: 2rem;
        color: #000000;
        font-weight: 600;
    }

    p {
        font-size: 1.2rem;
        color: #000000;
        margin-bottom: 2rem;
    }
`;

const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const SocialLink = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #000000;

    img {
        width: 48px;
        height: 48px;
        object-fit: contain;
        margin-bottom: 0.5rem;
    }

    span {
        font-size: 1.2rem;
        font-weight: 400;
    }
`;

const GetStartedButton = styled.button`
    padding: 1rem 2.5rem;
    background: #2ABF4A;
    border: none;
    color: white;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.1rem;
    box-shadow: 0 4px 15px rgba(42, 191, 74, 0.3);

    &:hover {
        background: #229F3E;
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(42, 191, 74, 0.4);
    }
`;

export default Homepage;