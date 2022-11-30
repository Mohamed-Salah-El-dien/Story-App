import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { storyActions } from "../store/storySlice";

const StoryForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const story = { title, author, genres, body };

    const response = await fetch("/api/stories", {
      method: "POST",
      body: JSON.stringify(story),
      // prettier-ignore
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setAuthor("");
      setGenres("");
      setBody("");
      setError(null);
      setEmptyFields([]);
      dispatch(storyActions.addStory(json));
      navigate("/");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Story</h3>

      <label>Story Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("The title ") ? "error" : ""}
      />

      <label>Author:</label>
      <input
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className={emptyFields.includes("The author ") ? "error" : ""}
      />

      <label>Genres:</label>
      <input
        type="text"
        onChange={(e) => setGenres(e.target.value)}
        value={genres}
        className={emptyFields.includes("The genres ") ? "error" : ""}
      />

      <label>Write your story:</label>
      <textarea
        name="story"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows="10"
        className={emptyFields.includes("The entire story") ? "error" : ""}
      />

      <button>Add Story</button>
      {error && (
        <div className="error">
          {error} : {emptyFields}
        </div>
      )}
    </form>
  );
};

export default StoryForm;
