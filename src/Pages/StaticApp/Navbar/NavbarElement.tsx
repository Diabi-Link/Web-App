import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

type Props = {
  scrollNav: boolean;
};

export const Nav = styled.nav<Props>`
  background: ${(p) => (p.scrollNav ? '#fff' : 'transparent')};
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

// export const NavLogo = styled(LinkR)`
//     color: #fff;
//     justify-self: flex-start;
//     cursor: pointer;
//     font-size: 1.5rem;
//     display: flex;
//     align-items: center;
//     margin-left: 24px;
//     font-weight: bold;
//     text-decoration: none;
// `

export const MobileIcon = styled.div<Props>`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    posisiton: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: ${(p) => (p.scrollNav ? '#81C6D6' : '#fff')};
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinks = styled(LinkS)<Props>`
  color: ${(p) => (p.scrollNav ? '#81C6D6' : '#fff')};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #81c6d6;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 760px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)<Props>`
  border-radius: 50px;
  background: ${(p) => (p.scrollNav ? '#81C6D6' : '#fff')};
  white-space: nowrap;
  padding: 10px 22px;
  color: ${(p) => (p.scrollNav ? '#fff' : '#81C6D6')};
  font-size: 16px;
  outline: none;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2 ease-in-out;
    background: ${(p) => (p.scrollNav ? '#fff' : '#81C6D6')};
    color: ${(p) => (p.scrollNav ? '#81C6D6' : '#fff')};
  }
`;

export const Img = styled.img`
  max-width: 15%;
  justify-self: flex-start;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0 0px 0;
  padding-right: 0;
`;
