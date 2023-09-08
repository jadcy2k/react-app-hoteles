import { useQuery } from "@tanstack/react-query";
import { Typography, Stack, Button, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Link } from "wouter";

export interface Hotel {
  name: string,
  description: string,
  id: number | string,
  image: string
}

// Crear función para fetch de datos:
const fetchHotels = async () => {
    const urlStr = "http://localhost:3001/hotels"; // Para test, Cargaremos el "hotels.json" mediante "json-server".
    const res = await fetch (urlStr);

    if (!res.ok) {
        throw new Error ("Network response failed");
    }
    return res.json();    
}


// Crear lista de hoteles:
const HotelList = () => {

  // useQuery requiere de una "queryKey" (p.ej array "hotels") y una "queryFunction" (la fetchHotels):
  const { data, error, isLoading } = useQuery({ queryKey: ["hotels"], queryFn: fetchHotels });

  // 'isLoading' indica si la solicitud está en curso:
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  // 'error' contiene cualquier error que ocurra durante la solicitud:
  if (error) {
    return <p>Error</p>;
  }

  // Renderizar 'data':
  return (
    <>
      <Typography variant="h4" component="h2">
        Booking APP
      </Typography>

      <Stack spacing={2}>
        {data.map((hotel:Hotel) => (
          <Link key={hotel.id} href={`/hotel/${hotel.id}`}>
            <Card sx={{ maxWidth: 345, backgroundColor: '#e8e8e8' }}>
              <CardMedia sx={{ height: 140 }} image={hotel.image} title={hotel.name} />
              <CardContent>
                <Typography variant="h5" component="div">{hotel.name}</Typography>
                <Typography variant="body2" color="text.secondary">{hotel.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">See details</Button>
              </CardActions>
            </Card>
          </Link>
        ))}
      </Stack>
    </>
  );
}
export default HotelList;

