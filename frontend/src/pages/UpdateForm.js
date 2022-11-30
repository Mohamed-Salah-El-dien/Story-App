import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { storyActions } from "../store/storySlice";

const UpdateForm = () => {
  const { id } = useParams();

  // fetching the the target story from the redux store
  const target = useSelector((state) => state.story.story);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetch the targeted story and despatching it to the store
  useEffect(() => {
    const fetchStory = async () => {
      const response = await fetch(`/api/stories/${id}`, {
        // prettier-ignore
        headers: {"Authorization": `Bearer ${user.token}`},
      });
      const json = await response.json();
      if (response.ok) {
        dispatch(storyActions.setStory(json));
      }
    };

    fetchStory();
  }, [dispatch]);

  // updating the fields from the fetched target
  useEffect(() => {
    setTitle(target.title);
    setAuthor(target.author);
    setGenres(target.genres);
    setBody(target.body);
  }, [target]);

  // updating the story
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("you must be logged in");
      return;
    }

    const story = { title, author, genres, body };

    const response = await fetch(`/api/stories/${id}`, {
      method: "PATCH",
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
      setError(null);
      setEmptyFields([]);
      navigate("/");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Update your Story</h3>

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

      <button>Update the Story</button>
      {error && (
        <div className="error">
          {error} : {emptyFields}
        </div>
      )}
    </form>
  );
};

export default UpdateForm;
