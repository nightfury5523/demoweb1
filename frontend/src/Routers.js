import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./main/Admin";
import SignIn from "./main/Auth/SignIn";
import SignUp from "./main/Auth/SignUp";
import PostsCreate from "./main/Posts/PostsCreate";
import PostsView from "./main/Posts/PostsView";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<PostsCreate />} />
        </Route>
        <Route path="/admin">
          <Route
            index
            element={
              <Suspense fallback={"Đang tải..."}>
                <Admin />
              </Suspense>
            }
          />
        </Route>
        <Route path="/posts">
          {/* <Route index element={<Posts />} /> */}
          <Route path="create" element={<PostsCreate />} />
          {/* <Route path=":id" element={<PostsUpdate />} /> */}
          <Route
            path="view/:id"
            element={
              <Suspense fallback={"Đang tải..."}>
                <PostsView />
              </Suspense>
            }
          />
        </Route>
        <Route path="/sign-in">
          <Route index element={<SignIn />} />
        </Route>
        <Route path="/sign-up">
          <Route index element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
