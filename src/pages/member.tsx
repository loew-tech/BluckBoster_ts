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

import { getUser, fetchCheckedoutMovies, returnRentals } from "../utils/utils";
import { Member, Movie } from "../types/types";
import { HeaderBanner } from "../components/headerBanner";
import { loginPath, moviesPath } from "../constants/constants";
import { ErrorMessage } from "../components/errorMessage";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { toggleToRest, toggleToGraphQL } from "../store/apiSlice";

import "./member.css";

export const MemberPage = () => {
  const api = useAppSelector((state) => state.api.api);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [member, setMember] = useState<Member | null>(null);
  const [rentals, setRentals] = useState<Movie[]>([]);
  const [currentlyRented, setCurrentlyRented] = useState<number>(0);
  const [returnErr, setReturnErr] = useState<boolean>(false);
  const [fetchCheckedOutErr, setFetchCheckedOutErr] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>(api);

  useEffect(() => {
    getUser().then((user: Member) => {
      setMember(user);
      setCurrentlyRented(user?.checked_out ? user.checked_out.length : 0);
    });
  }, []);

  const getCheckedoutMovies = useCallback(async () => {
    if (member) {
      const movies = await fetchCheckedoutMovies(member.username);
      if (movies) {
        setRentals(movies);
      } else {
        setRentals([]);
        setFetchCheckedOutErr(true);
      }
    }
  }, [member]);

  useEffect(() => {
    getCheckedoutMovies();
  }, [getCheckedoutMovies]);

  const toggleActiveButton = (selection: string) => {
    setActiveButton(selection);
    if (selection === "rest") {
      dispatch(toggleToRest());
    } else if (selection === "graphQL") {
      dispatch(toggleToGraphQL());
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    navigate(loginPath);
  };

  const rentalReturn = async (movie_ids: string[]) => {
    if (!member) {
      setReturnErr(true);
      return;
    }

    const success = await returnRentals(member.username, movie_ids);
    if (success) {
      setRentals(rentals.filter((m) => !movie_ids.includes(m.id)));
      setCurrentlyRented(currentlyRented - 1);
      const data = localStorage.getItem("user");
      if (!data) {
        // @TODO: handle not getting user
        return;
      }
      // @TODO: handle updating rentals
      // const user = JSON.parse(data) as Member;
      // const index = (user?.checked_out || []).indexOf(movie_id);
      // if (-1 < index) {
      //   user.checked_out = (user?.checked_out || []).splice(index, 1);
      //   localStorage.setItem("user", JSON.stringify(user));
      // }
      setReturnErr(false);
    } else {
      setReturnErr(true);
    }
  };

  return (
    <div>
      <HeaderBanner user={member} />
      <Label className="active-api-label">
        <Icon name="database" />
        Currently running on {activeButton}
      </Label>
      <div>
        <ButtonGroup style={{ marginTop: "1rem" }}>
          <Button
            onClick={() => toggleActiveButton("rest")}
            className={activeButton === "rest" ? "selected" : ""}
          >
            REST
          </Button>
          <ButtonOr />
          <Button
            onClick={() => toggleActiveButton("graphql")}
            className={activeButton === "graphql" ? "selected" : ""}
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
