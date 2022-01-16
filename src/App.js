import logo from "./tourbillon.png";
import "./App.css";

import { useState } from "react";

import AddButton from "./Components/AddButton";
import LinkList from "./Components/LinkList";
import SearchBar from "./Components/SearchBar";

export default function App() {
  // Getting the state of "links" from the user brower (aka localStorage)
  const storedLinks = localStorage.getItem("links");

  // const parsedLinks = if( storedLinks === "" || storedLinks === null ){
  // return []}
  // else return JSON.parse(storedLinks)
  const parsedLinks =
    storedLinks === "" || storedLinks === null ? [] : JSON.parse(storedLinks);

  // const [links, setLinks] = useState( if( Array.isArray(parsedLinks) === true ){
  // return parsedLinks}
  // else return []
  const [links, setLinks] = useState(
    Array.isArray(parsedLinks) ? parsedLinks : []
  );

  // The state of "search" set default as ""
  const [search, setSearch] = useState("");

  // Changing state of setSearch
  const onSearchBarChange = (search) => {
    setSearch(search);
  };

  // Take the key words and return filtered list of links
  const filteredLinks = (search) => {
    const lowerSearch = search.toLowerCase();
    return links.filter((link) => {
      return (
        link.name.toLowerCase().indexOf(lowerSearch) > -1 ||
        link.url.toLowerCase().indexOf(lowerSearch) > -1 ||
        link.tags
          .map((tag) => {
            return tag.name.toLowerCase().indexOf(lowerSearch) > -1;
          })
          .indexOf(true) > -1
      );
    });
  };

  // Called inside AddButton Component as props
  const onAddButtonAddLink = (name, url, tags) => {
    const newLinks = links.concat([
      {
        name,
        url,
        tags,
      },
    ]);
    setLinks(newLinks);
    localStorage.setItem("links", JSON.stringify(newLinks));
  };

  // Called inside LinkList Component as props
  const onDeleteLinkButton = (index) => {
    links.splice(index, 1);
    let newLink = [...links];
    setLinks(newLink);
    localStorage.setItem("links", JSON.stringify(newLink));
  };

  // JSX format inside HTML codes i.e.{links.length}
  // Below is the whole page structure
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 left-panel centered">
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <h1>
            {" "}
            THE <b>WATCH</b> LIST
          </h1>
          <br />
          <p> WATCHES # {links.length}</p>
          <AddButton onAddLinkProps={onAddButtonAddLink} />
        </div>
        <div className="col-8 right-panel centered">
          <h4>SEARCH WATCH :</h4>
          <SearchBar onSearchChangeProp={onSearchBarChange} />
          <h3>WATCH LIST: {search}</h3>
          <LinkList
            links={filteredLinks(search)}
            onDeleteLinkButton={onDeleteLinkButton}
          />
        </div>
      </div>
    </div>
  );
}
