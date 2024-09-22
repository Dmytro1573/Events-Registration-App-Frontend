import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerEvent } from "../../../redux/events/operations";

import css from "./EventRegistrationForm.module.css"; // Стилі

// Схема валідації за допомогою Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  hearAbout: Yup.string().required("Please select an option"),
});

export default function EventRegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Початкові значення форми
  const initialValues = {
    name: "",
    email: "",
    dateOfBirth: "",
    hearAbout: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Відправка даних через registerEvent
      await dispatch(registerEvent(values)).unwrap();

      alert("Registration successful!");
      resetForm(); // Скинути форму після успішної реєстрації
      navigate("/events"); // Перенаправити на сторінку подій
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert(
        error || "There was an error with your registration. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.container}>
      <h2>Event registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="name">Full name</label>
              <Field
                type="text"
                name="name"
                id="name"
                className={css.inputField}
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className={css.inputField}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="dateOfBirth">Date of birth</label>
              <Field
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className={css.inputField}
              />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label>Where did you hear about this event?</label>
              <div role="group" className={css.radioGroup}>
                <label>
                  <Field type="radio" name="hearAbout" value="Social media" />
                  Social media
                </label>
                <label>
                  <Field type="radio" name="hearAbout" value="Friends" />
                  Friends
                </label>
                <label>
                  <Field type="radio" name="hearAbout" value="Found myself" />
                  Found myself
                </label>
              </div>
              <ErrorMessage
                name="hearAbout"
                component="div"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
