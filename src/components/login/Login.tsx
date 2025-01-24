import React from "react";
import { EpcLogo } from "../../assets/icons/Logo";
import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  styled,
} from "@mui/material";
import AppMutations from "../../services/mutations/AppMutations";
import AppUtils from "../../utils/0_AppUtils";
import { EnhancedButton, EnhancePasswordInput } from "../1_enhanced";

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

  const handlePasswordChange = React.useCallback(
    (value: string) => setPassword(value),
    [setPassword]
  );

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
        <EnhancePasswordInput
          value={password}
          onChange={handlePasswordChange}
        />
        <EnhancedButton disabled={empty} fullWidth onClick={handleSubmit}>
          Login
        </EnhancedButton>
      </Paper>
    </Container>
  );
};
