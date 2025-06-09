import admin from "firebase-admin";

const decodedJson = Buffer.from(process.env.FIREBASE_KEY_BASE64, "base64").toString("utf-8");
const serviceAccount = JSON.parse(decodedJson);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
