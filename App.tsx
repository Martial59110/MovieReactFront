import { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [filmsData, setFilmsData] = useState(null);
  const [sortOrder, setSortOrder] = useState("recent");
  const [filmData, setFilmData] = useState({ title: "", dateSortie: "" });
  const [filmToBeChangedData, setFilmToBeChangedData] = useState({ title: "", releaseYear: "" });
  const [acteurData, setActeurData] = useState({
    lastName: "",
    firstName: "",
    age: "",
  });
  const [movie_id, setFilmId] = useState(0);
  const [acteur_id, setActeurId] = useState("");

  const apiBaseUrl = "https://localhost:7249";

  const fetchFilms = () => {
    axios
      .get(`${apiBaseUrl}/movies`)
      .then((response) => setFilmsData(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des films", error)
      );
  };
  const fetchFilmsSorted = () => {
    axios
      .get(`${apiBaseUrl}/movies?sort=${sortOrder}`)
      .then((response) => setFilmsData(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des films triés", error)
      );
  };
  const fetchFilm = () => {
    axios
      .get(`${apiBaseUrl}/movies/${movie_id}`)
      .then((response) => setFilmToBeChangedData(response.data))
      .catch((error) =>
        console.error(`Erreur lors de la récupération du film ${movie_id}`, error)
      );
  };

  const ajouterFilm = () => {
    const newMovieData = {
      title: filmData.title,
      releaseYear: filmData.dateSortie,
    };

    axios
      .post(`${apiBaseUrl}/movies`, newMovieData)
      .then((response) => setFilmsData(response.data))
      .catch((error) =>
        console.error("Erreur lors de l'ajout d'un film", error)
      );
  };

  const ajouterActeur = () => {
    // Créez les données de l'acteur avec seulement l'année de naissance
    const newActorData = {
      lastName: acteurData.lastName,
      firstName: acteurData.firstName,
      age: parseInt(acteurData.age), // Envoyez l'âge (année) comme un nombre
    };
  
    axios
      .post(`${apiBaseUrl}/actors`, newActorData)
      .then((response) => setFilmsData(response.data))
      .catch((error) =>
        console.error("Erreur lors de l'ajout d'un acteur", error)
      );
  };

  const modifierFilm = () => {
    axios
      .put(`${apiBaseUrl}/movies/${movie_id}`, filmToBeChangedData)
      .then((response) => setFilmToBeChangedData(response.data))
      .catch((error) =>
        console.error("Erreur lors de la modification d'un film", error)
      );
  };

  const supprimerActeur = () => {
    axios
      .delete(`${apiBaseUrl}/acteurs/${acteur_id}`)
      .then((response) => setFilmsData(response.data))
      .catch((error) =>
        console.error("Erreur lors de la suppression d'un acteur", error)
      );
  };

  // Gestion des changements de champs
  const handleFilmDataChange = (e) => {
    setFilmData({ ...filmData, [e.target.name]: e.target.value });
  };

  const handleFilmToBeChangedDataChange = (e) => {
    setFilmToBeChangedData({ ...filmToBeChangedData, [e.target.name]: e.target.value });
  };

  const handleActeurDataChange = (e) => {
    setActeurData({ ...acteurData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Test des Points de Terminaison de l'API Movie !</h1>

      <button onClick={fetchFilms}>Obtenir les 5 permiers Films</button>
      <button onClick={fetchFilmsSorted}>Obtenir les Films Triés</button>
      <label htmlFor="sortOrder">Trier par :</label>
      <select
        id="sortOrder"
        name="sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="recent">Plus Récent</option>
        <option value="oldest">Plus Ancien</option>
      </select>
      <div>
        <h2>Liste des films récupérés :</h2>
        <pre>{JSON.stringify(filmsData, null, 2)}</pre>
      </div>
      <h3>Récupérer un Film</h3>
      <input
        name="id"
        value={movie_id}
        onChange={(e) => setFilmId(e.target.value)}
        placeholder="Identifiant du film"
      />
      <button onClick={fetchFilm}>Obtenir le film</button>
      <div>
        <h2>Le film récupéré :</h2>
        {/* <pre>{JSON.stringify(filmData, null, 2)}</pre> */}
        <input
          name="title"
          value={filmToBeChangedData.title}
          placeholder="Titre du film à modifier"
          onChange={handleFilmToBeChangedDataChange}
        />
        <input
          name="releaseYear"
          value={filmToBeChangedData.releaseYear}
          placeholder="Année de sortie"
          onChange={handleFilmToBeChangedDataChange}
        />
      </div>
      <button onClick={modifierFilm}>Modifier Film</button>

      <h3>Ajouter un Film</h3>
      <input
        name="title"
        value={filmData.title}
        onChange={handleFilmDataChange}
        placeholder="Titre du film"
      />
      <input
        name="dateSortie"
        value={filmData.dateSortie}
        onChange={handleFilmDataChange}
        placeholder="Date de sortie"
      />
      <button onClick={ajouterFilm}>Ajouter Film</button>

      <h3>Ajouter un Acteur</h3>
      <input
        name="lastName"
        value={acteurData.lastName}
        onChange={handleActeurDataChange}
        placeholder="Nom"
      />
      <input
        name="firstName"
        value={acteurData.firstName}
        onChange={handleActeurDataChange}
        placeholder="Prénom"
      />
      <input
        name="age"
        value={acteurData.age}
        onChange={handleActeurDataChange}
        placeholder="Âge"
      />
      <button onClick={ajouterActeur}>Ajouter Acteur</button>

      <h3>Supprimer un Acteur</h3>
      <input
        value={acteur_id}
        onChange={(e) => setActeurId(e.target.value)}
        placeholder="ID de l'acteur"
      />
      <button onClick={supprimerActeur}>Supprimer Acteur</button>
    </div>
  );
}

export default App;