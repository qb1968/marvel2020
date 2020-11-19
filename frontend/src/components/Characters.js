import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Pagination from "../components/Pagination";
import HeroCard from "../components/HeroCard";
import loading from "../images/loading.svg";

const Characters = () => {
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
    history.push("/characters_" + pageNumber);
  };

  for (let i = 1; i <= Math.ceil(data.total / limit); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5000/characters?offset=${skipping}`
      );
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [skipping]);

  const heroIds = Cookies.get("heroIds");
  var heroIdsArray;
  if (heroIds) {
    heroIdsArray = heroIds.split("-");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `http://localhost:5000/characters/search?nameStartsWith=${research}`
    );
    setData(response.data.data);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search"
            type="text"
            placeholder="which character are you looking for ?"
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
            {/* <img src={loading} alt="loading" /> */}
          </div>
        ) : (
          data.results.map((character, index) => {
            return (
              <HeroCard
                {...character}
                key={index}
                fav={
                  heroIdsArray &&
                  heroIdsArray.indexOf(character.id.toString()) !== -1
                    ? true
                    : false
                }
                pageNumber={pageNumber}
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

export default Characters;
