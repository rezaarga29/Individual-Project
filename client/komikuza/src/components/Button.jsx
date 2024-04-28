import { Link } from "react-router-dom";

export default function Button() {
  return (
    <>
      <div className="text-center">
        <Link
          to="/watchlist"
          className="btn btn-light mx-2"
          style={{ width: 150 }}
        >
          Back
        </Link>
        <button
          type="submit"
          className="btn btn-light mx-2"
          style={{ width: 150 }}
        >
          Submit
        </button>
      </div>
    </>
  );
}
//!BUTTON
