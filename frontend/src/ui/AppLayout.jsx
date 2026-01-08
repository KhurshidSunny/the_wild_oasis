import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;

  @media (max-width: 1024px) {
    grid-template-columns: 22rem 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.6rem 6.4rem;
  overflow: scroll;

  @media (max-width: 1024px) {
    padding: 3rem 3rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem 2rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
