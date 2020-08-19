import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEpisodes, fetchSeason } from "../actions/index";
import { Episode } from "../components/Episode";
import seasons from "./seasons";

const EpisodesList = () => {
  const [episodes, search] = useSelector(({ episodes, search }) => [
    episodes,
    search,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.selectedSeason) {
      if (search.selectedSeason === "All") {
        dispatch(fetchAllEpisodes());
      } else {
        dispatch(fetchSeason(search.selectedSeason));
      }
    }
  }, [search.selectedSeason]);

  const handlePagination = (e) => {
    let pageArgs = null;

    if (e.currentTarget.getAttribute("butt") === "next") {
      pageArgs = new URLSearchParams(new URL(episodes.info.next).search).get(
        "page"
      );
    } else if (e.currentTarget.getAttribute("butt") === "prev") {
      pageArgs = new URLSearchParams(new URL(episodes.info.prev).search).get(
        "page"
      );
    }
    if (pageArgs) {
      dispatch(fetchAllEpisodes(pageArgs));
    }
  };

  return (
    <div
      className="row align-items-start container-fluid"
      style={{ paddingRight: "0px " }}
    >
      <div
        className="row"
        style={{
          marginTop: ".3rem",
          padding: ".4rem",
          position: "sticky",
          top: "250px",
          backdropFilter: "blur(13px)",
          opacity: "0.8",
          background: "#111111",
          fontWeight: "bold",
          color: "red",
          zIndex: "99",
        }}
      >
        <div className="col">{seasons[search.selectedSeason]}</div>
        {episodes.info.pages > 1 ? (
          <div className="btn-group btn-group-sm">
            <button
              className={`btn btn${
                episodes.info.prev ? "" : "-outline"
              }-danger`}
              disabled={episodes.info.prev ? false : true}
              butt="prev"
              onClick={handlePagination}
            >
              &laquo;
            </button>
            <button
              className={`btn btn${
                episodes.info.next ? "" : "-outline"
              }-danger`}
              disabled={episodes.info.next ? false : true}
              butt="next"
              onClick={handlePagination}
            >
              &raquo;
            </button>
          </div>
        ) : null}
      </div>
      <div className="row align-items-center" style={{ marginTop: "1.5rem" }}>
        {(search.filteredList.length > 0
          ? search.filteredList
          : episodes.list
        ).map((ep) => {
          return (
            <div
              key={ep.id}
              className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
              style={{ minWidth: "300px" }}
            >
              <Episode ep={ep} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EpisodesList;
