import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const UploadPhoto = async (photo: any): Promise<string | null> => {
  try {
    // Create a reference to the location where we'll store the file
    const storageRef = ref(storage, "photos/" + Date.now() + ".jpeg");
    await uploadBytes(storageRef, photo);
    // Get the download URL for the file
    const url = await getDownloadURL(storageRef);
    console.log("success??", url);
    return url;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export default UploadPhoto;
