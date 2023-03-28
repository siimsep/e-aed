import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import db from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import PlantEntry from "../components/PlantEntry";
import EntryCard from "../components/EntryCard";
interface ParamsId
  extends RouteComponentProps<{
    id: string;
  }> {}
interface Plant {
  name: string;
  description: string;
  date: string;
}
const PlantDetailPage: React.FC<ParamsId> = ({ match }) => {
  const plantId: string = match.params.id;
  const [plant, setModelValue] = useState<Plant>({
    name: "",
    description: "",
    date: "",
  });
  useEffect(() => {
    const fetchPlant = async () => {
      const docRef = doc(db, "/Plants", plantId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const plant: Plant = {
          name: docSnap.data().name,
          description: docSnap.data().description,
          date: docSnap.data().date,
        };
        setModelValue(plant);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    fetchPlant();
  }, [plantId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Taimed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>{plant.name}</IonItem>
        <IonText>Istutatud: </IonText>
        <IonItem>{plant.date}</IonItem>
        <IonItem>{plant.description}</IonItem>
        <EntryCard plantId={plantId} />
        <PlantEntry plantId={plantId} />
      </IonContent>
    </IonPage>
  );
};

export default PlantDetailPage;
