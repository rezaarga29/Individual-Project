import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Edit() {
  const [input, setInput] = useState({
    title: "",
    cover: "",
    url: "",
    rating: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      async function fetchPostById() {
        try {
          let { data } = await axios({
            method: "GET",
            url: import.meta.env.VITE_API_BASE_URL + `/comic/${id}`,
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          });
          setInput({
            title: data.data.title,
            cover: data.data.cover,
            url: data.data.url,
            rating: data.data.rating,
          });
        } catch (error) {
          console.log(error.response.data.message);
          let errMsg = error.response.data.message;
          Swal.fire({
            title: "Error",
            text: errMsg,
            icon: "error",
          });
        }
      }
      fetchPostById();
    }
  }, [id]);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleForm = async (e) => {
    const rating = parseFloat(input.rating);

    e.preventDefault();
    try {
      let response = await axios({
        method: "PUT",
        url: import.meta.env.VITE_API_BASE_URL + `/comic/${id}`,
        data: { ...input, rating },

        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Grocery item has been updated",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/watchlist");
    } catch (error) {
      console.log(error.response.data.message);
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
        className="bg-opacity-75"
        style={{
          marginLeft: 300,
          marginRight: 300,
          marginBottom: 50,
          padding: 30,
          borderRadius: 10,
          color: "#fff",
          backgroundColor: "#ab0505",
        }}
      >
        <form onSubmit={handleForm}>
          <div className="mb-3 bg-opacity-50">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={input.title}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Cover
            </label>
            <input
              type="text"
              className="form-control"
              id="cover"
              name="cover"
              value={input.cover}
              onChange={handleChangeInput}
            />
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Rating
            </label>
            <input
              type="number"
              className="form-control"
              id="rating"
              name="rating"
              value={input.rating}
              onChange={handleChangeInput}
            />
          </div>
          <Button />
        </form>
      </div>
    </>
  );
}
