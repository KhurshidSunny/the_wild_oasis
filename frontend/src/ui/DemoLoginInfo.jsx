import styled from "styled-components";
import { HiInformationCircle } from "react-icons/hi2";

const StyledDemoInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.6rem 2.4rem;
  border-radius: 8px;
  margin-bottom: 2.4rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
  font-weight: 600;
  font-size: 1.4rem;
`;

const Credentials = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 1.2rem;
  border-radius: 6px;
  font-size: 1.3rem;
  line-height: 1.8;
  
  & strong {
    display: inline-block;
    min-width: 80px;
  }
`;

const Note = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  opacity: 0.9;
  font-style: italic;
`;

function DemoLoginInfo() {
  return (
    <StyledDemoInfo>
      <InfoHeader>
        <HiInformationCircle size={20} />
        Demo Login Credentials
      </InfoHeader>
      <Credentials>
        <div><strong>Email:</strong> demo@wildoasis.com</div>
        <div><strong>Password:</strong> demo123</div>
      </Credentials>
      <Note>
        💡 This is a demo environment. All operations work, but data is preserved for portfolio demonstration.
      </Note>
    </StyledDemoInfo>
  );
}

export default DemoLoginInfo;

