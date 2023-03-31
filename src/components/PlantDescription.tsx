import { IonItem } from "@ionic/react";
import React from "react";
interface Description {
  description: string;
}
const PlantImg: React.FC<Description> = ({ description }) => {
  if (description !== "") {
    return <IonItem>{description}</IonItem>;
  }
  return null;
};

export default PlantImg;
