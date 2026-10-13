import { Grid, GridColumn } from "semantic-ui-react";
import {
  ExplorePath,
  loginPath,
  memberPath,
  moviesPath,
  RecEnginePath,
  TriviaGamePath,
} from "../../constants/constants";

import { CartButton } from "./CartButton";
import { useUser } from "../../context/UserContext";

import "./headerBanner.css";

export const HeaderBanner = () => {
  const { user } = useUser();
  return (
    <div className="member-banner">
      <Grid centered>
        <GridColumn width={4}>
          <a href={moviesPath}>Movies</a>
          <br />
          <a href={loginPath}>{user ? "Sign Out" : "Login"}</a>
          <br />
        </GridColumn>
        <GridColumn width={4}>
          <a href={ExplorePath}>Explore</a>
          <br />
          <a href={RecEnginePath}>Recommendations</a>
          <br />
          <a href={TriviaGamePath}>Trivia Game</a>
        </GridColumn>
        {user ? (
          <GridColumn width={4}>
            <a href={memberPath}>{`${user.first_name} ${user?.last_name}`}</a>
            <br />
            <a href={memberPath}>
              Currently Rented: {user.checked_out?.length ?? 0}
            </a>
            <br />
            <CartButton />
          </GridColumn>
        ) : null}
      </Grid>
    </div>
  );
};
