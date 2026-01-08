import styled from "styled-components";
import { HiShieldCheck } from "react-icons/hi2";
import { useUser } from "../features/authentication/useUser";

const StyledIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.5rem 0.8rem;
    gap: 0.4rem;
  }
`;

function DemoModeIndicator() {
  // Check if we're in demo mode - only show for demo user email
  const token = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");
  const { user } = useUser();
  
  // Only show for demo user (test token, demo user ID, or demo email)
  const isDemoUser = 
    token?.startsWith("test-token") || 
    userId === "test-user-123" ||
    user?.email === "demo@wildoasis.com";
  
  if (!isDemoUser) return null;

  return (
    <StyledIndicator>
      <HiShieldCheck size={16} />
      <span>Demo Mode</span>
    </StyledIndicator>
  );
}

export default DemoModeIndicator;

