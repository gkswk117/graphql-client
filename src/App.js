import { BrowserRouter, Routes, Route, } from "react-router-dom"
import Home from "./routes/Home";
import Movies from "./routes/Movies";
import Movie from "./routes/Movie";
import Tweets from "./routes/Tweets";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="/tweets" element={<Tweets />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
