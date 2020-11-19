import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Pagination from "../components/Pagination";
import ComicCard from "../components/ComicCard";
import loading from "../images/loading.svg";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { pageNumber } = useParams();
  const pageNumbers = [];

  const [research, setResearch] = useState("");

  const history = useHistory();

  const [limit, setLimit] = useState(100);
  let skipping = 0;
  if (pageNumber > 1) skipping = (pageNumber - 1) * 100;

  const paginate = (pageNumber) => {
    history.push("/comics_" + pageNumber);
  };

  for (let i = 1; i <= Math.ceil(data.total / limit); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5000/comics?offset=${skipping}`
      );
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [skipping]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
        `http://localhost:5000/comics/search?titleStartsWith=${research}`
    );
    setData(response.data.data);
    setIsLoading(false);
  };

  const comicIds = Cookies.get("comicIds");
  var comicIdsArray;
  if (comicIds) {
    comicIdsArray = comicIds.split("-");
  }

  return (
    <>
      <div>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search"
            type="text"
            placeholder="which comics are you looking for ?"
            value={research}
            onChange={(event) => {
              setResearch(event.target.value);
            }}
          />
          <button className="search-btn" type="submit">
            SEARCH
          </button>
        </form>
      </div>
      <div className="card-wrap">
        {isLoading ? (
          <div className="loading">
            <img src={loading} alt="loading" />
          </div>
        ) : (
          data.results.map((comic, index) => {
            return (
              <ComicCard
                {...comic}
                key={index}
                fav={
                  comicIdsArray &&
                  comicIdsArray.indexOf(comic.id.toString()) !== -1
                    ? true
                    : false
                }
              />
            );
          })
        )}
      </div>

      <Pagination
        totalPosts={data.total}
        pageNumber={pageNumber}
        limit={limit}
        paginate={paginate}
        setLimit={setLimit}
      />
    </>
  );
};

export default Comics;
