import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const Pagination = ({ pages }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { total, totalPages, currentPage, next, prev, hasNext, hasPrev } =
    pages;
  const formatUrl = (page) => {
    return `/Search?Keyword=${searchParam.get("keyword")}&page=${page}`;
  };
  const clickPage = (e, page) => {
    if (page === "...") return e.preventDefault();
  }
  const renderPagesHTML = (delta = 2) => {
    const pagesHtml = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i > left && i < right)
      ) {
        pagesHtml.push(i);
      } else if (i === left - 1 || i === right + 1) {
        pagesHtml.push("...");
      }

      
    }
    return pagesHtml;
  };
  return (
    <ul className="pagination">
      {hasPrev && (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(prev)}>
            Trang trước
          </Link>
        </li>
      )}
      {renderPagesHTML().map((item, index) => (
        <li onClick={clickPage} className={`page-item ${item === currentPage ? "active" : ""}`}>
          <Link className="page-link" to={formatUrl(item)}>
            {item}
          </Link>
        </li>
      ))}
      {hasNext && (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(next)}>
            Trang sau
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
