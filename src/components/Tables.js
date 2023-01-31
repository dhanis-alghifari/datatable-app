import React, { useState, useEffect, useCallback } from "react";
import { getAllPosts } from "../api";
import ReactPaginate from "react-paginate";
import Select from "react-dropdown-select";
import Loader from "./Loader";

const Tables = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");

  const dataEntry = [5, 10, 15, 20, 25];
  const [selectEntry, setSelectEntry] = useState(5);
  const items = dataEntry?.map((item) => {
    const data = {};
    data.label = item;
    data.value = item;
    return data;
  });

  const getPosts = useCallback(() => {
    setLoading(true);
    getAllPosts(
      `/search?q=${search}&limit=${
        selectEntry.value ? selectEntry.value : selectEntry
      }&skip=${pageNumber}`
    ).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        var tempList = [];
        tempList = res.data.posts;
        setData(tempList);
        setTotalData(res.data.total);
      }
    });
  }, [search, pageNumber, selectEntry]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);
  
  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-black"
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="flex max-w-full flex-grow flex-1">
            <Select
              placeholder="5"
              className={"w-1/3"}
              options={items}
              hideSelectedOptions={false}
              onChange={(selected) => setSelectEntry(selected[0])}
            />
            <h3 className="mt-1 ml-3 text-slate-500">: entries per page</h3>
          </div>
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
        </div>
      </div>
      <table className="divide-y divide-gray-300 mt-6 w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-2 text-xs text-gray-500">No</th>
            <th className="px-6 py-2 text-xs text-gray-500">Title</th>
            <th className="px-6 py-2 text-xs text-gray-500">Body</th>
            <th className="px-6 py-2 text-xs text-gray-500">Tags</th>
            <th className="px-6 py-2 text-xs text-gray-500">Reaction</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y ">
          
          {data?.map((item, index) => (
            <tr key={index} className="">
              
              <td className="max-w-sm px-6 py-4 text-sm text-center text-gray-500">
                {index + 1}
              </td>
              <td className="max-w-sm px-6 py-4 text-center">
                <div className="text-sm text-gray-500">{item.title}</div>
              </td>
              <td className="max-w-sm px-6 py-4 text-sm text-gray-500">
                {item.body}
              </td>
              <td className="max-w-sm px-6 py-4 text-sm text-center text-gray-500">
                {item?.tags
                  ? item?.tags.map((i, idx) => <p key={idx}>{i}</p>)
                  : "-"}
              </td>
              <td className="max-w-sm px-6 py-4 text-sm text-center text-gray-500">
                {item.reactions}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Loader loading={loading} data={data} />
      <div
        className={`grid justify-items-center mt-10 ${
          data.length < 1 ? "hidden" : ""
        }`}
      >
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={totalData}
          onPageChange={(pageSelected) => {
            setPageNumber(pageSelected.selected + 1);
          }}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
};

export default Tables;
