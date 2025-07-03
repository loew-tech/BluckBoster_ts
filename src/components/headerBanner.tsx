import { Grid, GridColumn } from "semantic-ui-react";
import {
  ExplorePath,
  loginPath,
  memberPath,
  moviesPath,
} from "../constants/constants";
import { Member } from "../types/types";

import "./headerBanner.css";

type HeaderBannerProps = {
  user: Member | null;
};

// @TODO: move cart in here
export const HeaderBanner = ({ user }: HeaderBannerProps) => {
  return (
    <div className="member-banner">
      <Grid>
        <GridColumn width={8}>
          <a href={moviesPath}>Movies</a>
          <br />
          <a href={ExplorePath}>Explore</a>
          <br />
          <a href={loginPath}>{user ? "Sign Out" : "Login"}</a>
        </GridColumn>
        {user ? (
          <GridColumn width={8}>
            <a href={memberPath}>
              {user ? `${user.first_name} ${user?.last_name}` : null}
            </a>
            <br />
            <a href={memberPath}>
              Currently Rented:{" "}
              {user?.checked_out ? user.checked_out.length : 0}
            </a>
          </GridColumn>
        ) : null}
      </Grid>
    </div>
  );
};
