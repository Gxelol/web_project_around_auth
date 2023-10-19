import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";

import api from "../utils/api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";

export default function App(props) {
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleUpdateUser(name, about) {
    api.editProfile(name, about).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(avatarLink) {
    api.editProfilePicture(avatarLink).then((data) => {
      setCurrentUser({ ...currentUser, avatar: data.avatar });
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit(cardName, cardLink) {
    api.addNewCard(cardName, cardLink).then((newCard) => {
      setCards([newCard, ...cards]);
    });
    closeAllPopups();
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id);
    setCards((state) => state.filter((c) => c._id !== card._id));
  }

  useEffect(() => {
    api.getServerCards().then((card) => {
      setCards(card);
    });

    api.getUserInfo().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <div
          className={`container__semitransparent 
        ${
          isImagePopupOpen ||
          isEditAvatarPopupOpen ||
          isEditProfilePopupOpen ||
          isAddPlacePopupOpen
            ? "container__semitransparent_active"
            : ""
        }`}
        ></div>

        <div className="page">
          <Header />

          <Routes>
            <Route path="/signin" element={<Login />}></Route>
            <Route path="/signup" element={<Register />}></Route>
            <Route
              path="/home"
              element={
                <Main
                  currentUser={currentUser}
                  cards={cards}
                  onEditProfileClick={handleEditProfileClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  isAddPlacePopupClick={handleAddPlaceClick}
                  handleCardLike={handleCardLike}
                  handleDeleteCard={handleDeleteCard}
                  onCardClick={handleCardClick}
                />
              }
            ></Route>
            <Route
              exact path="/"
              element={
                <Navigate to="/signin" />
              }
            ></Route>
          </Routes>
          
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
