import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Home from "../components/Home";
import Post from "../components/Post";
import Edit from "../components/Post/Edit";
import Red from "../components/Red";
import UserProfile from "../components/UserProfile/UserProfile";
import AnotherUser from "../components/UserProfile/AnotherUser";
import EditProfile from "../components/UserProfile/EditProfile/EditProfile";
import SeguidoresScreen from "../components/SeguidorScreen/SeguidoresScreen";
import SeguidoScreen from "../components/SeguidorScreen/SeguidoScreen";

export const DashboardRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/red" element={<Red />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/user/:id" element={<AnotherUser />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/seguidores/:id" element={<SeguidoresScreen />} />
        <Route path="/seguidos/:id" element={<SeguidoScreen />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
};
