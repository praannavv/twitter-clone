import Notification from "../models/notification.model.js";
export const getNotifications = async (req, res) => {

  try {
    const userId = req.user._id;

    const notification = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({to:userId},{read:true})

    res.status(200).json(notification)
  } catch (error) {
    console.log("error in getNotification function",error.message)
    return res.status(500).json({error:"Internal Server Error"})
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({to:userId})

    res.status(200).json({message:"Notification deleted Successfully"})
  } catch (error) {
    console.log("Error in deleteNotification function",error.message)
    return res.status(500).json({error:"Internal server Error"})
  }
};

export const deleteOneNotification = async(req,res)=>{
    try {
        const userId = req.user._id;

        const notificationId = req.params.id
        const notification = await Notification.findById(notificationId)

        if(!notification){
            return res.status(404).json({error:"notification not found"})
        }

        if(notification.toString() !== userId.toString()){

            return res.status(401).json({error:"You are not allowed to delete this notification"})
        }

        await Notification.findByIdAndDelete(notificationId)
        res.status(200).json({message:"Notification deleted Successfully"})
    } catch (error) {
        console.log("Error in deletedNotification function",error.message)
        res.status(500).json({error:"Internal Server Error"})
        
    }
}