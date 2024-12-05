// import React, { useState } from "react";
// import { 
//   Box, 
//   TextField, 
//   Button, 
//   Typography, 
//   Grid, 
//   Container,
//   CssBaseline,
//   ThemeProvider,
//   createTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { 
//   ArrowForwardIos as ArrowForwardIosIcon, 
//   LocationOn as LocationOnIcon,
//   AccessTime as AccessTimeIcon,
//   Router as RouterIcon,
//   Language as LanguageIcon
// } from "@mui/icons-material";
// import axios from "axios";

// // Leaflet imports
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix for default marker icon in Leaflet
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41]
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const App: React.FC = () => {
//   const [ipAddress, setIpAddress] = useState("");
//   const [locationData, setLocationData] = useState<any>(null);
//   const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);

//   // Determine system preference for dark mode
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

//   // Create dark theme
//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: prefersDarkMode ? 'dark' : 'light',
//           primary: {
//             main: prefersDarkMode ? '#90caf9' : '#1976d2',
//           },
//           background: {
//             default: prefersDarkMode ? '#121212' : '#f3f4f6',
//             paper: prefersDarkMode ? '#1e1e1e' : '#ffffff',
//           },
//         },
//         components: {
//           MuiTextField: {
//             styleOverrides: {
//               root: {
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: prefersDarkMode ? '#2c2c2c' : '#ffffff',
//                 },
//               },
//             },
//           },
//         },
//       }),
//     [prefersDarkMode]
//   );

//   // Function to fetch location data based on IP
//   const fetchLocationData = async () => {
//     try {
//       const response = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
//       setLocationData(response.data);

//       const location = response.data.loc.split(",");
//       setMapPosition([
//         parseFloat(location[0]),
//         parseFloat(location[1])
//       ]);
//     } catch (error) {
//       console.error("Error fetching IP location data", error);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box 
//         sx={{ 
//           width: "100%", 
//           minHeight: "100vh", 
//           backgroundColor: theme.palette.background.default 
//         }}
//       >
//         {/* Header Section */}
//         <Box
//           sx={{
//             background: prefersDarkMode 
//               ? 'linear-gradient(to bottom, rgba(30, 30, 30, 0.8), rgba(30, 30, 30, 0.8))' 
//               : `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))`,
//             backgroundColor: prefersDarkMode ? '#1e1e1e' : 'transparent',
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             color: "#fff",
//             height: { xs: "300px", md: "400px" },
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//             padding: "2rem",
//           }}
//         >
//           <Typography
//             variant="h3"
//             fontWeight="bold"
//             gutterBottom
//             sx={{
//               fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
//               color: theme.palette.primary.main
//             }}
//           >
//             IP Address Tracker
//           </Typography>
//           <Typography 
//             variant="body1" 
//             sx={{ 
//               opacity: 0.9, 
//               color: theme.palette.text.secondary 
//             }}
//           >
//             Find the location, timezone, and ISP of any IP address or domain.
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginTop: "2rem",
//               width: "100%",
//               maxWidth: "600px",
//             }}
//           >
//             <TextField
//               variant="outlined"
//               placeholder="Search for any IP address or domain"
//               fullWidth
//               sx={{
//                 backgroundColor: theme.palette.background.paper,
//                 borderRadius: "10px 0 0 10px",
//               }}
//               value={ipAddress}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setIpAddress(e.target.value)
//               }
//             />
//             <Button
//               variant="contained"
//               size="large"
//               sx={{
//                 borderRadius: "0 10px 10px 0",
//                 padding: "0.75rem",
//               }}
//               onClick={fetchLocationData}
//             >
//               <ArrowForwardIosIcon />
//             </Button>
//           </Box>
//         </Box>

//         {/* Information Card Section */}
//         <Container
//           maxWidth="lg"
//           sx={{
//             position: "relative",
//             top: "-60px",
//             zIndex: 10,
//             padding: "3rem 0",
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: theme.palette.background.paper,
//               borderRadius: "12px",
//               boxShadow: theme.shadows[4],
//               padding: "2rem",
//             }}
//           >
//             <Grid container spacing={6}>
//               {/* IP Address */}
//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <LanguageIcon color="primary" />
//                   <Typography
//                     variant="subtitle1"
//                     color="textSecondary"
//                     gutterBottom
//                   >
//                     IP Address
//                   </Typography>
//                 </Box>
//                 <Typography variant="h6" fontWeight="bold">
//                   {locationData ? locationData.ip : "Not Available"}
//                 </Typography>
//               </Grid>

//               {/* Location */}
//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <LocationOnIcon color="primary" />
//                   <Typography
//                     variant="subtitle1"
//                     color="textSecondary"
//                     gutterBottom
//                   >
//                     Location
//                   </Typography>
//                 </Box>
//                 <Typography variant="h6" fontWeight="bold">
//                   {locationData
//                     ? locationData.city + ", " + locationData.region
//                     : "Not Available"}
//                 </Typography>
//               </Grid>

//               {/* Timezone */}
//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <AccessTimeIcon color="primary" />
//                   <Typography
//                     variant="subtitle1"
//                     color="textSecondary"
//                     gutterBottom
//                   >
//                     Timezone
//                   </Typography>
//                 </Box>
//                 <Typography variant="h6" fontWeight="bold">
//                   {locationData ? locationData.timezone : "Not Available"}
//                 </Typography>
//               </Grid>

//               {/* ISP */}
//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <RouterIcon color="primary" />
//                   <Typography
//                     variant="subtitle1"
//                     color="textSecondary"
//                     gutterBottom
//                   >
//                     ISP
//                   </Typography>
//                 </Box>
//                 <Typography variant="h6" fontWeight="bold">
//                   {locationData ? locationData.org : "Not Available"}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>
//         </Container>

//         {/* Map Section */}
//         {mapPosition && (
//           <MapContainer 
//             center={mapPosition} 
//             zoom={12} 
//             scrollWheelZoom={false}
//             style={{ 
//               height: "900px", 
//              maxWidth: "70%",
//              width: "70%", marginLeft: "auto", marginRight: "auto",
            
//               filter: prefersDarkMode 
//                 ? 'invert(0.9) hue-rotate(180deg)' 
//                 : 'none' 
//             }}
//           >
            
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={mapPosition}>
//               <Popup>
//                 {locationData 
//                   ? `${locationData.city}, ${locationData.region}` 
//                   : "Location"}
//               </Popup>
//             </Marker>
//           </MapContainer>
//         )}
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default App;

import React, { useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { 
  ArrowForwardIos as ArrowForwardIosIcon, 
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  Router as RouterIcon,
  Language as LanguageIcon
} from "@mui/icons-material";
import axios from "axios";

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const App: React.FC = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [locationData, setLocationData] = useState<any>(null);
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);

  // Create theme with dark colors
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#2c2c2c',
            },
          },
        },
      },
    },
  });

  // Function to fetch location data based on IP
  const fetchLocationData = async () => {
    try {
      const response = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
      setLocationData(response.data);

      const location = response.data.loc.split(",");
      setMapPosition([
        parseFloat(location[0]),
        parseFloat(location[1])
      ]);
    } catch (error) {
      console.error("Error fetching IP location data", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          width: "100%", 
          minHeight: "100vh", 
          backgroundColor: theme.palette.background.default 
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            background: 'linear-gradient(to bottom, rgba(30, 30, 30, 0.8), rgba(30, 30, 30, 0.8))',
            color: "#fff",
            height: { xs: "300px", md: "400px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: theme.palette.primary.main
            }}
          >
            IP Address Tracker
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.9, 
              color: theme.palette.text.secondary 
            }}
          >
            Find the location, timezone, and ISP of any IP address or domain.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search for any IP address or domain"
              fullWidth
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px 0 0 10px",
              }}
              value={ipAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIpAddress(e.target.value)
              }
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: "0 10px 10px 0",
                padding: "0.75rem",
              }}
              onClick={fetchLocationData}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Box>
        </Box>

        {/* Information Card Section */}
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            top: "-60px",
            zIndex: 10,
            padding: "3rem 0",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: "12px",
              boxShadow: theme.shadows[4],
              padding: "2rem",
            }}
          >
            <Grid container spacing={6}>
              {/* IP Address */}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LanguageIcon color="primary" />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    IP Address
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  {locationData ? locationData.ip : "Not Available"}
                </Typography>
              </Grid>

              {/* Location */}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="primary" />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    Location
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  {locationData
                    ? locationData.city + ", " + locationData.region
                    : "Not Available"}
                </Typography>
              </Grid>

              {/* Timezone */}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon color="primary" />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    Timezone
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  {locationData ? locationData.timezone : "Not Available"}
                </Typography>
              </Grid>

              {/* ISP */}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <RouterIcon color="primary" />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    ISP
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  {locationData ? locationData.org : "Not Available"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Map Section */}
        {mapPosition && (
          <MapContainer 
            center={mapPosition} 
            zoom={12} 
            scrollWheelZoom={false}
            style={{ 
              height: "900px", 
              maxWidth: "70%",
              width: "70%", 
              marginLeft: "auto", 
              marginRight: "auto"
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={mapPosition}>
              <Popup>
                {locationData 
                  ? `${locationData.city}, ${locationData.region}` 
                  : "Location"}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
