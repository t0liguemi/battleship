import { useContext } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Context } from "../store/context.jsx";

const SetupGrid = (props) => {
  const { store, actions } = useContext(Context);
  let fields = store.blankField;

  const CustomHeader = ({ children, ...props }) => {
    return (
      <Grid
        xs={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#151618"
        width={40}
        height={40}
        margin={0.1}
        sx={{ border: 1, borderRadius: 2, borderColor: "#445984" }}
        {...props}
      >
        <Typography variant="h5" sx={{ mx: "auto" }}>
          {children}
        </Typography>
      </Grid>
    );
  };
  const BattleField = ({ children, ...props }) => {
    return (
      <Grid
        display="flex"
        xs={1}
        justifyContent="center"
        alignItems="center"
        width={40}
        height={40}
        margin={0.1}
        sx={{ border: 1, borderRadius: 0, borderColor: "#445984" }}
        {...props}
      >
        <Typography variant="h5" sx={{ mx: "auto" }}>
          {children}
        </Typography>
      </Grid>
    );
  };
  //own field: 0=water, 1=possible setup, 2=ship, 3=hit ship
  return (
    <Box marginY={4}>
      <Typography variant="h4">{props.owner} field</Typography>
      <Grid container>
        <Grid container>
          <Grid width={40} margin={0.1} xs={1}></Grid>
          <CustomHeader>1</CustomHeader>
          <CustomHeader>2</CustomHeader>
          <CustomHeader>3</CustomHeader>
          <CustomHeader>4</CustomHeader>
          <CustomHeader>5</CustomHeader>
          <CustomHeader>6</CustomHeader>
          <CustomHeader>7</CustomHeader>
          <CustomHeader>8</CustomHeader>
          <CustomHeader>9</CustomHeader>
          <CustomHeader>10</CustomHeader>
        </Grid>
      </Grid>
      <Grid container columns={11}>
        <CustomHeader>A</CustomHeader>
        {fields[0].map((field, i) => {
          return (
            <BattleField
              onClick={() => {
                store.waitingForShip == false
                  ? actions.setBoatStart(0, i, store.currentBoat)
                  : actions.setBoatEnd(0, i);
              }}
              key={"A" + i}
              bgcolor={
                field == 5
                  ? "#900C3F"
                  : field == 4
                  ? "#CCD8DF"
                  : field == 0
                  ? "#0D2E77"
                  : field == 1
                  ? "#535A5E"
                  : field == 2
                  ? "#9F9F9F"
                  : "#C70039"
              }
            ></BattleField>
          );
        })}
      </Grid>
      <Grid container columns={11}>
        <CustomHeader>B</CustomHeader>
        {fields[1].map((field, i) => {
          return (
            <BattleField
              onClick={() => {
                store.waitingForShip == false
                  ? actions.setBoatStart(1, i, store.currentBoat)
                  : actions.setBoatEnd(1, i);
              }}
              key={"B" + i}
              bgcolor={
                field == 5
                  ? "#900C3F"
                  : field == 4
                  ? "#CCD8DF"
                  : field == 0
                  ? "#0D2E77"
                  : field == 1
                  ? "#535A5E"
                  : field == 2
                  ? "#9F9F9F"
                  : "#C70039"
              }
            ></BattleField>
          );
        })}
      </Grid>
      <Grid container columns={11}>
        <CustomHeader>C</CustomHeader>
        {fields[2].map((field, i) => {
          return (
            <BattleField
              onClick={() => {
                store.waitingForShip == false
                  ? actions.setBoatStart(2, i, store.currentBoat)
                  : actions.setBoatEnd(2, i);
              }}
              key={"C" + i}
              bgcolor={
                field == 5
                  ? "#900C3F"
                  : field == 4
                  ? "#CCD8DF"
                  : field == 0
                  ? "#0D2E77"
                  : field == 1
                  ? "#535A5E"
                  : field == 2
                  ? "#9F9F9F"
                  : "#C70039"
              }
            ></BattleField>
          );
        })}
      </Grid>
      <Grid container columns={11}>
        <CustomHeader>D</CustomHeader>
        {fields[3].map((field, i) => {
          return (
            <BattleField
              onClick={() => {
                store.waitingForShip == false
                  ? actions.setBoatStart(3, i, store.currentBoat)
                  : actions.setBoatEnd(3, i);
              }}
              key={"D" + i}
              bgcolor={
                field == 5
                  ? "#900C3F"
                  : field == 4
                  ? "#CCD8DF"
                  : field == 0
                  ? "#0D2E77"
                  : field == 1
                  ? "#535A5E"
                  : field == 2
                  ? "#9F9F9F"
                  : "#C70039"
              }
            ></BattleField>
          );
        })}
      </Grid>
      <Grid container columns={11}>
        <CustomHeader>E</CustomHeader>
        {fields[4].map((field, i) => {
          return (
            <BattleField
              onClick={() => {
                store.waitingForShip == false
                  ? actions.setBoatStart(4, i, store.currentBoat)
                  : actions.setBoatEnd(4, i);
              }}
              key={"E" + i}
              bgcolor={
                field == 5
                  ? "#900C3F"
                  : field == 4
                  ? "#CCD8DF"
                  : field == 0
                  ? "#0D2E77"
                  : field == 1
                  ? "#535A5E"
                  : field == 2
                  ? "#9F9F9F"
                  : "#C70039"
              }
            ></BattleField>
          );
        })}
      </Grid>
      <Grid container columns={11}>
        <CustomHeader>F</CustomHeader>
        {fields[5].map((field, i) => {
          return (
            <BattleField
              onClick={() => {
                store.waitingForShip == false
                  ? actions.setBoatStart(5, i, store.currentBoat)
                  : actions.setBoatEnd(5, i);
              }}
              key={"F" + i}
              bgcolor={
                field == 5
                  ? "#900C3F"
                  : field == 4
                  ? "#CCD8DF"
                  : field == 0
                  ? "#0D2E77"
                  : field == 1
                  ? "#535A5E"
                  : field == 2
                  ? "#9F9F9F"
                  : "#C70039"
              }
            ></BattleField>
          );
        })}
      </Grid>
      <Grid container columns={11}>
        <CustomHeader>G</CustomHeader>
        {fields[6].map((field, i) => {
          return (
            <BattleField
              onClick={() => {
                store.waitingForShip == false
                  ? actions.setBoatStart(6, i, store.currentBoat)
                  : actions.setBoatEnd(6, i);
              }}
              key={"G" + i}
              bgcolor={
                field == 5
                  ? "#900C3F"
                  : field == 4
                  ? "#CCD8DF"
                  : field == 0
                  ? "#0D2E77"
                  : field == 1
                  ? "#535A5E"
                  : field == 2
                  ? "#9F9F9F"
                  : "#C70039"
              }
            ></BattleField>
          );
        })}
      </Grid>
      <Grid container columns={11}>
        <CustomHeader>H</CustomHeader>
        {fields[7].map((field, i) => {
          return (
            <BattleField
              onClick={() => {
                store.waitingForShip == false
                  ? actions.setBoatStart(7, i, store.currentBoat)
                  : actions.setBoatEnd(7, i);
              }}
              key={"H" + i}
              bgcolor={
                field == 5
                  ? "#900C3F"
                  : field == 4
                  ? "#CCD8DF"
                  : field == 0
                  ? "#0D2E77"
                  : field == 1
                  ? "#535A5E"
                  : field == 2
                  ? "#9F9F9F"
                  : "#C70039"
              }
            ></BattleField>
          );
        })}
      </Grid>
      <Grid container columns={11}>
        <CustomHeader>I</CustomHeader>
        {fields[8].map((field, i) => {
          return (
            <BattleField
              onClick={() => {
                store.waitingForShip == false
                  ? actions.setBoatStart(8, i, store.currentBoat)
                  : actions.setBoatEnd(8, i);
              }}
              key={"I" + i}
              bgcolor={
                field == 5
                  ? "#900C3F"
                  : field == 4
                  ? "#CCD8DF"
                  : field == 0
                  ? "#0D2E77"
                  : field == 1
                  ? "#535A5E"
                  : field == 2
                  ? "#9F9F9F"
                  : "#C70039"
              }
            ></BattleField>
          );
        })}
      </Grid>
      <Grid container columns={11}>
        <CustomHeader>J</CustomHeader>
        {fields[9].map((field, i) => {
          return (
            <BattleField
              onClick={() => {
                store.waitingForShip == false
                  ? actions.setBoatStart(9, i, store.currentBoat)
                  : actions.setBoatEnd(9, i);
              }}
              key={"J" + i}
              bgcolor={
                field == 5
                  ? "#900C3F"
                  : field == 4
                  ? "#CCD8DF"
                  : field == 0
                  ? "#0D2E77"
                  : field == 1
                  ? "#535A5E"
                  : field == 2
                  ? "#9F9F9F"
                  : "#C70039"
              }
            ></BattleField>
          );
        })}
      </Grid>
    </Box>
  );
};
export default SetupGrid;
