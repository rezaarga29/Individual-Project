import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function RegisterPage() {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: import.meta.env.VITE_API_BASE_URL + "/register",
        data: input,
      });
      Swal.fire({
        icon: "success",
        title: "Successfully Registered",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      let errMsg = error.response.data.message;
      Swal.fire({
        title: "Error",
        text: errMsg,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{ height: "100vh", color: "#fff" }}
      >
        <div className="row h-100">
          <div className="col d-flex justify-content-center align-items-center h-100">
            <img
              style={{ width: 500 }}
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/comic-logo-design-template-8784347f1d3151d491ecc71a664ee55b_screen.jpg?ts=1684889101"
              alt=""
            />
          </div>
          <div
            style={{ backgroundColor: "#ab0505" }}
            className="col d-flex justify-content-center align-items-center h-100"
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <h3 className="text-center mb-3">Komikuza</h3>
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  aria-describedby="emailHelp"
                  value={input.email}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={input.password}
                  onChange={handleChangeInput}
                />
              </div>
              <button
                type="submit"
                className="btn w-100"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #fff",
                  color: "#fff",
                }}
              >
                Register
              </button>
              <div
                style={{ color: "#fff" }}
                id="emailHelp"
                className="form-text"
              >
                Do you have an account?
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  {" "}
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
