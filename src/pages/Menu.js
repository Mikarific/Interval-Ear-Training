import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MUILink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

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

export default function Menu(props) {
  const intervalStates = [
    React.useState(false),
    React.useState(false),
    React.useState(false),
    React.useState(false),
    React.useState(true),
    React.useState(false),
    React.useState(false),
    React.useState(true),
    React.useState(false),
    React.useState(false),
    React.useState(false),
    React.useState(false),
    React.useState(true),
    React.useState(false),
    React.useState(false),
  ];
  const intervals = intervalStates.map((intervalState) => {
    return intervalState[0];
  });
  const setIntervals = intervalStates.map((intervalState) => {
    return intervalState[1];
  });

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
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    for (let i = 0; i < setIntervals.length; i++) {
                      if (i === 4 || i === 7 || i === 12) {
                        setIntervals[i](true);
                        if (
                          !document.querySelectorAll("[type=checkbox]")[i]
                            .checked
                        ) {
                          document
                            .querySelectorAll("[type=checkbox]")
                            [i].click();
                        }
                      } else {
                        if (
                          document.querySelectorAll("[type=checkbox]")[i]
                            .checked
                        ) {
                          document
                            .querySelectorAll("[type=checkbox]")
                            [i].click();
                        }
                        setIntervals[i](false);
                      }
                    }
                  }}
                >
                  Simple
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    for (let i = 0; i < setIntervals.length; i++) {
                      if (
                        i === 2 ||
                        i === 4 ||
                        i === 5 ||
                        i === 7 ||
                        i === 9 ||
                        i === 11 ||
                        i === 12
                      ) {
                        setIntervals[i](true);
                        if (
                          !document.querySelectorAll("[type=checkbox]")[i]
                            .checked
                        ) {
                          document
                            .querySelectorAll("[type=checkbox]")
                            [i].click();
                        }
                      } else {
                        if (
                          document.querySelectorAll("[type=checkbox]")[i]
                            .checked
                        ) {
                          document
                            .querySelectorAll("[type=checkbox]")
                            [i].click();
                        }
                        setIntervals[i](false);
                      }
                    }
                  }}
                >
                  Advanced
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    for (let i = 0; i < setIntervals.length; i++) {
                      setIntervals[i](true);
                      if (
                        !document.querySelectorAll("[type=checkbox]")[i].checked
                      ) {
                        document.querySelectorAll("[type=checkbox]")[i].click();
                      }
                    }
                  }}
                >
                  All
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    for (let i = 0; i < setIntervals.length; i++) {
                      setIntervals[i](false);
                      if (
                        document.querySelectorAll("[type=checkbox]")[i].checked
                      ) {
                        document.querySelectorAll("[type=checkbox]")[i].click();
                      }
                    }
                  }}
                >
                  None
                </Button>
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[0](!intervals[0]);
                      }}
                    />
                  }
                  label="Perfect Unison"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[1](!intervals[1]);
                      }}
                    />
                  }
                  label="Minor 2nd"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[2](!intervals[2]);
                      }}
                    />
                  }
                  label="Major 2nd"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[3](!intervals[3]);
                      }}
                    />
                  }
                  label="Minor 3rd"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[4](!intervals[4]);
                      }}
                      defaultChecked
                    />
                  }
                  label="Major 3rd"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[5](!intervals[5]);
                      }}
                    />
                  }
                  label="Perfect 4th"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[6](!intervals[6]);
                      }}
                    />
                  }
                  label="Tritone"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[7](!intervals[7]);
                      }}
                      defaultChecked
                    />
                  }
                  label="Perfect Fifth"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[8](!intervals[8]);
                      }}
                    />
                  }
                  label="Minor 6th"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[9](!intervals[9]);
                      }}
                    />
                  }
                  label="Major 6th"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[10](!intervals[10]);
                      }}
                    />
                  }
                  label="Minor 7th"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[11](!intervals[11]);
                      }}
                    />
                  }
                  label="Major 7th"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[12](!intervals[12]);
                      }}
                      defaultChecked
                    />
                  }
                  label="Perfect Octave"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[13](!intervals[13]);
                      }}
                    />
                  }
                  label="Minor 9th"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setIntervals[14](!intervals[14]);
                      }}
                    />
                  }
                  label="Major 9th"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/quiz"
              disabled={intervals.filter(interval => interval === true).length < 2}
              onClick={() => {
                window.localStorage.setItem("intervals", intervals);
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              Start Quiz
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
