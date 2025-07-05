import { useState } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { HeaderBanner } from "../components/headerBanner/headerBanner";
import { loginPath } from "../constants/constants";
import { Spinner } from "../components/Spinner";
import { ApiSelectionBtnGroup } from "../components/memberComponents/ApiSelectionBtnGroup";
import { RentalTable } from "../components/memberComponents/RentalTable";
import { useUser } from "../context/UserContext";
import { deleteCookie } from "../utils/cookieUtils";

import "./member.css";

export const MemberPage = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = async () => {
    deleteCookie("user");
    setUser(null);
    navigate(loginPath);
  };

  return (
    <div>
      <HeaderBanner />
      {isLoading && <Spinner message="🔄 Loading your profile..." />}
      <ApiSelectionBtnGroup />
      <Button onClick={logout} style={{ marginTop: "2rem" }}>
        Logout
      </Button>
      <RentalTable setIsLoading={setIsLoading} />
    </div>
  );
};
