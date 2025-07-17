import './App.css'
import Header from "./component/Header.jsx";
import MovieAdd from "./component/MovieAdd.jsx";
import {useEffect, useRef, useState} from "react";
import MovieList from "./component/MovieList.jsx";

function App() {
    const [movies, setMovies] = useState(
        localStorage.getItem("movies") ? JSON.parse(localStorage.getItem("movies")) : []
    );

    const idRef = useRef(movies.length > 0 ? movies[0].id + 1 : 0);

    const onCreate = (content, genre) => {
        const newMovie = {
            id: idRef.current,
            isDone: false,
            content,genre,
            createdDate: new Date().getTime(),
        }
        setMovies([newMovie, ...movies]);
        console.log("영화 추가됨:", content, genre);

        localStorage.setItem("movies", JSON.stringify(movies));
        idRef.current += 1;
    }
    const onUpdate = (targetId) => {
        setMovies(
            movies.map(item => item.id === targetId ? {...item, isDone: !item.isDone} : item)
        );
    }

    const onDelete = (targetId) => {
        setMovies(
            movies.filter(item => item.id !== targetId)
        );
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(movies));
    }, [movies]);

    return (
        <div className="App">
            <Header/>
            <MovieAdd onCreate={onCreate} />
            <MovieList movies={movies} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    )
}

export default App
