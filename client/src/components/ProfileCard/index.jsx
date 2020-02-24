import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import "./profileCard.css"


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  subheader:{

    align: "center"

  }
}));

export default function ProfileCard(props) {
  const classes = useStyles();

  function user(player) {
    if (player.hasOwnProperty("local")) {
      const username = player.local.username;
      return username;
    } else {
      const username = player.firstName;
      return username;
    }
  }

  function profilePic(player) {
    if (player.hasOwnProperty("local")) {
      const profilePicture = player.photos[0];
      return profilePicture;
    } else {
      const profilePicture = player.photos[0].value;
      return profilePicture;
    }
  }

  function profileScore(player) {
    if (player.hasOwnProperty("local")) {
      const profileScore = player.topScore;
      return profileScore;
    } else {
      const profileScore = player.topScore;
      return profileScore;
    }
  }

  function timeAttackScore(player) {
    if (player.hasOwnProperty("local")) {
      const profileScore = player.timeAttackScore;
      return profileScore;
    } else {
      const profileScore = player.timeAttackScore;
      return profileScore;
    }
  }

  return (
    <div id="profileCardContainer">
      <Grid
        direction="column"
        justify="center"
        alignItems="center"
        width="100%"
  
      >
        <Card className={classes.card}>
          <CardHeader
            title={
              <Typography align="center" variant="h3" gutterBottom>
                {user(props.user)}
              </Typography>
            }
            subheader={
              <Typography align="center" variant="h5" gutterBottom>
                Marathon Score: {profileScore(props.user)}
                <br></br>
                Best Time Attack: {timeAttackScore(props.user)}
              </Typography>
              
            }
          />
          <CardMedia className={classes.media} image={profilePic(props.user)} />
        </Card>
      </Grid>
    </div>
  );
}
