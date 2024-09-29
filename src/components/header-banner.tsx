import { Member } from "../types/types";

type HeaderBannerProps = {
  user: Member | null;
};

export const HeaderBanner = ({ user }: HeaderBannerProps) => {
  return (
    <div
      style={{ backgroundColor: "darkblue", height: "150px", color: "gold" }}
    >
      <ul className="MemberBanner">
        <li style={{ fontWeight: 1000, fontSize: "large", padding: "8px" }}>
          <a href="/movies/">Movies</a>
        </li>
        <li style={{ fontWeight: 1000, fontSize: "large", padding: "8px" }}>
          <a color="gold" href="/member/">
            {user ? `${user.first_name} ${user?.last_name}` : null}
          </a>
        </li>
        {user ? (
          <li
            style={{
              fontWeight: 1000,
              fontSize: "large",
              paddingLeft: "8px",
            }}
          >
            <p>
              Currently rented: {user.checked_out ? user.checked_out.length : 0}
            </p>
          </li>
        ) : null}
      </ul>
    </div>
  );
};
