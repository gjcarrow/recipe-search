import React from "react";
import loadingGif from "../images/loading.svg";

const Loading = (props) => (
      <div className='loading loader'>
        <h4>Recipes Loading ...</h4>
        <div className="loading-gif">
          <img src={loadingGif} alt="loading recipies" />
        </div>
      </div>
  );

export default Loading;