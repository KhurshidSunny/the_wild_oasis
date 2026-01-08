/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useUser } from "./useUser";
import SpinnerMini from "../../ui/SpinnerMini";
import defaultUserImage from "../../data/img/default-user.jpg";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    gap: 0.8rem;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  height: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  
  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`;

const UserName = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

function UserAvatar() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <StyledUserAvatar>
        <SpinnerMini />
      </StyledUserAvatar>
    );
  }

  if (!user) return null;

  // Get user name - handle both 'name' and 'fullName' fields
  const userName = user.name || user.fullName || "User";
  // Get first name only
  const firstName = userName.split(" ")[0];
  
  // Get photo - handle both 'photo' and 'image' fields, with fallback
  const userPhoto = user.photo || user.image || defaultUserImage;

  return (
    <StyledUserAvatar>
      <Avatar
        src={userPhoto}
        alt={`avatar of ${userName}`}
        onError={(e) => {
          // Fallback to default image if photo fails to load
          e.target.src = defaultUserImage;
        }}
      />
      <UserName>{firstName}</UserName>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
