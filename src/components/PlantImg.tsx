import { IonCard, IonImg } from "@ionic/react";
import React from "react";
interface PhotoUrl {
  photoUrl: string;
}
const PlantImg: React.FC<PhotoUrl> = ({ photoUrl }) => {
  if (photoUrl !== "") {
    return (
      <>
        <IonCard>
          <IonImg alt="user uploaded" src={photoUrl}></IonImg>
        </IonCard>
      </>
    );
  }
  return null;
};

export default PlantImg;
