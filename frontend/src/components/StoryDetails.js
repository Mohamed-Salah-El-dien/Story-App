import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { MdDelete, MdEdit } from "react-icons/md";

import { storyActions } from "../store/storySlice";

const StoryDetails = ({ story }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  // deleting a story
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/stories/" + story._id, {
      method: "DELETE",
      // prettier-ignore
      headers: {
        "Authorization": `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch(storyActions.deleteStory(json));
    }
  };

  // navigating to the edit page
  const handleUpdate = () => {
    dispatch(storyActions.setStory({}));
    navigate(`/update/${story._id}`);
  };

  return (
    <div className="story-details">
      <h4>{story.title}</h4>

      <p>
        <strong>Author: </strong>
        {story.author}
      </p>

      <p>
        <strong>Genres </strong>
        {story.genres}
      </p>

      <p>
        {story.updatedAt
          ? formatDistanceToNow(new Date(story.updatedAt), { addSuffix: true })
          : formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}
      </p>

      <MdDelete
        size={40}
        onClick={handleClick}
        className="delete"
        title="delete"
      />

      <MdEdit
        size={40}
        className="update"
        onClick={handleUpdate}
        title="Edit"
      />

      <div className="story">
        <h5>{story.body}</h5>
      </div>
    </div>
  );
};

export default StoryDetails;
