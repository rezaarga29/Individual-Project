import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NavbarUser() {
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || ""
  );
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken("");
  };

  const handleDonate = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_BASE_URL + "/generate-midtrans",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      // Panggil window.snap.pay setelah permintaan berhasil
      window.snap.pay(data.token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          alert("payment success!");
          console.log(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("waiting for your payment!");
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //!NAVBAR LOGUOUT
    <>
      <nav
        style={{ backgroundColor: "#ab0505" }}
        className="navbar navbar-expand-lg navbar-dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Komikuza
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/watchlist" className="nav-link active">
                  WatchList
                </Link>
              </li>
            </ul>
            <Link
              to="/login"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                marginRight: "10px",
                // Tambahkan jarak kiri di sini
              }}
              className="btn btn-outline-primary"
              type="submit"
              onClick={handleDonate}
            >
              Donate
            </Link>
            <Link
              to="/login"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                marginLeft: "10px", // Tambahkan jarak kanan di sini
              }}
              className="btn btn-outline-primary"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
