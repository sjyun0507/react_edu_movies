import './MovieList.css'
import {useState} from "react";
import MovieItem from "./MovieItem.jsx";

const MovieList = ({movies, onUpdate, onDelete}) => {
    const [search, setSearch] = useState('');
    const [selectedGenres, setSelectedGenres] = useState('');

    const getSearchResult = () => {
        return movies.filter(item => {
            const matchesSearch = search === "" || item.content.includes(search);
            const matchesGenre = selectedGenres === "" || item.genre === selectedGenres;
            return matchesSearch && matchesGenre;
        });
    };
    console.log(movies)
    return (
        <div className="MovieList">
            <h3>영화 목록 </h3>
            <div className="editor_wrapper">
                <input className="searchbar"
                       value={search}
                       onChange={(e) => {
                           setSearch(e.target.value)
                       }}
                       placeholder="search movie..."/>
                <select className="genre"
                        value={selectedGenres}
                        onChange={(e) => {
                            setSelectedGenres(e.target.value)
                        }}>
                    <option value="">전체장르</option>
                    <option value="Romance">Romance</option>
                    <option value="Drama">Drama</option>
                    <option value="Action">Action</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Comedy">Comedy</option>
                </select>
            </div>
            <div className="list_wrapper">
                {
                    getSearchResult().length === 0 ? (<p style={{marginTop : '20px'}}>영화 컬렉션이 비어 있습니다.</p>) :
                        ( getSearchResult().map(
                        it => <MovieItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
                            )
                    )
                }
            </div>
        </div>
    )
}

export default MovieList;