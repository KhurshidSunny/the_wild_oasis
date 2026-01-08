import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiGlobeAlt } from "react-icons/hi2";
// import Button from "./Button";
// import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 1024px) {
    padding: 2.4rem 1.8rem;
    gap: 2.4rem;
  }

  @media (max-width: 768px) {
    grid-row: 2;
    border-right: none;
    border-bottom: 1px solid var(--color-grey-100);
    padding: 2rem 1.5rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }
`;

const CustomerCareLink = styled.div`
  margin-top: auto;
  padding-top: 2.4rem;
  border-top: 1px solid var(--color-grey-100);
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  width: 100%;
  padding: 1rem 1.6rem;
  background-color: var(--color-brand-500);
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s;
  
  &:hover {
    background-color: var(--color-brand-600);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  & svg {
    font-size: 1.8rem;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
      <CustomerCareLink>
        <LinkButton 
          href="https://wild-oasis-website-rho.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <HiGlobeAlt />
          Visit Customer Website
        </LinkButton>
      </CustomerCareLink>
    </StyledSidebar>
  );
}

export default Sidebar;
