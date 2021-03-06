import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserQuery,
  useUpdateMutation,
} from "../../../app/services/users";
import toast from "react-hot-toast";
import { uploadImage } from "../../../app/services/images";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [updateProfile] = useUpdateMutation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { data: userData } = useGetUserQuery(user.id);

  const [username, setUsername] = useState(userData.username);
  const [nickname, setNickname] = useState(userData.nickname);
  const [avatar, setAvatar] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(userData.avatar);
  const [bgImageUrl, setBgImageUrl] = useState(userData.backgroundImage);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.files[0]);
  const handleBgImageChange = (e) => setBgImage(e.target.files[0]);

  useEffect(() => {
    async function getImageUrl() {
      if (avatar) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(avatar);
        fileReader.onload = () => {
          setAvatarUrl(fileReader.result);
        };
      }
    }
    getImageUrl();
  }, [avatar]);

  useEffect(() => {
    async function getImageUrl() {
      if (bgImage) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(bgImage);
        fileReader.onload = () => {
          setBgImageUrl(fileReader.result);
        };
      }
    }
    getImageUrl();
  }, [bgImage]);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!username || !nickname) return;

    const creatingToast = toast.loading("Guardando informacion...");

    const avatarURI = avatar ? await uploadImage(avatar) : avatarUrl;
    const bgImageURI = bgImage ? await uploadImage(bgImage) : bgImageUrl;

    const profileUpdated = {
      id: userData.id,
      username,
      nickname,
      avatar: avatarURI,
      backgroundImage: bgImageURI,
    };
    const res = await updateProfile(profileUpdated);
    toast.dismiss(creatingToast);
    if (res.data.ok) {
      toast.success("Perfil editado correctamente");
      navigate(`/user`);
      window.location.reload(false);
    } else {
      toast.error("Error al editar perfil");
    }
  };

  return (
    <div className="container bg-white mt-3 rounded-3 p-2">
      <h1 className="text-dark">Editar tu informacion</h1>
      <form className="form-group" onSubmit={handleSubmitEdit}>
        <div className="row">
          <div className="mb-3 input-group d-flex flex-column col-4 w-50 ">
            <img
              src={bgImageUrl}
              alt=""
              style={{ width: "15rem", aspectRatio: "1", objectFit: "cover" }}
            />

            <label htmlFor="filebgid" className="text-dark mx-3 w-100 my-2">
              Imagen de portada
            </label>
            <input
              className="form-control mb-1 w-100"
              id="filebgid"
              name="filebgid"
              type="file"
              accept="image/*"
              onChange={handleBgImageChange}
            />
          </div>
          <div className="mb-3 input-group  d-flex flex-column col-4 w-50 justify-content-between ">
            <img
              className="rounded-pill"
              src={avatarUrl}
              alt=""
              style={{
                width: "15rem",
                aspectRatio: "1",
                objectFit: "cover",
              }}
            />
            <label htmlFor="fileAvatarid" className="text-dark mx-3 w-100 my-2">
              Avatar
            </label>
            <input
              className="form-control mb-1 w-100"
              id="fileAvatarid"
              name="fileAvatarid"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="username"
            placeholder={userData.username}
            value={username}
            id="username"
            type="text"
            onChange={handleUsernameChange}
            required
          />
          <label htmlFor="title" className="text-white">
            Usuario
          </label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            name="nickname"
            placeholder={userData.nickname}
            value={nickname}
            id="nickname"
            onChange={handleNicknameChange}
            required
          ></textarea>
          <label htmlFor="title" className="text-white">
            Nickname
          </label>
        </div>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => navigate("/user")}
          >
            Cancelar
          </button>
          <button className="btn btn-success" type="submit">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
