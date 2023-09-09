import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyled";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  height: 400px;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>

            <div>
              <Heading as="h2">check in and out</Heading>
              <Button onClick={() => alert("check in")}>Check in</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("check out")}
              >
                Check out
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="number of guests" />
              <Input type="number" placeholder="number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
