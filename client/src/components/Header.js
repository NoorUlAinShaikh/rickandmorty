import React, { useState, useEffect, useRef } from "react";
import {
  fetchEpisode,
  setSelectedSeason,
  setFilteredResults,
} from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { ReactComponent as HeaderSVG } from "../assets/svg/header-svg.svg";
import _ from "lodash";
import history from "../history";
import seasons from "./seasons";
import "../styles/header.css";

const Header = (props) => {
  const [episodes, search] = useSelector((state) => [
    state.episodes,
    state.search,
  ]);
  const dispatch = useDispatch();

  const [headerHt, setHeaderHt] = useState("376");
  const [seasonSelection, setSeasonSelection] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    history.listen(handleURLUpdates);
    history.push("/episodes");
    window.addEventListener("scroll", _.throttle(handleScroll, 400));
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const handleURLUpdates = (location) => {
    if (location.search) {
      const urlArgs = new URLSearchParams(location.search);
      const selectedSeason = urlArgs.get("episode");
      if (seasons.hasOwnProperty(selectedSeason)) {
        setSeasonSelection(selectedSeason);
      }
    } else if (location.pathname.includes("episodes")) {
      setSeasonSelection("All");
    }

    setLoading(false);
  };

  const handleScroll = () => {
    if (window.pageYOffset >= 0 && headerHt !== "250") {
      setHeaderHt("250");
    }
  };

  useEffect(() => {
    if (history.location.pathname.includes("error")) {
      history.goBack();
    }
    if (search.filteredList.length > 0) {
      dispatch(setFilteredResults([]));
    }
    dispatch(setSelectedSeason(seasonSelection));
  }, [seasonSelection]);

  useEffect(() => {
    if (searchValue === "" && search.filteredList.length > 0) {
      dispatch(setFilteredResults([]));
    } else {
      _prepareFilteredList(searchValue.trim());
    }
  }, [searchValue]);

  const handleSearchSelection = (e) => {
    setSeasonSelection(e.target.getAttribute("handle"));

    setLoading(true);
    searchBarRef.current.focus();
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const _prepareFilteredList = _.throttle((currentSearchVal) => {
    if (currentSearchVal !== "") {
      const filteredList = episodes.list.filter(({ name }) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (
        filteredList.length > 0 &&
        !filteredList.some(
          ({ name }) => name.toLowerCase() === searchValue.toLowerCase()
        )
      ) {
        if (history.location.pathname.includes("error")) {
          history.goBack();
        }
        dispatch(setFilteredResults(filteredList));
      }
    }
  }, 500);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue !== "" && seasonSelection) {
      if (
        !(
          history.location.pathname.includes("error") ||
          search.filteredList.some(
            ({ name }) => name.toLowerCase() === searchValue.toLowerCase()
          )
        )
      ) {
        setLoading(true);
        dispatch(
          fetchEpisode(
            searchValue,
            seasonSelection === "All" ? null : seasonSelection
          )
        );
      }
    }
  };

  const renderSearchBar = () => {
    return (
      <div className="input-group">
        <input
          ref={searchBarRef}
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          placeholder="Look for episodes..."
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-danger dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {seasons[seasonSelection]}
          </button>
          <ul className="dropdown-menu">
            {Object.keys(seasons)
              .filter((key) => seasonSelection !== key)
              .map((key) => (
                <li
                  key={key}
                  handle={key}
                  className="dropdown-item"
                  onClick={handleSearchSelection}
                >
                  {seasons[key]}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderHeaderContent = () => {
    return (
      <div
        className="col align-self-center container"
        style={{ position: "absolute" }}
      >
        <div className="row" style={{ paddingBottom: "1.5rem" }}>
          <h1 id="title" className="col-6">
            {`Rick`}
          </h1>
          <h1 id="title" className="col-6">
            {`Morty`}
          </h1>
        </div>
        <div
          className="row justify-content-md-center"
          style={{ marginTop: "1.5rem" }}
        >
          <form
            className="col-lg-8 col-md-8 col-sm-12"
            onSubmit={handleSearchSubmit}
          >
            {renderSearchBar()}
          </form>
        </div>
        <div
          className="row justify-content-md-center"
          style={{ paddingTop: "1.5rem", display: loading ? "flex" : "none" }}
        >
          <div className="col align-self-center text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="row align-items-center"
      style={{
        textAlign: "center",
        position: "sticky",
        top: -10,
        zIndex: "99",
        background: "#111111",
      }}
    >
      {renderHeaderContent()}
      <div style={{ width: "100%" }}>
        <HeaderSVG style={{ height: `${headerHt}px` }} />
      </div>
    </div>
  );
};

export default withRouter(Header);
