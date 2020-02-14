import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  subheader:{

    align: "center"

  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
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

  return (
    <div id="container">
      <Grid
        direction="column"
        justify="center"
        alignItems="center"
        width="100%"
      >
        <Card className={classes.card}>
          <CardHeader
            title={
              <Typography align="center" variant="h2" gutterBottom>
                {user(props.user)}
              </Typography>
            }
            subheader={
              <Typography align="center" variant="h4" gutterBottom>
                Top Score: {profileScore(props.user)}
              </Typography>
            }
          />
          <CardMedia className={classes.media} image={profilePic(props.user)} />
          {/* <CardContent>{getScore()}</CardContent> */}
        </Card>
        {/* <Expand /> */}
      </Grid>
    </div>
  );
}
