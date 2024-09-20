import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome to Events Registration App</h1>
      {/* Додамо посилання для переходу на сторінку подій */}
      <Link to="/events" className={css.link}>
        Go to Events Board
      </Link>
    </div>
  );
}
