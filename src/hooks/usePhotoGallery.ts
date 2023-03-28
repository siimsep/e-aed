import { useState } from "react";
//import { isPlatform } from "@ionic/react";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import uploadPhoto from "./uploadPhoto";
//import { Filesystem, Directory } from "@capacitor/filesystem";
//import { Preferences } from "@capacitor/preferences";
//import { Capacitor } from "@capacitor/core";
export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
export function usePhotoGallery() {
  const [photos, setPhotos] = useState<string>();

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";
    setPhotos(fileName);
    try {
      uploadPhoto(fileName);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    photos,
    takePhoto,
  };
}
