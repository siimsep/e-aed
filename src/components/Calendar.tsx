import { IonDatetime } from "@ionic/react";
import { useState } from "react";
import CalEntry from "./CalEntry";
import { format, parse } from "date-fns";

function BlankCalendar() {
  const [calDate, setCalDate] = useState<any>();
  function calClick(e: any) {
    const dateFromCalender = e.detail.value;
    const dateFormat = new Date(dateFromCalender);
    const formattedDate = format(dateFormat, "MMMM d, yyyy");
    const parsedDate = parse(formattedDate, "MMMM d, yyyy", new Date());
    setCalDate(parsedDate);
  }
  return (
    <>
      <IonDatetime
        onIonChange={calClick}
        presentation="date"
        locale="et-Et"
        firstDayOfWeek={1}
      ></IonDatetime>
      <CalEntry calDate={calDate} />
    </>
  );
}
export default BlankCalendar;
