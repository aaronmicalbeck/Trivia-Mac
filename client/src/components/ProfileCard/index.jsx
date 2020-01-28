import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Expand from "../../components/Expand";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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

  function getScore(player) {
    axios
      .get(`/api/userscore/${player._id}`)
      .then(res => {
        console.log(res.data.topScore);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Card className={classes.card}>
          <CardHeader
            title={
              <Typography align="center" variant="h2" gutterBottom>
                {user(props.user)}
              </Typography>
            }
            subheader={getScore(props.user)}
          />
          <CardMedia className={classes.media} image={profilePic(props.user)} />
          {/* <CardContent>{getScore()}</CardContent> */}
        </Card>
      </Grid>
      {/* <Expand /> */}
    </div>
  );
}
