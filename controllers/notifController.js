import Notification from "../models/Notifications.js";
import mongoose from "mongoose";

const notificationsByReceiver = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const notifications = await Notification.find({ receiverId: new mongoose.Types.ObjectId(receiverId) }).populate('senderId');
    let sortedNotifs = []
    if(notifications.length > 0){
      sortedNotifs = notifications.sort((a, b) => b.createdAt - a.createdAt);
    }
    res.status(200).json({ data: sortedNotifs, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res
      .status(200)
      .json({ msg: "Notificación creada correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

export { createNotification, notificationsByReceiver };