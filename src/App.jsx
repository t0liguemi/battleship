import { useState, useContext, useEffect } from "react";
import injectContext, { Context } from "./store/context";
import { Button, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import MainGrid from "./components/MainGrid.jsx";
import toast, { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";
import SetupGrid from "./components/SetupGrid.jsx";

function App() {
  const { store, actions } = useContext(Context);
  const [count, setCount] = useState(0);

  useEffect(() => {}, [store.gameStarted]);

  return (
    <>
      <Container maxWidth="false" sx={{ height: "100vh", my: 5, mx: "auto" }}>
        <Grid container sx={{ alignItems: "center" }}>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Battleships
          </Typography>
          <Button
            sx={{ height: 50, mx: 4 }}
            variant="outlined"
            onClick={() => actions.handleRestart()}
          >
            Restart game!
          </Button>
        </Grid>
        <Box height={150}>
          <Typography variant="subtitle1">
            Classical Battleships game, place your ships by clicking where its
            ends should go. <br />
            You have 5 ships of lenghts 5, 4, 3, 3 and 2 fields.
          </Typography>
          <br />
          {store.gameStarted ? (
            <Typography variant="h6">
              Click on the enemy fields to attack
              <br />
              Blue: Water, Red: Ship, Dark Red: Sunken Ship.
            </Typography>
          ) : (
            <></>
          )}
          {store.shipsReady && store.gameStarted ? (
            <></>
          ) : (
            <Box>
              <Typography variant="h5">
                Place now {store.waitingForShip ? "the end " : "the beginning "}
                of a ship with a length of {store.currentBoat} fields{" "}
              </Typography>
              {store.waitingForShip ? (
                <Typography variant="h6">
                  You can delete the start of the ship by clicking on it again
                </Typography>
              ) : (
                <></>
              )}
            </Box>
          )}
        </Box>

        <Grid container gap={4} columns={{ l: 12, md: 10 }}>
          {store.gameStarted === true ? (
            <>
              <MainGrid owner="Enemy" xl={6} />
              <MainGrid owner="Your" xl={6} />
            </>
          ) : (
            <SetupGrid owner="Setup your" />
          )}
        </Grid>
      </Container>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "#ffffff",
            },
          },
          error: {
            style: {
              background: "red",
              color: "#ffffff",
            },
          },
        }}
      />
    </>
  );
}

export default injectContext(App);
