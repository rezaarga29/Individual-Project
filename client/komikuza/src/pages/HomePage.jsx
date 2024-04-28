import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess } from "../store/comicSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const komiks = useSelector((state) => state.comics); //!dapat dari Store(REDUX)

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://indonesia-komik.p.rapidapi.com/v1/browse",
        headers: {
          lulThings: "iyainiyainiyainde123",
          "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "indonesia-komik.p.rapidapi.com",
        },
      };
      try {
        const { data } = await axios(options);
        // setKomiks(data);
        dispatch(fetchSuccess(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (komiks.length === 0) {
    return <div>Loading...</div>;
  }

  const handleAddWatch = async (title, cover, url, rating) => {
    try {
      console.log(title, cover, url, rating);
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_BASE_URL + "/comic",
        data: {
          title,
          cover,
          url,
          rating,
        },
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Comic added to your watchlist",
        icon: "success",
      });
      navigate("/watchlist");
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
      <div className="container mt-5">
        <h3>HotList</h3>
        <div className="row">
          {komiks.hotList.map((komik, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <img src={komik.cover} className="card-img-top" alt="..." />
                <h5 className="card-title">{komik.title}</h5>
                <p className="card-text mb-1">Rating: {komik.rating}</p>
                <p className="card-text mb-1">Latest: {komik.latestChapter}</p>
                <Link
                  to={`/detailpage?url=${encodeURIComponent(komik.url)}`}
                  className="btn btn-light mb-2 w-100"
                >
                  Detail
                </Link>
                <button
                  className="btn btn-outline-danger mb-2 w-100"
                  onClick={() => {
                    handleAddWatch(
                      komik.title,
                      komik.cover,
                      komik.url,
                      komik.rating
                    );
                  }}
                >
                  Add to watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-5">
        <h3>NewList</h3>
        <div className="row">
          {komiks.newsList.map((komik, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <img src={komik.cover} className="card-img-top" alt="..." />
                <h5 className="card-title">{komik.title}</h5>
                <p className="card-text mb-1">Rating: {komik.rating}</p>
                <p className="card-text mb-1">Latest: {komik.latestChapter}</p>
                <Link
                  to={`/detailpage?url=${encodeURIComponent(komik.url)}`}
                  className="btn btn-light mb-2 w-100"
                >
                  Detail
                </Link>
                <button
                  className="btn btn-outline-danger mb-2 w-100"
                  onClick={() => {
                    handleAddWatch(
                      komik.url,
                      komik.title,
                      komik.cover,
                      komik.rating
                    );
                  }}
                >
                  Add to watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-5">
        <h3>TrendingList</h3>
        <div className="row">
          {komiks.trendingList.map((komik, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <img src={komik.cover} className="card-img-top" alt="..." />
                <h5 className="card-title">{komik.title}</h5>
                <p className="card-text mb-1">Rating: {komik.rating}</p>
                <p className="card-text mb-1">Latest: {komik.latestChapter}</p>
                <Link
                  to={`/detailpage?url=${encodeURIComponent(komik.url)}`}
                  className="btn btn-light mb-2 w-100"
                >
                  Detail
                </Link>
                <button
                  className="btn btn-outline-danger mb-2 w-100"
                  onClick={() => {
                    handleAddWatch(
                      komik.url,
                      komik.title,
                      komik.cover,
                      komik.rating
                    );
                  }}
                >
                  Add to watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
