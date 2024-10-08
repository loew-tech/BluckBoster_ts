import { memberPath, moviesPath } from "../constants/constants";
import { Member } from "../types/types";

type HeaderBannerProps = {
  user: Member | null;
};

// @TODO: move cart in here
export const HeaderBanner = ({ user }: HeaderBannerProps) => {
  return (
    <div className="member-banner">
      <div className="anchor-left">
        <div>
          <a href={moviesPath}>Movies</a>
        </div>
        <div>
          <a href={memberPath}>
            {user ? `${user.first_name} ${user?.last_name}` : null}
          </a>
        </div>
      </div>
      {user ? (
        <a href={memberPath}>
          Currently rented: {user?.checked_out ? user.checked_out.length : 0}
        </a>
      ) : null}
    </div>
  );
};
