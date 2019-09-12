import React from 'react';

const IngredientList = ({
  text
}) => {
  return (
    <li className="ingredient-list-wrapper">
      <div className="ingredient-list">
        <p className="ingredient-text">{text}</p>
      </div> 
    </li>
  )};

export default IngredientList;