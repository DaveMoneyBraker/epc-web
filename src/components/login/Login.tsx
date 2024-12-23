import React from "react";
import styled from "@emotion/styled";
import { EpcLogo } from "../../assets/icons/Logo";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import AppMutations from "../../services/mutations/AppMutations";
import AppUtils from "../../utils/0_AppUtils";

const Container = styled("div")({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Paper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "25px",
  justifyContent: "center",
  width: "500px",
  padding: "15px",
});

export const Login: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const empty = React.useMemo(
    () => !password || !username,
    [password, username]
  );
  const { mutation: loginMutation, loading } = AppMutations.useLoginMutation(
    username,
    password
  );

  const handleMouseDownUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e: any) => {
    const value = AppUtils.getInputValue(e);
    setPassword(value);
  };

  const handleUsernameChange = (e: any) => {
    const value = AppUtils.getInputValue(e);
    setUsername(value);
  };

  const handleSubmit = () => {
    loginMutation.mutate();
  };

  return (
    <Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Paper>
        <EpcLogo />
        <FormControl fullWidth required>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={show ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShow((v) => !v)}
                  onMouseDown={handleMouseDownUpPassword}
                  onMouseUp={handleMouseDownUpPassword}
                  edge="end"
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          disabled={empty}
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </Paper>
    </Container>
  );
};
