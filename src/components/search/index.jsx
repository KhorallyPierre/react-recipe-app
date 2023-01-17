import './styles.css'


const Search = ()=> {
    return (
        <form className="Search">
            <input name="search" placeholder="Search Recipes" id="search"/>
            <button type="submit"> Search </button>
        </form>
    )
}

export default Search;