
import admin from 'firebase-admin';

const sendNotif = async (req, res) => {
    const { token, mensaje, titulo } = req.body;

    const message = {
        notification: {
          title: titulo,
          body: mensaje,
        },
        token: token
    };
  
    try {
      await admin.messaging().send(message);
      res.json({ success: true });
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
      res.status(500).json({ error: 'Error al enviar la notificación' });
    }
}


export {
    sendNotif
}