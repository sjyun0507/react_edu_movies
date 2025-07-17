import './MovieAdd.css'
import {useRef, useState} from "react";

const MovieAdd = ({onCreate}) => {
    const [content, setContent] = useState(''); //영화제목
    const [genre, setGenre] = useState(''); //영화 장르
    const inputRef = useRef();

    const onSubmit = () => {
        if(!content.trim()){ //빈 값 등록시 추가가 안되는 설정
            inputRef.current.focus();
            return;
        }
        if (!genre){
            alert("영화 장르를 선택하세요!")
            return;
        }
        onCreate(content, genre);
        setContent('');
        setGenre('');
    }
    //
    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onSubmit();
        }
    }
    return (
        <div className="MovieAdd">
            <h3>새로운 영화 추가</h3>
            <div className="editor_wrapper">
                <input value={content}
                       ref={inputRef}
                       onChange={(e) => {setContent(e.target.value)}}
                       onKeyDown={onKeyDown}
                       placeholder="new movie ..."/>

                <select value={genre}
                        onChange={(e) => {setGenre(e.target.value)}}
                        onKeyDown={onKeyDown}>
                    <option value="">전체장르</option>
                    <option value="Romance">Romance</option>
                    <option value="Drama">Drama</option>
                    <option value="Action">Action</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Comedy">Comedy</option>
                </select>

                <button onClick={onSubmit}>추가</button>
            </div>
        </div>
    )
}
export default MovieAdd;