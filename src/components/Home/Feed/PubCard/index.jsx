import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useUpdatePostLikesMutation } from "../../../../app/services/posts";
import Avatar from "../../../Avatar";
import timeAgo from "./timeAgo";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaComment,
  FaShare,
} from "react-icons/fa";
import styles from "./PubCard.module.scss";

export default function PubCard({ pub }) {
  const {
    avatar,
    id,
    title,
    description,
    posted,
    image,
    likes,
    username,
    user,
    userid,
  } = pub;
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [disliked, setDisliked] = useState(false);
  const { id: isDetails } = useParams();
  const [updatePostLikes] = useUpdatePostLikesMutation();
  const notInitialRender = useRef(false);

  const handleLikeUpdate = async (likes) => {
    await updatePostLikes({
      id: id,
      post: {
        likes: likes,
      },
    });
  };

  const handleShare = () => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/post/${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copiado al portapapeles!");
  };

  useEffect(() => {
    if (notInitialRender.current) {
      handleLikeUpdate(likesCount);
    } else {
      notInitialRender.current = true;
    }
  }, [likesCount]); // eslint-disable-line

  const handleLike = () => {
    if (disliked) {
      setLikesCount(likesCount + 2);
      setDisliked(false);
      setLiked(true);
    } else if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setLiked(true);
    }
  };

  const handleDislike = () => {
    if (liked) {
      setLikesCount(likesCount - 2);
      setLiked(false);
      setDisliked(true);
    } else if (disliked) {
      setLikesCount(likesCount + 1);
      setDisliked(false);
    } else {
      setLikesCount(likesCount - 1);
      setDisliked(true);
    }
  };


  return (
    <Card body outline className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        {!avatar || !user?.avatar ? (
          <Avatar id={userid || user?.userid} />
        ) : (
          <img
            src={avatar || user?.avatar}
            alt={id}
            className="rounded-circle"
            width="50"
          />
        )}
        <div className={styles.cardHeader__info}>
          <CardTitle>{username || user?.username}</CardTitle>
          <CardText>{timeAgo(posted)}</CardText>
        </div>
      </CardHeader>
      <CardBody className={styles.cardBody}>
        <CardTitle>
          <h3>{title}</h3>
        </CardTitle>
        <CardText>{description}</CardText>
        <CardImg src={image} alt={title} />

        {!isDetails && (
          <div className="btn-group d-flex">
            <Link to={`/post/${id}`} className="btn">
              Ver Mas...
            </Link>
          </div>
        )}
      </CardBody>
      <CardBody className={styles.cardFooter}>
        <FaComment className={styles.comment} />
        <CardText className={styles.likes}>
          <FaArrowAltCircleDown
            className={styles.down}
            onClick={handleDislike}
            style={{ filter: disliked && "grayscale(100%)" }}
          />
          {likesCount}
          <FaArrowAltCircleUp
            className={styles.up}
            onClick={handleLike}
            style={{ filter: liked && "grayscale(100%)" }}
          />
        </CardText>
        <FaShare className={styles.share} onClick={handleShare} />
      </CardBody>
    </Card>
  );
}
