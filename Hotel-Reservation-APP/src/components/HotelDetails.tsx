import { useQuery } from "@tanstack/react-query";
import { Typography, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { useRoute } from "wouter";
import { BookingForm } from "./BookingForm";


// Funcion fetch de un hotel por "id":
const fetchHotel = async (id:number | string) => {
  const urlStr = "http://localhost:3001/hotels";
  const res = await fetch(`${urlStr}/${id}`);
  if (!res.ok) {
    throw new Error ("Network response was not ok.")
  }
  return res.json();
} 


// Functonal component para mostrar detalles:
const HotelDetails = () => {

  //El hook 'useRoute' en la librería "wouter" te permite acceder a la información de la ruta actual en el componente. 
 
  // 'match' es un booleano que indica si la ruta actual coincide con '/hotel/:id'
  // 'params' contiene los parámetros capturados en la URL, como 'id'  
  const [match, params] = useRoute('/hotel/:id');
  console.log("++match?", match);

  // Igual que en "HotelList", usamos el hook 'useQuery' pasando el parámetro id:
  const hotelId  = params?.id ?? 1;
  const { data, error, isLoading } = useQuery({
    queryKey: ["hotel", hotelId], 
    queryFn: () => fetchHotel(hotelId) 
  }); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching Hotel!</div>;
  }

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#e8e8e8" }}>
      <CardMedia sx={{ height: 140 }} image={data.image} title={data.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>

      <CardActions>
        <BookingForm hotel={data}/>
      </CardActions>
    </Card>
  );

}
export default HotelDetails;