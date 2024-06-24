import axios from "axios";
import { axiosInstance } from "./axiosInstance";

// add a notification

export const AddNotification = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/notifications/notify",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all notofivations by user

export const GetAllNotifications = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/notifications/get-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete a notofication
export const DeleteNotifications = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/notifications/delete-notification/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// read all notofications by useer

export const ReadAllNotifications = async () => {
  try {
    const response = await axiosInstance.put(
      "/api/notifications/read-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
