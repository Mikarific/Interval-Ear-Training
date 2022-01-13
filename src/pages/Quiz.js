import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MUILink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import sounds from "../assets/sounds.json";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MUILink color="inherit" href="https://mikarific.com/">
        Mikarific
      </MUILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Quiz(props) {
  const [completed, setCompleted] = React.useState(0);
  const [errors, setErrors] = React.useState(0);
  const [score, setScore] = React.useState(100);
  const [time, setTime] = React.useState(0);
  const [avgTime, setAvgTime] = React.useState(0);

  const [gameInfo, setGameInfo] = React.useState({
    roundIndex: -1,
    guesses: [],
    times: [],
    startTime: 0,
  });

  const intervals = window.localStorage
    .getItem("intervals")
    .split(",")
    .map((interval) => {
      return interval === "true";
    });

  React.useEffect(() => {
    const interval_id = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
    let counter = 1;
    setTime(0);
    setInterval(() => {
      setTime(counter++);
    }, 1000);
    nextRound();
  }, []);

  function nextRound() {
    const choices = [];
    for (let i = 0; i < intervals.length; i++) {
      if (intervals[i] && i !== gameInfo.roundIndex) choices.push(i);
    }

    const gameInfoChanges = gameInfo;
    gameInfoChanges.guesses = [];
    gameInfoChanges.roundIndex =
      choices[
        ((window.crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) *
          choices.length) |
          0
      ];
    gameInfoChanges.startTime = time;
    setGameInfo(gameInfoChanges);

    playInterval(24);
  }

  function playInterval(startingNote) {
    const sound1 = new Audio(sounds[Object.keys(sounds)[startingNote]]);
    sound1.play();
    setTimeout(() => {
      const sound2 = new Audio(
        sounds[Object.keys(sounds)[startingNote + gameInfo.roundIndex]]
      );
      sound2.play();
    }, 800);
  }

  function guess(i) {
    const gameInfoChanges = gameInfo;
    gameInfoChanges.guesses.push(i);
    setGameInfo(gameInfoChanges);
    if (i === gameInfo.roundIndex) {
      setCompleted(completed + 1);
      setScore(Math.round(((completed + 1) / (completed + 1 + errors)) * 100));
      const gameInfoChanges = gameInfo;
      gameInfoChanges.times.push(time - gameInfo.startTime);
      setGameInfo(gameInfoChanges);
      setAvgTime(Math.round((time / gameInfoChanges.times.length) * 100) / 100);
    } else {
      setErrors(errors + 1);
      setScore(Math.round((completed / (completed + (errors + 1))) * 100));
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3" align="center">
            Interval Ear Training
          </Typography>
          <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Chip label={`Completed: ${completed}`} color="success" />
                  <Chip label={`Errors: ${errors}`} color="error" />
                </Stack>
              </Grid>
              <Grid item xs>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Chip label={`Score: ${score}%`} color="primary" />
                  <Chip label={`Time: ${time} sec`} color="warning" />
                  <Chip label={`Avg Time: ${avgTime} sec`} color="secondary" />
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      playInterval(24);
                    }}
                  >
                    Hear Again
                  </Button>
                  {gameInfo.guesses.includes(gameInfo.roundIndex) && (
                    <Button
                      variant="contained"
                      disableRipple
                      onClick={() => {
                        nextRound();
                      }}
                    >
                      Hear Next
                    </Button>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack justifyContent="center" alignItems="center">
                  <Typography component="h1" variant="h4">
                    Choices
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              {intervals[0] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(0)
                          ? gameInfo.roundIndex === 0
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(0);
                      }}
                    >
                      Perfect Unison
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[1] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(1)
                          ? gameInfo.roundIndex === 1
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(1);
                      }}
                    >
                      Minor 2nd
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[2] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(2)
                          ? gameInfo.roundIndex === 2
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(2);
                      }}
                    >
                      Major 2nd
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[3] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(3)
                          ? gameInfo.roundIndex === 3
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(3);
                      }}
                    >
                      Minor 3rd
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[4] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(4)
                          ? gameInfo.roundIndex === 4
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(4);
                      }}
                    >
                      Major 3rd
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[5] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(5)
                          ? gameInfo.roundIndex === 5
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(5);
                      }}
                    >
                      Perfect 4th
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[6] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(6)
                          ? gameInfo.roundIndex === 6
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(6);
                      }}
                    >
                      Tritone
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[7] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(7)
                          ? gameInfo.roundIndex === 7
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(7);
                      }}
                    >
                      Perfect 5th
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[8] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(8)
                          ? gameInfo.roundIndex === 8
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(8);
                      }}
                    >
                      Minor 6th
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[9] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(9)
                          ? gameInfo.roundIndex === 9
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(9);
                      }}
                    >
                      Major 6th
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[10] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(10)
                          ? gameInfo.roundIndex === 10
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(10);
                      }}
                    >
                      Minor 7th
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[11] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(11)
                          ? gameInfo.roundIndex === 11
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(11);
                      }}
                    >
                      Major 7th
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[12] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(12)
                          ? gameInfo.roundIndex === 12
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(12);
                      }}
                    >
                      Perfect Octave
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[13] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(13)
                          ? gameInfo.roundIndex === 13
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(13);
                      }}
                    >
                      Minor 9th
                    </Button>
                  </Stack>
                </Grid>
              )}
              {intervals[14] && (
                <Grid item xs={6} sm={4}>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      disableRipple
                      fullWidth
                      color={
                        gameInfo.guesses.includes(14)
                          ? gameInfo.roundIndex === 14
                            ? "success"
                            : "error"
                          : "primary"
                      }
                      onClick={() => {
                        guess(14);
                      }}
                    >
                      Major 9th
                    </Button>
                  </Stack>
                </Grid>
              )}
            </Grid>
            <Grid container spacing={1} sx={{ mt: 3 }}>
              <Grid item xs>
                <Stack justifyContent="right" alignItems="right">
                  <Button variant="outlined" component={Link} to="/">
                    Back
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs>
                <Stack justifyContent="left" alignItems="left">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const interval_id = window.setInterval(() => {},
                      Number.MAX_SAFE_INTEGER);
                      for (let i = 1; i < interval_id; i++) {
                        window.clearInterval(i);
                      }
                      setGameInfo({
                        roundIndex: -1,
                        guesses: [],
                        times: [],
                        startTime: 0,
                      });
                      setCompleted(0);
                      setErrors(0);
                      setScore(100);
                      setAvgTime(0);
                      let counter = 1;
                      setTime(0);
                      setInterval(() => {
                        setTime(counter++);
                      }, 1000);
                      nextRound();
                    }}
                  >
                    Restart Quiz
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
