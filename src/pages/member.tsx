import { useState, useEffect, useCallback } from "react";
import {
  Table,
  Button,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableBody,
  ButtonGroup,
  ButtonOr,
  Label,
  Icon,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import {
  getUser,
  fetchCheckedoutMovies,
  returnRentals,
  setAPIChoice,
} from "../utils/utils";
import { Member, Movie } from "../types/types";
import { HeaderBanner } from "../components/headerBanner";
import { loginPath, moviesPath } from "../constants/constants";
import { ErrorMessage } from "../components/errorMessage";
import {
  setCookie,
  getAPIChoiceFromCookie,
  deleteCookie,
  getUserFromCookie,
} from "../utils/cookieUtils";

import "./member.css";
import { Spinner } from "../components/Spinner";
import { useUser } from "../context/UserContext";

export const MemberPage = () => {
  const api = getAPIChoiceFromCookie();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [member, setMember] = useState<Member | null>(null);
  const [rentals, setRentals] = useState<Movie[]>([]);
  const [currentlyRented, setCurrentlyRented] = useState<number>(0);
  const [returnErr, setReturnErr] = useState<boolean>(false);
  const [fetchCheckedOutErr, setFetchCheckedOutErr] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>(api);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getUser().then((member: Member | null) => {
      if (!member) {
        navigate(loginPath);
      }
      setMember(member);
      setUser(member);
      setCurrentlyRented(member?.checked_out ? member.checked_out.length : 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const getCheckedoutMovies = useCallback(async () => {
    setIsLoading(true);
    if (member) {
      const movies = await fetchCheckedoutMovies(member.username);
      if (movies) {
        setRentals(movies);
      } else {
        setRentals([]);
        setFetchCheckedOutErr(true);
      }
    }
    setIsLoading(false);
  }, [member]);

  useEffect(() => {
    getCheckedoutMovies();
  }, [getCheckedoutMovies]);

  const toggleActiveButton = (selection: string) => {
    setActiveButton(selection);
    if (
      selection !== api &&
      (selection === "REST" || selection === "GraphQL")
    ) {
      setAPIChoice(selection);
    }
  };

  const logout = async () => {
    deleteCookie("user");
    setUser(null);
    navigate(loginPath);
  };

  const rentalReturn = async (movieIDs: string[]) => {
    if (!member) {
      setReturnErr(true);
      return;
    }

    const success = await returnRentals(member.username, movieIDs);
    if (success) {
      setRentals(rentals.filter((m) => !movieIDs.includes(m.id)));
      setCurrentlyRented(currentlyRented - 1);
      const user = getUserFromCookie();
      if (!user) {
        console.warn("user cookie not found. Functionality may be affected");
        return;
      }
      user.checked_out = (user.checked_out ?? []).filter(
        (id) => !movieIDs.includes(id)
      );
      setCookie("user", JSON.stringify(user));
      setMember(user);
      setReturnErr(false);
    } else {
      setReturnErr(true);
    }
  };

  return (
    <div>
      <HeaderBanner />
      {isLoading && <Spinner message="🔄 Loading your profile..." />}
      <Label className="active-api-label">
        <Icon name="database" />
        Currently running on {activeButton}
      </Label>
      <div>
        <ButtonGroup style={{ marginTop: "1rem" }}>
          <Button
            onClick={() => toggleActiveButton("REST")}
            className={activeButton === "REST" ? "selected" : ""}
          >
            REST
          </Button>
          <ButtonOr />
          <Button
            onClick={() => toggleActiveButton("GraphQL")}
            className={activeButton === "GraphQL" ? "selected" : ""}
          >
            GraphQL
          </Button>
        </ButtonGroup>
      </div>
      <Button onClick={logout} style={{ marginTop: "2rem" }}>
        Logout
      </Button>
      {rentals.length ? (
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>
                <button
                  disabled={!rentals.length}
                  onClick={() => rentalReturn(rentals.map((m) => m.id))}
                >
                  Return All Movies
                </button>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.map((movie, i) => {
              return (
                <TableRow key={`${i}-${movie.id}`}>
                  <TableCell className="title-cell">
                    <a href={`${moviesPath}/${movie.id}`}>{movie.title}</a>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        rentalReturn([movie.id]);
                      }}
                    >
                      Return Movie
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : null}
      {returnErr ? <ErrorMessage msg="Failed to return movies" /> : null}
      {fetchCheckedOutErr ? (
        <ErrorMessage msg="Failed to retrieve your currently rented movies" />
      ) : null}
    </div>
  );
};
