import ReactPaginate from "react-paginate";
import styles from "./index.module.css";

const Pagination = ({ handlePageClick, pageCount }) => {
  return (
    <div className={styles.pagination}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default Pagination;
