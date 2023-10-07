/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { redirect, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the Authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2. while loading  show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 3.if there is no authenticated user, redirect to the login page
  if (!isAuthenticated) navigate("/login");

  // 4.if there is authenticated user, render the app
  return children;
}

export default ProtectedRoute;
