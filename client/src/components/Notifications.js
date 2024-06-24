import { Modal, message } from "antd";
import React from "react";
import Divider from "./Divider";
import { useNavigate } from "react-router-dom";
import  moment  from "moment";
import { DeleteNotifications } from "../apicalls/notifications";
import { SetLoader } from "../redux/loadersSlice";
import { useDispatch } from "react-redux";

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const deleteNotification=async(id)=>{
    dispatch(SetLoader(true));
    try {
        const response=await DeleteNotifications(id);
        dispatch(SetLoader(false));
        if(response.success)
            {message.success(response.message);
                reloadNotifications();
            }
            else{
                throw new Error(response.message);
            }
    } catch (error) {
        dispatch(SetLoader(false));
        message.error(error.message);

    }
  }
  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            className="flex flex-col gap-2 items-center border border-solid p-2 border-gray-300 rounded cursor-pointer"
            key={notification._id}
            
          >
            <div className="flex justify-between items-center w-full">
              <div 
              onClick={() => {
                navigate(notification.onClick);
                setShowNotifications(false);
              }}
              >
                <h1 className="text-gray-700">{notification.title}</h1>
                <span className="text-gray-500 cursor-pointer">
                  {notification.message}
                </span>
                <h3 className="text-gray-500 text-sm">
                    {moment(notification.createdAt).fromNow()}
                </h3>
              </div>
              <i
                className="ri-delete-bin-line"
                onClick={() => {
                  deleteNotification(notification._id);
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
