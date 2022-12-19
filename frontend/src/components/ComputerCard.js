import { Divider, Grid, Paper } from "@mui/material";
import "../style/ComputerCard.css";

function ComputerCard({ computerName, computerID, computerType }) {
  let className = "card";
  className += ` ${computerType.toString().toLowerCase()}`;
  return (
    <Grid item xs={2}>
      <Paper className={className}>
        <Divider>
          <div className={computerType.toString().toLowerCase()}>
            {computerType.toString().toUpperCase()}
          </div>
        </Divider>
        <div className="card-footer">{computerID}</div>
      </Paper>
    </Grid>
  );
}

export default ComputerCard;
