function Pagination({ handleForwardPage, handleBackwardPage, page }) {
  return (
    <div className="bg-gray-500 p-4 mt-8 flex justify-center items-center gap-10 ">
      <div onClick={handleBackwardPage}>
        <i className="fa-solid fa-arrow-left  hover:cursor-pointer"></i>{" "}
      </div>

      <div className="font-bold">{page}</div>

      <div onClick={handleForwardPage}>
        <i className="fa-solid fa-arrow-right  hover:cursor-pointer"></i>
      </div>
    </div>
  );
}

export default Pagination;
