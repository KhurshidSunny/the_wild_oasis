import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { useUser } from "../features/authentication/useUser";
import DemoModeIndicator from "./DemoModeIndicator";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    padding: 1.2rem 3rem;
    gap: 1.6rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    gap: 1.2rem;
    grid-column: 1 / -1;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
    gap: 0.8rem;
  }
`;

function Header() {
  const { user } = useUser();
  return (
    <StyledHeader>
      <DemoModeIndicator />
      {user && <UserAvatar />}
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
