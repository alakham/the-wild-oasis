import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const FullPage = styled.div`
  /* height: 100vh; */
  background-color: var(--color-grey-50);
  display: flex;
  text-align: center;
  justify-content: center;
`;

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  // 1 - Load the authenticate user
  const { isLoading, isAuthenticated } = useUser();

  //   3 if(!user) redirect to login form

  //   if (!isAuthenticated) return <Navigate to="/login" />;

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) return navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  //   2 - Show a spinner while loading

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //   4 - if(user) rend App

  if (isAuthenticated) return children;
}

export default ProtectedRoutes;
