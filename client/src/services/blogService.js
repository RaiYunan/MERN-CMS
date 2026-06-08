import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const getAllBlogs  = ()     => API.get("/blogs");
export const deleteBlog  = (id)   => API.delete(`/blog/${id}`);
export const createBlog  = (data) => API.post("/createBlog", data);
export const getSingleBlog = (id) => API.get(`/blog/${id}`);
export const updateBlog  = (id, data) => API.patch(`/blog/${id}`, data);