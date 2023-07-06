import React, {useState} from "react";
import "./Pagination.css";

const Pagination = ({
  users,
  totalUsers,
  usersPerPage,
  setCurrentPage,
  currentpage,
}) => {

  //adding  users per page according to api end point 
  //per page user records must show 10
  let pages = [];
  let totalPages = Math.ceil(totalUsers / usersPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
 

  //clicking on previous button it should go to previous page
  const handlePrevPage = () => {
    if (currentpage !== 1) setCurrentPage(currentpage - 1);
  };


  //clicking on next  button it should go to next page page
  const handleNextPage = () => {
    if (currentpage !== totalPages) setCurrentPage(currentpage + 1);
  };


  //clicking on first page button '<<' it should show first page users
  const handleFirstPage = () => {
    if (currentpage !== 1) setCurrentPage(1);
  };


  //clicking on last page users '<<' it should show last page users
  const handleLastPage = () => {
    if (currentpage !== totalPages) setCurrentPage(totalPages);
  };


  //adding entity names for first page, last page, next page, previous page
  //first page - &laquo;
  //last page - &raquo;
  //previous page - &#8249;
  //next page - &#8250;
  //also seting disabled attribute when we reached based on clicking the buttons
  return (
    <div className="pagination">
      <button onClick={handleFirstPage} disabled={currentpage === 1}>
        &laquo;
      </button>
      <button onClick={handlePrevPage} disabled={currentpage === 1}>
        &#8249;
      </button>
      {pages.map((page, id) => {
        return (
          <div key={id}>
            <button
              key={id}
              onClick={() => setCurrentPage(page)}
              className={page == currentpage ? "active" : ""}
            >
              {page}
            </button>
          </div>
        );
      })}
      <button onClick={handleNextPage} disabled={currentpage === totalPages}>
        &#8250;
      </button>
      <button onClick={handleLastPage} disabled={currentpage === totalPages}>
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;


