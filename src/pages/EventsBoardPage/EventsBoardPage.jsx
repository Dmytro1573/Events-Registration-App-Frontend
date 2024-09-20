import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../redux/events/operations";
import {
  selectEvents,
  selectError,
  selectLoading,
} from "../../../redux/events/selectors";
import Loader from "../../components/Loader/Loader";
import ErrorText from "../../components/ErrorText/ErrorText";
import css from "./EventsBoardPage.module.css";

export default function EventsBoardPage() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Events Board</h2>
      {isLoading && <Loader />}
      {isError && <ErrorText />}
      {events.length > 0 && (
        <ul className={css.eventsList}>
          {events.map((event) => (
            <li key={event.id} className={css.eventItem}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
              <p>Organizer: {event.organizer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
