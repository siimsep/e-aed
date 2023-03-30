import { isPlatform } from "@ionic/react";

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
//import { useBetween } from "use-between";
import uploadPhoto from "./uploadPhoto";

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

export default function PhotoGallery() {
  //const [photos, setPhotos] = useState<UserPhoto[]>([]);
  //const [photoUrl, setPhotoUrl] = useState<string>("see on ikka see");
  return new Promise(async (resolve, reject) => {
    let photoUrl: any = "a";
    const takePhoto = async () => {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      const fileName = new Date().getTime() + ".jpeg";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const savedFileImage = await savePicture(photo, fileName);
      //const newPhotos = [savedFileImage, ...photos];
      //setPhotos(newPhotos);
      console.log("takePhoto photoUrl ", photoUrl);
      return;
    };

    const savePicture = async (
      photo: Photo,
      fileName: string
    ): Promise<UserPhoto> => {
      let base64Data: string;
      // "hybrid" will detect Cordova or Capacitor;
      if (isPlatform("hybrid")) {
        const file = await Filesystem.readFile({
          path: photo.path!,
        });
        base64Data = file.data;
      } else {
        base64Data = await base64FromPath(photo.webPath!);
      }
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });

      if (isPlatform("hybrid")) {
        // Display the new image by rewriting the 'file://' path to HTTP
        // Details: https://ionicframework.com/docs/building/webview#file-protocol
        return {
          filepath: savedFile.uri,
          webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        };
      } else {
        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
          filepath: fileName,
          webviewPath: photo.webPath,
        };
      }
    };
    await takePhoto();

    async function base64FromPath(path: string): Promise<string> {
      const response = await fetch(path);
      const blob = await response.blob();
      const url = await uploadPhoto(blob);
      photoUrl = url;
      //setPhotoUrl(url);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject("method did not return a string");
          }
        };
        reader.readAsDataURL(blob);
      });
    }
    resolve(photoUrl);
  });
}
//export default PhotoGallery;
//export const useSharedPhotoUrl = () => useBetween(usePhotoGallery);
