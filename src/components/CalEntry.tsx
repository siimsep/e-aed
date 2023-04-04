import { IonItem, IonCard, IonText } from "@ionic/react";
//import PlantForm from "./PlantForm";
interface CalEntryProps {
  date: any; // replace any with the expected type of date
}
function CalEntry(props: CalEntryProps) {
  const { date } = props;

  return (
    <>
      <IonCard>
        <IonItem>
          <IonText>{date}</IonText>
        </IonItem>
      </IonCard>
    </>
  );
}

export default CalEntry;
