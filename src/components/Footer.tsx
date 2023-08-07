import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinkContainer>
          <FooterLinkTitle>Ukeydock</FooterLinkTitle>
          <FooterLinkContent>
            <FooterLink href="https://github.com/Ukeydock">
              유키독 소개(github)
            </FooterLink>
            <FooterLink href="https://drive.google.com/file/d/13Co4AR8p3FbFGNuQ_9XTtjKSjBxUI5ic/view">
              이력서
            </FooterLink>
            <FooterLink href="https://github.com/Ukeydock/ReactJS">
              유키독 github(Frontend)
            </FooterLink>
            <FooterLink href="https://github.com/Ukeydock/NestJS">
              유키독 github(Backend)
            </FooterLink>
          </FooterLinkContent>
          <FooterDescContainer>
            <FooterDescRights>조권영 포트폴리오</FooterDescRights>
          </FooterDescContainer>
        </FooterLinkContainer>
      </FooterContent>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  border-top: 1px solid rgb(25, 25, 25);
  /* width: 100%; */
  position: relative;
  z-index: 1;

  @media (max-width: 769px) {
    padding: 20px 20px;
    padding-bottom: 30px;
  }
`;

const FooterContent = styled.div``;

const FooterLinkContainer = styled.div`
  width: 500px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FooterLinkTitle = styled.h1`
  color: gray;
  font-size: 17px;
`;

const FooterLinkContent = styled.div`
  display: flex;
  justify-content: space-bewteen;
  flex-wrap: wrap;
  margin-top: 35px;

  @media (max-width: 768px) {
    margin-top: 26px;
  }
`;

const FooterLink = styled.a`
  color: gray;
  font-size: 14px;
  width: 110px;
  margin-bottom: 21px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const FooterDescContainer = styled.div`
  margin-top: 30px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const FooterDescRights = styled.h2`
  color: white;
  font-size: 14px;
  text-align: center;
`;

export {};
