import { IonDatetime } from "@ionic/react";
function BlankCalendar() {
  return (
    <IonDatetime
      presentation="date"
      locale="et-Et"
      firstDayOfWeek={1}
    ></IonDatetime>
  );
}
export default BlankCalendar;
