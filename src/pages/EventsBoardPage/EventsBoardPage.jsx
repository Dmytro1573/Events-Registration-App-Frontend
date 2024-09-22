import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../redux/events/operations";
import {
  selectEvents,
  selectError,
  selectLoading,
} from "../../../redux/events/selectors";
import Loader from "../../components/Loader/Loader";
import ErrorText from "../../components/ErrorText/ErrorText";
import css from "./EventsBoardPage.module.css"; // Додаємо кастомні стилі
import { useNavigate } from "react-router-dom";

export default function EventsBoardPage() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchEvents({ page: currentPage, perPage })).then((action) => {
      console.log("Fetched events:", action.payload);
      if (action.payload) {
        setTotalPages(action.payload.totalPages);
        setHasNextPage(action.payload.hasNextPage);
        setHasPreviousPage(action.payload.hasPreviousPage);
      }
    });
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPreviousPage && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const navigate = useNavigate();

  // Функція, яка перенаправляє на сторінку реєстрації
  const handleRegisterClick = () => {
    navigate("/events/register");
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Events</h2>
      {isLoading && <Loader />}
      {isError && <ErrorText />}
      {events.length > 0 && (
        <>
          <div className={css.eventsGrid}>
            {events.map((event) => (
              <div key={event._id} className={css.eventCard}>
                <h3>{event.name}</h3>
                <p>{event.description || "No description available"}</p>
                <div className={css.eventFooter}>
                  <button
                    className={css.registerButton}
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                  <button className={css.viewButton}>View</button>
                </div>
              </div>
            ))}
          </div>
          <div className={css.pagination}>
            <button onClick={handlePrevPage} disabled={!hasPreviousPage}>
              &larr;
            </button>
            <span>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={currentPage === page ? css.activePage : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </span>
            <button onClick={handleNextPage} disabled={!hasNextPage}>
              &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
