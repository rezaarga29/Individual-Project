import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

export default function LoginPage() {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios({
        method: "post",
        url: import.meta.env.VITE_API_BASE_URL + "/login",
        data: input,
      });
      // console.log(data);
      localStorage.access_token = data.access_token;
      navigate("/");
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

  async function handleCredentialResponse(response) {
    try {
      const { data } = await axios({
        method: "post",
        url: import.meta.env.VITE_API_BASE_URL + "/google-login",
        headers: {
          google_token: response.credential,
        },
      });
      localStorage.access_token = data.access_token;
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "681137735030-g56nbddcj4g8f58ij68u2hrt96fctgia.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt(); // tampilkan dialog One Tap
  }, []);

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
              alt="Shopping"
            />
          </div>
          <div
            style={{ backgroundColor: "#ab0505" }}
            className="col d-flex justify-content-center align-items-center h-100"
          >
            <form onSubmit={submitLogin}>
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
                  marginBottom: "10px", // Menambahkan jarak 10px di bawah button
                }}
              >
                Login
              </button>
              <div className="col d-flex justify-content-center align-items-center h-100">
                <div id="buttonDiv"></div>
              </div>
              <div
                style={{ color: "#fff" }}
                id="emailHelp"
                className="form-text"
              >
                Do you have an account?
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  {" "}
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
