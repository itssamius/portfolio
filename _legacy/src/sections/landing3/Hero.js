import React, { useContext } from "react";
import styled from "styled-components";
import { Container, Row, Col, Image } from "react-bootstrap";

import GlobalContext from "../../context/GlobalContext";
import { Title, ButtonIcon, Section, Box } from "../../components/Core";
import bgHeroPattern from "../../assets/image/webp/hero-pattern.webp";
import imgL from "../../assets/image/jpg/hero-image.jpeg";

const SectionStyled = styled(Section)`
  &::before {
    position: absolute;
    top: 0;
    content: "";
    width: 100%;
    height: 120%;
    background: url(${bgHeroPattern}) top center no-repeat;
    background-size: cover;
    z-index: -1;
  }
`;

const Hero = () => {
  const gContext = useContext(GlobalContext);

  return (
    <>
      {/* <!-- Hero Area --> */}
      <SectionStyled hero className="position-relative">
        <Container>
          <Box pb="40px">
            <Image
                src={imgL}
                alt="Samuel Abera Logo"
                style={{
                  borderRadius: "50rem !important",
                  maxWidth: "20rem",
                }}
            />
          </Box>
          <Row className="align-items-lg-end">
            <Col lg="8" sm="12" className="mb-5 mb-lg-0">
              <Box>
                <Title variant="hero">
                  Full Stack Developer <br />
                </Title>
              </Box>
            </Col>
            <Col lg="4" sm="12">
              <Box pl="1.25rem">
                <ButtonIcon
                  onClick={(e) => {
                    e.preventDefault();
                    gContext.toggleContact();
                  }}
                >
                  Let's Talk Now
                </ButtonIcon>
              </Box>
            </Col>
          </Row>
        </Container>
      </SectionStyled>
    </>
  );
};

export default Hero;
