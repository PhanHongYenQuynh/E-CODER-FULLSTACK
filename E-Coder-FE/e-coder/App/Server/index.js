import axios from "axios";

export const URL = "https://elearning.loca.lt/api";

export const getCourseList = async (level) => {
  const response = await axios.get(`${URL}/course/all/${level}`);
  return response.data;
};

export const getDetailCourse = async (id) => {
  const response = await axios.get(`${URL}/course/detail/${id}`);
  return response.data;
};

export const postErrolCourse = async (idUser, idCourse) => {
  const response = await axios.put(
    `${URL}/course/learn-course/${idUser}/${idCourse}`
  );
  return response.data;
};

export const checkingUser = async (idUser, idCourse) => {
  const response = await axios.get(`${URL}/users/info/${idUser}/${idCourse}`);
  return response.data;
};

export const postLearnChapter = async (email, idChapter) => {
  const response = await axios.put(
    `${URL}/course/learn-chapter/${email}/${idChapter}`
  );
  return response.data;
};

export const getCurrentUser = async (email) => {
  const response = await axios.get(`${URL}/users/userEmail/${email}`);
  return response.data;
};


export const getLeaderTop = async () => {
  const response = await axios.get(`${URL}/course/getLeaderBoard`);
  return response.data;
};

export const getListProgress = async (email) => {
  const response = await axios.get(`${URL}/course/progress/${email}`);
  return response.data;
};

export const signUpApp = async (body) => {
  const response = await axios.post(`${URL}/users`, body);
  return response.data;
};

export const getDetailPoint = async (email) => {
  const response = await axios.get(`${URL}/course/getDetailPoint/${email}`);
  return response.data;
};

export const getInfoByEmail = async (email) => {
  const response = await axios.get(`${URL}/course/getInfoByEmail/${email}`);
  return response.data;
};

export const getSearch = async (textName) => {
  const response = await axios.get(`${URL}/course/search-course/${textName}`);
  return response.data;
};
