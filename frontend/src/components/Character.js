import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Pagination from "../components/Pagination";
import CharacterHeader from "../components/CharacterHeader";
import ComicCard from "../components/ComicCard";
import loading from "../images/loading.svg";

const Character = () => {
  const location = useLocation();
  const { id, name, description, thumbnail, pageToReturn } = location.state;
  const characterPic = `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pageNumber } = useParams();
  const pageNumbers = [];

  const history = useHistory();

  const [limit, setLimit] = useState(100);
  let skipping = 0;
  if (pageNumber > 1) skipping = (pageNumber - 1) * 100;

  const paginate = (pageNumber) => {
    history.push("/character_" + pageNumber, {
      id: id,
      name: name,
      description: description,
      thumbnail: thumbnail,
    });
  };

  for (let i = 1; i <= Math.ceil(data.total / limit); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5000/character/comics?id=${id}&offset=${skipping}`
      );
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [skipping, id]);

  const comicIds = Cookies.get("comicIds");
  var comicIdsArray;
  if (comicIds) {
    comicIdsArray = comicIds.split("-");
  }

  return (
    <div className="character-section">
      <div className="character-description">
        <FontAwesomeIcon
          className="return-btn"
          icon="arrow-alt-circle-left"
          size="2x"
          onClick={() => {
            history.push(`/characters_${pageToReturn}`);
          }}
        />
        <CharacterHeader
          characterPic={characterPic}
          name={name}
          description={description}
        />
      </div>
      {isLoading ? (
        <div className="loading">
          <img src={loading} alt="loading" />
        </div>
      ) : (
        <div className="card-wrap">
          {data.results.map((comic, index) => {
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
          })}
        </div>
      )}

      <Pagination
        totalPosts={data.total}
        pageNumber={pageNumber}
        limit={limit}
        paginate={paginate}
        setLimit={setLimit}
      />
    </div>
  );
};

export default Character;
