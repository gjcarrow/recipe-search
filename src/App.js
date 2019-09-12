import React, {useEffect, useState} from 'react'
import './App.css'
import Recipe from './Components/Recipe'
import BackgroundImage from './images/pl.png';
import Loading from "./Components/Loading";
import Greeting from "./Components/Greeting";

const App = ()=>{
  
  const [searchTerm, setSearchTerm] = useState('')
  const [queryTerm, setQueryTerm] = useState('')
  const [recipes, setRecipes] = useState([])
  const [moreResults, setMoreResults] = useState(false)
  const [currentTo, setCurrentTo] = useState(10)
  const [currentFrom, setCurrentFrom] = useState(0)
  const [loading, setLoading] = useState(false)
  
  const divStyle = {
    // backgroundColor: '#93906a',
    backgroundColor: '#2A2024',
    backgroundImage: 'url(' + BackgroundImage + ')',
    backgroundRepeat: 'repeat'
  }
  
  
  useEffect(()=>{
    const getRecipes = async ()=>{
      const APP_ID = process.env.REACT_APP_RECIPE_ID
      const APP_KEY = process.env.REACT_APP_RECIPE_APIKEY
      let API_BASE = `https://api.edamam.com/search?q=${queryTerm}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${currentFrom}&to=${currentTo}`
      const response = await fetch(API_BASE)
      const data = await response.json()
      setRecipes([...recipes, ...data.hits])
      setLoading(false)
      setMoreResults(data.more)
    }
    getRecipes()
  }, [queryTerm, currentTo])

  const handleSubmit = (e)=>{
    e.preventDefault()
    let theValue = document.querySelector("#search_bar").value
    if(theValue.trim() === '') { return }
    setCurrentTo(10)
    setCurrentFrom(0)
    setMoreResults(false)
    setRecipes([])
    setQueryTerm(searchTerm)
    setLoading(true)
    setSearchTerm('')
  }
  const loadMoreResults = (e)=>{
    setLoading(true)
    setCurrentTo(currentTo+10)
    setCurrentFrom(currentFrom+10)
  }
  const handleChange = e=>{
    const searchInputValue = e.target.value
    setSearchTerm(searchInputValue)
  }

  return (
    <div style={divStyle} className='App'>
      <form className='search-form' name='recipe_form' onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className='search-bar'
          id='search_bar'
          name='search_bar'
          value={searchTerm}
          type='text'
           />
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className="seperate-section">
        {(!recipes.length && !loading) && <Greeting /> }
      </div>
      <div className="recipe-data">
        {recipes.map((recipe,i)=> (
          <Recipe
          key={recipe.recipe.label + String(i)}
          label={recipe.recipe.label}
          image={recipe.recipe.image}
          calories={recipe.recipe.calories}
          ingredients={recipe.recipe.ingredientLines}
          preperation_url={recipe.recipe.url}
          />
          ))}
      </div>
      {loading && <Loading />}
      {moreResults && (<button onClick={loadMoreResults} className="load-more-btn">Load More</button>)}
    </div>
  )
}

export default App
