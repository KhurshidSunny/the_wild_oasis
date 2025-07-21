/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useUser } from "./useUser";
import Spinner from "../../ui/Spinner";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const FullPage = styled.div`
  height: 100vh;
  background: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function UserAvatar() {
  const { user, isLoading } = useUser();

    if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  const { name, photo} = user;
  return (
    <div>
      <StyledUserAvatar>
        <Avatar
          src={`${photo}` || "default-user.jpg"}
          alt={`avatar of ${name}`}
        />

        <span>{name}</span>
      </StyledUserAvatar>
    </div>
  );
}

export default UserAvatar;
