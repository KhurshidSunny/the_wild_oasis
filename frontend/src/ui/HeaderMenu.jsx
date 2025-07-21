import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

    const accountHandler = () => {
      const jwt = localStorage.getItem('jwt');
      const userId = localStorage.getItem('userId');
      if(userId && jwt) {
        navigate('/account')
      }
    }
  
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={accountHandler}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>

      <li>
        <DarkModeToggle />
      </li>

      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
