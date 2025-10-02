import { useCallback, useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { RentalTableBody } from "./RentaTableBody";
import { Member, Movie } from "../../types/types";
import { RentalTableHeader } from "./rentalTableHeader";
import { ErrorMessage } from "../common/errorMessage";
import { loginPath, USER } from "../../constants/constants";
import {
  fetchCheckedoutMovies,
  getUser,
  returnRentals,
} from "../../utils/utils";
import { useUser } from "../../context/UserContext";
import { getUserFromCookie, setCookie } from "../../utils/cookieUtils";

type RentalTableProps = {
  setIsLoading: (isLoading: boolean) => void;
};
export const RentalTable = ({ setIsLoading }: RentalTableProps) => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [member, setMember] = useState<Member | null>(null);
  const [rentals, setRentals] = useState<Movie[]>([]);
  const [currentlyRented, setCurrentlyRented] = useState<number>(0);
  const [fetchCheckedOutErr, setFetchCheckedOutErr] = useState<boolean>(false);
  const [returnErr, setReturnErr] = useState<boolean>(false);

  useEffect(
    () => {
      setIsLoading(true);
      getUser().then((user: Member | null) => {
        if (!user) {
          console.warn("User not found. Redirecting to login.");
          navigate(loginPath);
        }
        setMember(user);
        setUser(user);
        setCurrentlyRented(user?.checked_out?.length || 0);
      });
      setIsLoading(false);
    },
    //   eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate]
  );

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
      const updatedCheckedOut = (user.checked_out ?? []).filter(
        (id) => !movieIDs.includes(id)
      );
      const updatedUser = { ...user, checked_out: updatedCheckedOut };
      setUser(updatedUser);
      setCookie(USER, JSON.stringify(user));
      setMember(user);
      setReturnErr(false);
    } else {
      setReturnErr(true);
    }
  };

  const getCheckedoutMovies = useCallback(
    async () => {
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
    },
    //   eslint-disable-next-line react-hooks/exhaustive-deps
    [member]
  );

  useEffect(() => {
    getCheckedoutMovies();
  }, [getCheckedoutMovies]);

  return (
    <>
      {rentals.length ? (
        <Table striped>
          <RentalTableHeader rentals={rentals} rentalReturn={rentalReturn} />
          <RentalTableBody rentals={rentals} rentalReturn={rentalReturn} />
        </Table>
      ) : null}
      {returnErr ? <ErrorMessage msg="Failed to return movies" /> : null}
      {fetchCheckedOutErr ? (
        <ErrorMessage msg="Failed to retrieve your currently rented movies" />
      ) : null}
    </>
  );
};
