import { AnyAction, combineReducers } from "redux"
import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';
import { IUser } from "../interface/user";
import { IPost } from "../interface/post";


interface State {
  user: IUser;
  post: IPost;
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
    switch (action.type) {
      case HYDRATE:
        return action.payload;
  
      default: {
        const combineReducer = combineReducers({
          user,
          post,
        });
        return combineReducer(state, action);
      }
    }
};

export default rootReducer;