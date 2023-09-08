import { useForm } from "react-hook-form";
import { Typography, Input, Button } from "@mui/material";
import useStore, { HotelBooked } from "../store";
import toast from "react-hot-toast";

interface Props {
  hotel: HotelBooked
}
const BookingFormComponent: React.FC<Props> = props => {
  const { hotel } = props;
  // console.log("++ Hotel:",hotel);

  // Inicializamos el hook "useForm": Extraemos las funciones 'register', 'handleSubmit', y 'errors' del objeto que devuelve 'useForm'.
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Obtenemos la función 'addReservation' de la STORE:
  //@ts-ignore
  const addReservation = useStore((state) => state.addReservation);

  // Definir función 'onSubmit':
  const onSubmit = (data: any) => {
    addReservation(hotel, data);
    toast.success("Reservation made!");
  };

  // Test: 
  //@ts-ignore
  const reservations = useStore((state) => state.reservations);
  console.log ("++ reservas:", reservations);

  // Return the form:
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="date" {...register("startDate", { required: true })} />
      {errors.startDate && (
        <Typography style={{ color: "red" }}>Start date is required</Typography>
      )}
      <br />

      <Input type="date" {...register("endDate", { required: true })} />
      {errors.endDate && (
        <Typography style={{ color: "red" }}>End date is required</Typography>
      )}

      <br />
      <br />
      <Button variant="contained" type="submit">Make Reservation</Button>&nbsp;
      <Button variant="contained" color="error" href={`/`}>Cancel</Button>
    </form>
  );  
}
export const BookingForm = BookingFormComponent;
