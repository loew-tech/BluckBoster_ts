import { useState, useEffect, useCallback } from "react";
import {
  Table,
  Button,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableBody,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../utils/utils";
import { Member, Movie } from "../types/types";
import { HeaderBanner } from "../components/header-banner";

export const MemberPage = () => {
  const navigate = useNavigate();

  const [member, setMember] = useState<Member | null>(null);
  const [rentals, setRentals] = useState<Movie[]>([]);
  const [currentlyRented, setCurrentlyRented] = useState<number>(0);
  const [returnErr, setReturnErr] = useState<boolean>(false);

  useEffect(() => {
    getUser().then((user: Member) => {
      setMember(user);
      setCurrentlyRented(user?.checked_out ? user.checked_out.length : 0);
    });
  }, []);

  const getCheckedoutMovies = useCallback(async () => {
    if (member) {
      const response = await fetch(
        `http://127.0.0.1:8080/api/v1/members/${member.username}/checkedout`
      );
      if (response.ok) {
        const data = await response.json();
        setRentals(data);
      }
    }
  }, [member]);

  useEffect(() => {
    getCheckedoutMovies();
  }, [getCheckedoutMovies]);

  const logout = async () => {
    console.log("logout btn pressedd");
    localStorage.removeItem("user");
    navigate("/login/");
  };

  const returnRental = async (movie_id: string) => {
    if (!member) {
      setReturnErr(true);
      return;
    }
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/members/return",
      {
        method: "POST",
        body: JSON.stringify({
          username: member.username,
          movie_ids: [movie_id],
        }),
      }
    );
    console.log("$$ status=", response.status, response.ok);
    if (response.ok) {
      setRentals(rentals.filter((m) => m.id !== movie_id));
      setCurrentlyRented(currentlyRented - 1);
      const data = localStorage.getItem("user");
      if (!data) {
        // @TODO: handle not getting user
        return;
      }
      const user = JSON.parse(data);
      const index = user?.checked_out.indexOf(movie_id);
      if (-1 < index) {
        user.checked_out = user.checked_out.splice(index, 1);
        localStorage.setItem("user", JSON.stringify(user));
      }
      setReturnErr(false);
    } else {
      setReturnErr(true);
    }
  };

  const returnAllRentals = async () => {
    if (!member) {
      setReturnErr(true);
      return;
    }
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/members/return",
      {
        method: "POST",
        body: JSON.stringify({
          username: member.username,
          movie_ids: rentals.map((movie) => movie.id),
        }),
      }
    );
    console.log("$$ returnAll called status=", response.status, response.ok);
    if (response.ok) {
      setRentals([]);
      setCurrentlyRented(0);
      const data = localStorage.getItem("user");
      if (!data) {
        // @TODO: handle not getting user
        return;
      }
      const user = JSON.parse(data) as Member;
      user.checked_out = [];
      localStorage.setItem("user", JSON.stringify(user));
      setReturnErr(false);
    } else {
      setReturnErr(true);
    }
  };

  return (
    <div>
      <HeaderBanner user={member} />
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
      {rentals.length ? (
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>
                <button
                  disabled={!rentals.length}
                  onClick={() => returnAllRentals()}
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
                  <TableCell className="title-cell">{movie.title}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        returnRental(movie.id);
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
      {/* @TODO: better error handling */}
      {returnErr ? <p>Failed to return movies</p> : null}
    </div>
  );
};