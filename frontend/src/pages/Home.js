import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { storyActions } from "../store/storySlice";
import StoryDetails from "../components/StoryDetails";

const Home = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.data);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchStories = async () => {
      const response = await fetch("/api/stories", {
        // prettier-ignore
        headers: { "Authorization": `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (!response.ok) {
        console.log("no response from api/stories");
      }
      if (response.ok) {
        dispatch(storyActions.setStories(json));
      }
    };

    if (user) {
      fetchStories();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="stories">
        {stories &&
          stories.map((story) => (
            <StoryDetails story={story} key={story._id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
