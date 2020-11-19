import React from "react";

const Pagination = ({ limit, totalPosts, paginate, pageNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {/* pagnination */}
      <nav className="pagination">
        <ul>
          <li className="nav-btn" onClick={() => paginate(1)}>
            First
          </li>
          {pageNumber > 1 ? (
            <li className="nav-btn" onClick={() => paginate(pageNumber - 1)}>
              Prev.
            </li>
          ) : (
            <li className="nav-btn">Prev.</li>
          )}
          {pageNumbers.map((number, index) => {
            return number - 6 <= pageNumber && number + 6 >= pageNumber ? (
              <li
                key={index}
                className={
                  Number(number) === Number(pageNumber)
                    ? "page-btn-red"
                    : "page-btn"
                }
              >
                <span onClick={() => paginate(number)}>{number}</span>
              </li>
            ) : null;
          })}
          {pageNumber < pageNumbers.length ? (
            <li className="nav-btn" onClick={() => paginate(pageNumber + 1)}>
              Next
            </li>
          ) : (
            <li className="nav-btn">Next</li>
          )}
          <li className="nav-btn" onClick={() => paginate(pageNumbers.length)}>
            Last
          </li>
        </ul>
      </nav>
      {/* pagnination under 930px*/}
      <nav className="pagination-930">
        <ul>
          <li className="nav-btn" onClick={() => paginate(1)}>
            First
          </li>
          {pageNumbers.map((number, index) => {
            return number - 1 <= pageNumber && number + 1 >= pageNumber ? (
              <li
                key={index}
                className={
                  Number(number) === Number(pageNumber)
                    ? "page-btn-red"
                    : "page-btn"
                }
              >
                <span onClick={() => paginate(number)}>{number}</span>
              </li>
            ) : null;
          })}
          <li className="nav-btn" onClick={() => paginate(pageNumbers.length)}>
            Last
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
