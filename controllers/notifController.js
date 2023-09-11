import Notification from "../models/Notifications.js";

const notificationsByReceiver = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const notifications = await Notification.find({ receiverId: new mongoose.Types.ObjectId(receiverId) }).populate('senderId');
    res.status(200).json({ data: notifications, status: true });
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