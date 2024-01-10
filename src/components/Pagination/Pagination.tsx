import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'

type Selected = {
  selected: number
}

type PaginationProps = {
  setOffset: Function,
  setEndOffset: Function,
  itemsPerPage: number,
  pageCount: number,
  totalRecordLength: number
}

const Pagination = ({
  setOffset, 
  setEndOffset, 
  itemsPerPage,
  pageCount,
  totalRecordLength
}: PaginationProps): React.ReactNode => {

  const handlePageClick = (event: Selected): void => {
    const newOffset: number = (event.selected * itemsPerPage) % totalRecordLength;
    const newEndOffset: number = newOffset + itemsPerPage
    setOffset(newOffset)
    setEndOffset(newEndOffset)
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <ReactPaginate
          className="pagination text-white"
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Prev"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default Pagination
