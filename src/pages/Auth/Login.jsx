import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import poke from '../../assets/regwomen.jpg'; 
import Loading from "../../components/Loading";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      navigate("/dashboard"); 
    }
  }, [navigate]);

  const handleLogin = (values) => {
    setLoading(true);
    const storedEmail = localStorage.getItem("user_email");
    const storedPassword = localStorage.getItem("user_password");

    if (storedEmail === values.email && storedPassword === values.password) {
      const token = "sample-session-token";

      localStorage.setItem("user_token", token);

      setLoading(false);
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      setLoading(false);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="container-fluid d-flex" style={{ height: "100vh" }}>
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5">
        <div style={{ width: "80%" }}>
          <h2 className="text-center mb-4">
            Welcome Back! <span role="img" aria-label="Hi">👋</span>
          </h2>
          <p className="text-center mb-4" style={{ fontSize: "1.2rem" }}>
            Today is a new day. It's your day. You shape it.
          </p>

          {loading ? (
            <div><Loading/></div>
          ) : (
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form className="w-100">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                <button type="submit" className="btn btn-primary w-100">Login</button>

                <div className="text-center mt-3">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
              </Form>
            </Formik>
          )}
        </div>
      </div>

      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <img src={poke} alt="Login Illustration" className="img-fluid h-100 w-100 object-cover" />
      </div>
    </div>
  );
};

export default Login;
