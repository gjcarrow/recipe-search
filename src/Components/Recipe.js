import React from 'react';
import IngredientList from './IngredientList'
import style from '../recipe.module.css'

const Recipe = ({label, image, ingredients, calories, preperation_url}) => {
  return(
  <div className={style.recipe}>
    <h1 className={style.cardTitle}>{label}</h1>
    <div className="card-content-image">
      <div className="card-image-case">
        <img className="card-image"src={image} alt={label} />
      </div>
    </div>
    <span className="calories">{Math.round(calories)} calories</span>
    <div className="card-info ingredient-info">
        <ol>
        {ingredients.map((ingredient,i)=>{
          return (
            <IngredientList 
            key={ingredient + (String(i))}
            text={ingredient}
            />
            )
          })
        }
        </ol>
      </div>
      <a className={style.prepBtn} href={preperation_url} rel="noreferrer noopener" target="_blank">How to prepare</a>
    </div>
  )
};

export default Recipe;