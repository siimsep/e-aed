import {
  IonBackButton,
  IonButtons,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import db from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import PlantEntry from "../components/PlantEntry";
import EntryCard from "../components/EntryCard";
import {
  buildOutline,
  ellipsisVertical,
  imageOutline,
  trash,
} from "ionicons/icons";
import DeletePlant from "../hooks/deletePlant";
import { useIonRouter } from "@ionic/react";
interface ParamsId
  extends RouteComponentProps<{
    id: string;
  }> {}
interface Plant {
  name: string;
  description: string;
  date: string;
  photoUrl: string;
}
const PlantDetailPage: React.FC<ParamsId> = ({ match }) => {
  const plantId: string = match.params.id;
  const [plant, setModelValue] = useState<Plant>({
    name: "",
    description: "",
    date: "",
    photoUrl: "",
  });
  //
  //	Initializing our router
  const router = useIonRouter();

  //	A simple, hard-coded navigation
  const simpleNavigate = () => {
    router.push("/tab1", "forward", "push");
  };
  //
  useEffect(() => {
    const fetchPlant = async () => {
      const docRef = doc(db, "/Plants", plantId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        var date = docSnap.data().date.toDate().toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const plant: Plant = {
          name: docSnap.data().name,
          description: docSnap.data().description,
          date: date,
          photoUrl: docSnap.data().photoUrl,
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
      <IonFab vertical="top" horizontal="end">
        <IonFabButton size="small">
          <IonIcon icon={ellipsisVertical}></IonIcon>
        </IonFabButton>
        <IonFabList side="bottom">
          <IonFabButton
            onClick={() => {
              DeletePlant(plantId);
              simpleNavigate();
            }}
          >
            <IonIcon color="danger" icon={trash}></IonIcon>
          </IonFabButton>
          <IonFabButton onClick={() => console.log("change")}>
            <IonIcon icon={buildOutline}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <IonHeader className="ion-padding-bottom">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonItem>
        <h2>{plant.name}</h2>
      </IonItem>
      <IonItem>
        <IonText>Istutatud: {plant.date}</IonText>
      </IonItem>
      <IonItem>{plant.description}</IonItem>
      <IonItem>
        <IonImg src={plant.photoUrl}></IonImg>
      </IonItem>
      <IonItem>
        <IonIcon size="large" icon={imageOutline}></IonIcon>
        <IonIcon size="large" icon={imageOutline}></IonIcon>
        <IonIcon size="large" icon={imageOutline}></IonIcon>
        <IonIcon size="large" icon={imageOutline}></IonIcon>
      </IonItem>
      <EntryCard plantId={plantId} />
      <PlantEntry plantId={plantId} />
    </IonPage>
  );
};

export default PlantDetailPage;
