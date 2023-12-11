import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends (state, action) {
            if (state.user) {
                state.user.friends = action.payload.friends;
            }
            else {
                console.log("user doesn't exist, so how can friens exist ?");
            }
        }
        ,
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) { // check here i think it should be like this
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

//now in order to export and expose these reducer funtions:-
const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = AuthSlice.actions;

export default AuthSlice.reducer;