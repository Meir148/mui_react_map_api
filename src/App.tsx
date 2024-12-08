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
  createTheme,
  useMediaQuery,
  useTheme
} from "@mui/material";

//icons
import { 
  ArrowForwardIos as ArrowForwardIosIcon, 
  LocationOn as LocationOnIcon, 
  AccessTime as AccessTimeIcon, 
  Router as RouterIcon, 
  Language as LanguageIcon 
} from "@mui/icons-material";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import axios from "axios";

import AnimatedEarth from "./components/AnimatedEarth";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Marker icon
L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const App: React.FC = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [locationData, setLocationData] = useState<any>(null);
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
  // animated earth before map
  const [mapLoaded, setMapLoaded] = useState(false);
  //error handling
  const [error, setError] = useState<string | null>(null);

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#90caf9" },
      background: { default: "#121212", paper: "#1e1e1e" },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: { 
            "& .MuiOutlinedInput-root": { 
              backgroundColor: "#2c2c2c",
              borderRadius: "8px 0 0 8px"
            } 
          },
        },
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  const fetchLocationData = async () => {
    try {
      setError(null);
      const response = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
      const location = response.data.loc.split(",");
      setLocationData(response.data);
      setMapPosition([parseFloat(location[0]), parseFloat(location[1])]);
    } catch (error) {
      console.error("Error fetching IP location data", error);
      setError("Unable to fetch location data. Please check the IP address.");
    }
  };

  const InfoItem = ({
    icon: Icon,
    title,
    value,
  }: {
    icon: React.ElementType;
    title: string;
    value: string;
  }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={3} 
        sx={{ 
          textAlign: isMobile ? 'center' : 'left',
          mb: isMobile ? 2 : 0
        }}
      >
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent={isMobile ? 'center' : 'flex-start'} 
          gap={1}
        >
          <Icon color="primary" />
          <Typography variant="subtitle1" color="textSecondary">
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          sx={{ 
            wordBreak: 'break-word',
            fontSize: isMobile ? '1.2rem' : '1.5rem'
          }}
        >
          {value || "Not Available"}
        </Typography>
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: "100vh", 
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
       {/* // Header */}
        <Box
          sx={{
            background: "linear-gradient(to bottom, rgba(30, 30, 30, 0.8), rgba(30, 30, 30, 0.8))",
            color: "#fff",
            textAlign: "center",
            p: { xs: 2, md: 4 },
            height: { xs: "auto", md: "400px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ 
              fontSize: { xs: "2.5rem", sm: "3rem", md: "5rem" }, 
              color: theme.palette.primary.main 
            }}
          >
            IP Address Tracker
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }, 
              opacity: 0.9, 
              color: theme.palette.text.secondary,
              px: { xs: 2, md: 0 }
            }}
          >
            Find the location, timezone, and ISP of any IP address or domain.
          </Typography>
          <Box 
            sx={{ 
              display: "flex", 
              mt: 3, 
              width: { xs: "95%", sm: "80%", md: "800px" }, 
              mx: "auto",
              maxWidth: "800px"
            }}
          >
            <TextField 
              placeholder="Search for any IP address or domain"
              fullWidth
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              sx={{ 
                borderRadius: "8px 0 0 8px",
               
              }}
              error={!!error}
              helperText={error}
            />
            <Button
              variant="contained"
              sx={{ 
                borderRadius: "0 8px 8px 0", 
                px: { xs: 1, md: 2 },
                minWidth: { xs: 'auto', sm: '64px' }
              }}
              onClick={fetchLocationData}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Box>
        </Box>

        {/* Info Section */}
        <Container 
          sx={{ 
            position: "relative", 
            top: { xs: "-30px", md: "-60px" }, 
            zIndex: 10, 
            py: { xs: 2, md: 20 } 
          }}
        >
          <Box 
            sx={{ 
              backgroundColor: theme.palette.background.paper, 
              borderRadius: 2, 
              p: { xs: 2, md: 3 }
            }}
          >
            <Grid 
              container 
              spacing={{ xs: 2, md: 4 }}
              justifyContent="center"
              alignItems="stretch"
            >
              <InfoItem
                icon={LanguageIcon}
                title="IP Address"
                value={locationData?.ip || ""}
              />
              <InfoItem
                icon={LocationOnIcon}
                title="Location"
                value={locationData ? `${locationData.city}, ${locationData.region}` : ""}
              />
              <InfoItem
                icon={AccessTimeIcon}
                title="Timezone"
                value={locationData?.timezone || ""}
              />
              <InfoItem
                icon={RouterIcon}
                title="ISP"
                value={locationData?.org || ""}
              />
            </Grid>
          </Box>
        </Container>

        {/* Map */}
        <Box 
          sx={{ 
            width: { xs: "100%", md: "70%" }, 
            mx: "auto", 
            height: { xs: "500px", md: "900px" },
            mb: 4
          }}
        >
          {!mapLoaded && <AnimatedEarth />}
          {mapPosition && (
            <MapContainer
              center={mapPosition}
              zoom={13}
              scrollWheelZoom={false}
              style={{ 
                height: "100%", 
                width: "100%", 
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
              whenReady={() => setMapLoaded(true)}
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
      </Box>
    </ThemeProvider>
  );
};

export default App;