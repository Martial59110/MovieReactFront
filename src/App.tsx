import { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [filmsData, setFilmsData] = useState(null);
  const [filmData, setFilmData] = useState({ titre: "", dateSortie: "" });
  const [filmToBeChangedData, setFilmToBeChangedData] = useState({ title: "", releaseYear: "" });
  const [acteurData, setActeurData] = useState({
    nom: "",
    prenom: "",
    age: "",
  });
  const [filmId, setFilmId] = useState(0);
  const [acteurId, setActeurId] = useState("");

  const apiBaseUrl = "https://localhost:7249";

  const fetchFilms = () => {
    axios
      .get(`${apiBaseUrl}/movies`)
      .then((response) => setFilmsData(response.data))
      .catch((error) => 
        console.error("Erreur lors de la récupération des films", error)
      );
  };

  const fetchFilm = () => {
    axios
      .get(`${apiBaseUrl}/movies/${filmId}`)
      .then((response) => setFilmToBeChangedData(response.data))
      .catch((error) =>
        console.error(`Erreur lors de la récupération du film ${filmId}`, error)
      );
  };

  const ajouterFilm = () => {
    axios
      .post(`${apiBaseUrl}/movies`, filmData)
      .then((response) => setFilmsData(response.data))
      .catch((error) =>
        console.error("Erreur lors de l'ajout d'un film", error)
      );
  };

  const ajouterActeur = () => {
    axios
      .post(`${apiBaseUrl}/actors`, acteurData)
      .then((response) => setFilmsData(response.data))
      .catch((error) =>
        console.error("Erreur lors de l'ajout d'un acteur", error)
      );
  };

  const modifierFilm = () => {
    axios
      .put(`${apiBaseUrl}/movies/${filmId}`, filmToBeChangedData)
      .then((response) => setFilmToBeChangedData(response.data))
      .catch((error) =>
        console.error("Erreur lors de la modification d'un film", error)
      );
  };

  const supprimerActeur = () => {
    axios
      .delete(`${apiBaseUrl}/acteurs/${acteurId}`)
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
    setFilmToBeChangedData({ ...filmToBeChangedData , [e.target.name]: e.target.value });
  };

  const handleActeurDataChange = (e) => {
    setActeurData({ ...acteurData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Test des Points de Terminaison de l'API Movie !</h1>

      <button onClick={fetchFilms}>Obtenir les 5 permiers Films</button>
      <div>
        <h2>Liste des films récupérés :</h2>
        <pre>{JSON.stringify(filmsData, null, 2)}</pre>
      </div>
      <h3>Récupérer un Film</h3>
      <input
        name="id"
        value={filmId}
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
          value={filmToBeChangedData.releaseYear}
          placeholder="Année de sortie"
          onChange={handleFilmToBeChangedDataChange}
        />
      </div>
      <button onClick={modifierFilm}>Modifier Film</button>

      <h3>Ajouter un Film</h3>
      <input
        name="titre"
        value={filmData.titre}
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
        name="nom"
        value={acteurData.nom}
        onChange={handleActeurDataChange}
        placeholder="Nom"
      />
      <input
        name="prenom"
        value={acteurData.prenom}
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
        value={acteurId}
        onChange={(e) => setActeurId(e.target.value)}
        placeholder="ID de l'acteur"
      />
      <button onClick={supprimerActeur}>Supprimer Acteur</button>
    </div>
  );
}

export default App;
