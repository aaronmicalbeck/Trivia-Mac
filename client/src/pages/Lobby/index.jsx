import React, { Component } from "react";
import "./lobby.css";
import { Link } from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import gsap from "gsap";

export default class Lobby extends Component {
  constructor(props) {

    super(props);

    this.state = {
      user: props.user
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    alert("COMING SOON...");
  }

  componentDidMount() {
    window.addEventListener('resize', ()=> {
      this.setState({windowWidth: document.body.clientWidth})
    })
    
    gsap.from("#line1", { duration: 2, delay: 1, x: "101%", opacity: 0 })
    gsap.from("#line2", { duration: 2, delay: 1, y: "-150%", opacity: 0 })
    gsap.from("#line3", { duration: 2, delay: 1, y: "150%", opacity: 0 })
    gsap.from("#lobbyinstructions", { duration: 2, delay: 1, x: "-101%", opacity: 0 })
  
  }

  render() {
    return (

      <div id="lobbyDiv">
        <h1 id="lobbyinstructions">Choose your game mode!</h1>

        <div className="container-fluid">
          
          <button id="headtoheadbtn" onClick={this.handleClick}></button>
          
          <Link to="/game" id="lobby-nav-link" className="nav-link">
            <button id="battleroyalebtn"></button>
          </Link>
          <Link to="/" id="lobby-nav-link" className="nav-link">
            <NavigationButton id="lobbybackbtn">
              <span id="homeNavBtnTitle">Back</span>
            </NavigationButton>
          </Link>
          <div id="line1"></div>
          <div id="line2">HEAD TO HEAD (coming soon...)</div>
          <div id="line3">BATTLE ROYALE</div>
        </div>
        
      </div>
    );
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import Typography from '@material-ui/core/Typography';

// const images = [
//   {
//     // this is where the background image will go
//     url: "Images/trivia_mac_logo.png", 
    
//     title: 'Battle Royale',
//     width: '50%',
//   },
//   {
//     url: "Images/trivia_mac_logo.png",
//     title: 'Head To Head',
//     width: '50%',
//   }
// ];

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     minWidth: 300,
//     width: '100%',
//   },
//   image: {
//     position: 'relative',
//     height: 1000,
//     [theme.breakpoints.down('sm')]: {
//       width: '100% !important', // Overrides inline-style
//       height: 500,
//     },
//     '&:hover, &$focusVisible': {
//       zIndex: 1,
//       '& $imageBackdrop': {
//         opacity: 0.15,
//       },
//       '& $imageMarked': {
//         opacity: 0,
//       },
//       '& $imageTitle': {
//         border: '4px solid currentColor',
//       },
//     },
//   },
//   focusVisible: {},
//   imageButton: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: theme.palette.common.white,
//   },
//   imageSrc: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center 40%',
//   },
//   imageBackdrop: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundColor: theme.palette.common.black,
//     opacity: 0.4,
//     transition: theme.transitions.create('opacity'),
//   },
//   imageTitle: {
//     battleRoyale: "BATTLE ROYALE",
//     position: 'relative',
//     padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
//   },
//   imageMarked: {
//     height: 3,
//     width: 18,
//     backgroundColor: theme.palette.common.white,
//     position: 'absolute',
//     bottom: -2,
//     left: 'calc(50% - 9px)',
//     transition: theme.transitions.create('opacity'),
//   },
// }));

// export default function ButtonBases() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//         <ButtonBase
//           focusRipple
//           key="Battle Royale"
//           className={classes.image}
//           focusVisibleClassName={classes.focusVisible}
//           style={{
//             width: `50%`
//           }}
//         >
//           <span
//             className={classes.imageSrc}
//             style={{
//               // backgroundImage: `url(${image.url})`,
//             }}
//           />
//           <span className={classes.imageBackdrop} />
//           <span className={classes.imageButton}>
//             <Typography
//               component="span"
//               variant="subtitle1"
//               color="inherit"
//               className={classes.image}
//             >
//               {/* {image.title} */}
//               <span className={classes.imageMarked} />
//             </Typography>
//           </span>
//         </ButtonBase>
//         <ButtonBase
//           focusRipple
//           key="Battle Royale"
//           className={classes.image}
//           focusVisibleClassName={classes.focusVisible}
//           style={{
//             width: `50%`
//           }}
//         >
//           <span
//             className={classes.imageSrc}
//             style={{
//               // backgroundImage: `url(${image.url})`,
//             }}
//           />
//           <span className={classes.imageBackdrop} />
//           <span className={classes.imageButton}>
//             <Typography
//               component="span"
//               variant="subtitle1"
//               color="inherit"
//               className={classes.imageTitle}
//             >
//               {/* {image.title} */}
//               <span className={classes.imageMarked} />
//             </Typography>
//           </span>
//         </ButtonBase>
     
//     </div>
//   );
// }