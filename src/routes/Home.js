import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div>
            <li><Link to="/tweets">Tweets</Link></li>
            <li><Link to="/movies">Movies</Link></li>
        </div>
    )
}