import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const uploadPhoto = async (photo: string): Promise<string | null> => {
  try {
    // Create a reference to the location where we'll store the file
    const storageRef = ref(storage, "photos/" + Date.now() + ".jpeg");

    // Convert the photo to a Blob and upload it
    const response = await fetch(photo);
    const blob = await response.blob();
    await uploadBytes(storageRef, blob);

    // Get the download URL for the file
    const url = await getDownloadURL(storageRef);
    console.log("success??");
    return url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default uploadPhoto;
