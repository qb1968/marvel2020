import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const HeroCard = ({ id, name, description, thumbnail, fav, pageNumber }) => {
  const [favorite, setFavorite] = useState(fav);
  const history = useHistory();
  const marvelPic = `${thumbnail.path}/standard_fantastic.${thumbnail.extension}`;

  const handleClick = (id) => {
    let heroIds = Cookies.get("heroIds");
    if (!heroIds) {
      const heroId = `${id}`;
      Cookies.set("heroIds", heroId, {
        expires: 7,
      });
    } else {
      const heroIdsArray = heroIds.split("-");
      const idOfHero = heroIdsArray.indexOf(id.toString());
      if (idOfHero === -1) {
        Cookies.set("heroIds", `${heroIds}-${id}`, {
          expires: 7,
        });
      }
      if (idOfHero !== -1) {
        heroIdsArray.splice(idOfHero, 1);
        const stringOfHeroId = heroIdsArray.join("-");
        Cookies.set("heroIds", stringOfHeroId, {
          expires: 7,
        });
      }
    }
  };

  return (
    <>
      {thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (
        <div className="hero">
          <div className="hero-card">
            <div className="circle-hero">
              <FontAwesomeIcon
                className={favorite ? "plus-icon-card-r" : "plus-icon-card-w"}
                icon="plus"
                size="3x"
                onClick={() => {
                  handleClick(id);
                  setFavorite(!favorite);
                }}
              />
            </div>
            <div
              className="Picture"
              style={{
                height: "100%",
                backgroundImage: `url(${marvelPic} )`,
                backgroundSize: "contain",
                backgroundPosition: "top",
                borderRadius: "inherit",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="Card__gradient-overlay">
                <div className="Card-Bot">
                  <h1
                    onClick={() => {
                      history.push("/character_1", {
                        id: id,
                        name: name,
                        description: description,
                        thumbnail: thumbnail,
                        pageToReturn: pageNumber,
                      });
                    }}
                  >
                    {name}
                  </h1>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroCard;
