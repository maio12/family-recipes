export const Searchbar = () => {
    return (
        <form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden">Search recipes by name</span>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Search recipes by name"
                name="s" 
            />
            <button type="submit">Search</button>
        </form>
    )
}