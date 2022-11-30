import { useDispatch } from "react-redux";

import { userActions } from "../store/userSlice";
import { storyActions } from "../store/storySlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    // remove from local storage
    localStorage.removeItem("user");

    // update the store
    dispatch(storyActions.setStories(null));
    dispatch(userActions.setUser(null));
  };
  return { logout };
};
