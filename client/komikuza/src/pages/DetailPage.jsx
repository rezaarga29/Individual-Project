import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailSuccess } from "../store/comicSlice";

export default function DetailPage() {
  const location = useLocation();
  // const [komiks, setKomiks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const comicUrl = new URLSearchParams(location.search).get("url");
  const dispatch = useDispatch();

  const komiks = useSelector((state) => state.detailscomic);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://indonesia-komik.p.rapidapi.com/v1/comic",
        params: {
          url: comicUrl,
        },
        headers: {
          lulThings: "iyainiyainiyainde123",
          "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "indonesia-komik.p.rapidapi.com",
        },
      };
      try {
        const { data } = await axios(options);
        dispatch(fetchDetailSuccess(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (komiks.length === 0) {
    return <div>Loading...</div>;
  }

  const { chapterList, synopsis } = komiks;

  // Filter chapterList berdasarkan searchQuery
  const filteredChapterList = chapterList.filter((chapter) =>
    chapter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div
        className="clearfix d-flex justify-content-center align-items-center"
        style={{ margin: "20px" }}
      >
        <img
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/comic-logo-design-template-8784347f1d3151d491ecc71a664ee55b_screen.jpg?ts=1684889101"
          className="col-md-6"
          style={{ maxWidth: "300px", maxHeight: "300px", marginRight: "20px" }}
          alt="Comic Logo"
        />
        <div>
          <p className="mb-0" style={{ fontWeight: "bold" }}>
            Sinopsis:
          </p>
          <p className="mb-0">{synopsis}</p>
        </div>
      </div>

      <div className="container mt-5">
        <h3>All Chapter</h3>
        <p>Total chapter : {chapterList.length}</p>
        <input
          type="text"
          placeholder="Search by chapter title..."
          value={searchQuery}
          onChange={handleSearch}
          className="form-control form-control-sm mb-3"
        />
        <div className="row">
          {filteredChapterList.map((chapter, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <img src={chapter.cover} className="card-img-top" alt="..." />
                <h5 className="card-title">{chapter.title}</h5>
                <p className="card-text mb-1">Release: {chapter.releaseDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
