import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import poke from '../../assets/regwomen.jpg'
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignUp = (values) => {
    setLoading(true);
    localStorage.setItem("user_email", values.email);
    localStorage.setItem("user_password", values.password);

    setLoading(false);
    alert("Sign-up successful!");
    navigate("/");
  };

  return (
    <div className="container-fluid d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-4" style={{ overflowY: 'auto', height: "100%" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <p className="text-center mb-4" style={{ fontSize: "1rem" }}>
          Create an account by entering your email and a strong password. You will be able to access all the features once you register.
        </p>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            <Form className="w-100">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" id="email" name="email" className="form-control" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" id="password" name="password" className="form-control" placeholder="Enter your password" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary w-100">Sign Up</button>

              <div className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </Form>
          </Formik>
        )}
      </div>
      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
        <img src={poke} alt="Sign Up Image" className="img-fluid h-100 w-100 object-cover" />
      </div>
    </div>
  );
};

export default SignUp;
