import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function WatchList() {
  const [komiks, setKomiks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: import.meta.env.VITE_API_BASE_URL + "/comic",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        // console.log(data);
        setKomiks(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      let { data } = await axios({
        method: "delete",
        url: import.meta.env.VITE_API_BASE_URL + `/comic/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setKomiks(komiks.filter((komik) => komik.id !== id)); //? untuk fetch ulang data yang tidak sama dengan id yang didelete
      //   console.log(data.message);
      let msg = data.message;
      Swal.fire({
        title: "Deleted!",
        text: msg,
        icon: "success",
      });
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

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  if (komiks.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="mb-2 col text-center">
            <h2>My Watchlist</h2>
          </div>
        </div>
        <div className="row">
          {komiks.map((komik) => (
            <div key={komik.id} className="card">
              <div className="card-body">
                <img src={komik.cover} className="card-img-top" alt="..." />
                <h5 className="card-title">
                  <Link
                    to={`/detailpage?url=${encodeURIComponent(komik.url)}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {komik.title}
                  </Link>
                  <p className="card-text mb-1">Rating: {komik.rating}</p>
                  <Link
                    to={`/update-watchlist/${komik.id}`}
                    className="btn btn-warning mb-2 w-100"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => confirmDelete(komik.id)}
                    className="btn btn-danger w-100"
                  >
                    Delete
                  </button>
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
