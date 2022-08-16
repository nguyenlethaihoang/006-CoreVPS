import React, { useState } from "react";
// import "./styles.css";
import SearchBar from "material-ui-search-bar";
// import styled from "styled-components";



function Search_Custom() {

    return (
        <div>
          <SearchBar
            onChange={() => console.log("onChange")}
            onRequestSearch={() => console.log("onRequestSearch")}
            style={{
              margin: "0 auto",
              maxWidth: 800
            }}
        />
        </div>
    )
}

export default Search_Custom