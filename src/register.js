import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import faders from "../faders.png";
import { Card } from "./card";
import { WideButton } from "./wide_button";
import { OptionLink } from "./option_link";
import * as Sentry from "@sentry/browser";
import YAML from "yaml";
Sentry.init({
  dsn:
    "https://abdf5817a9234f789b48b160f6a5ff1b@o361145.ingest.sentry.io/3783234"
});
import {
  ThemeProvider,
  CSSReset,
  Heading,
  Button,
  Divider,
  Box,
  Avatar,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Stack,
  AvatarBadge,
  Editable,
  AspectRatioBox,
  EditableInput,
  EditablePreview,
  Text,
  FormControl,
  Image,
  FormLabel,
  FormErrorMessage,
  Collapse,
  Input
} from "@chakra-ui/core";
export const Register = ({ onAuth }) => {
  const { app } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [eError, setEError] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const history = useHistory();
  const doCreateAuthor = async (token, { name, email }) => {
    const blob = await fetch(
      "https://gateway.freshair.radio/github/git/blobs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          content: btoa(
            YAML.stringify({
              name,
              email,
              ident: name.toLowerCase().replace(/[^a-z]+/g, "-")
            })
          ),
          encoding: "base64"
        }),
        method: "POST"
      }
    ).then((r) => r.json());
    const master = await fetch(
      "https://gateway.freshair.radio/github/branches/master",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    ).then((r) => r.json());
    const tree = await fetch(
      "https://gateway.freshair.radio/github/git/trees",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          base_tree: master.commit.sha,
          tree: [
            {
              path: `content/authors/${name
                .toLowerCase()
                .replace(/[^a-z]+/g, "-")}.yml`,
              mode: "100644",
              type: "blob",
              sha: blob.sha
            }
          ]
        }),
        method: "POST"
      }
    ).then((r) => r.json());
    const commit = await fetch(
      "https://gateway.freshair.radio/github/git/commits",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          message: `Create Author “${name}”`,
          tree: tree.sha,
          parents: [master.commit.sha],
          author: {
            name: name,
            email: email,
            date: new Date().toISOString()
          }
        }),
        method: "POST"
      }
    ).then((r) => r.json());
    const toMaster = await fetch(
      "https://gateway.freshair.radio/github/git/refs/heads/master",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ sha: commit.sha, force: false }),
        method: "PATCH"
      }
    );
  };
  const doLogin = async () => {
    setRegistering(true);
    Sentry.configureScope((scope) => scope.setUser({ email: email }));

    let fetched = await fetch(`https://identity.freshair.radio/signup`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        data: {
          name
        }
      })
    });
    if (
      !fetched.ok &&
      fetched.headers.get("Content-Type") != "application/json"
    ) {
      Sentry.captureException(fetched);
      setRegistering(false);

      return;
    }
    let json = await fetched.json();
    if (!fetched.ok) {
      Sentry.captureException(json);
      console.log(json);
      if (json.error_description == "Invalid Password") {
        setPwError(true);
      } else if (json.code == 400) {
        setEError("That email is already in use");
      } else {
        setUnknownError(true);
      }
      setRegistering(false);

      return;
    }
    let form = new FormData();
    form.append("grant_type", "password");
    form.append("username", email);
    form.append("password", password);
    fetched = await fetch(`https://identity.freshair.radio/token`, {
      method: "POST",
      body: form
    });
    if (
      !fetched.ok &&
      fetched.headers.get("Content-Type") != "application/json"
    ) {
      Sentry.captureException(fetched);
      return;
    }
    json = await fetched.json();
    if (!fetched.ok) {
      Sentry.captureException(json);
      console.log(json);

      setUnknownError(true);

      return;
    }
    localStorage.setItem("token", json.access_token);
    setRegistering(false);

    onAuth(json.access_token);
  };
  return (
    <Stack mb="50px">
      <Card mt="100px">
        <Box>
          <Stack>
            <img src="https://cdn.freshair.radio/logos/FreshairFullWhiteLogo.png" />

            {unknownError && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Unknown Error</AlertTitle>
                <AlertDescription>Try again later</AlertDescription>
              </Alert>
            )}
            <FormControl isInvalid={eError}>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                id="name"
                aria-describedby="name-helper-text"
              />
            </FormControl>
            <FormControl isInvalid={!!eError}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => {
                  setEError(false);
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                aria-describedby="email-helper-text"
              />
              <FormErrorMessage>{eError}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={pwError}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => {
                  setPwError(false);
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
              />
            </FormControl>

            <WideButton onClick={doLogin} isLoading={registering}>
              Create account
            </WideButton>
          </Stack>
        </Box>
      </Card>
      <OptionLink
        to={app ? `/auth/${app}/login` : `/auth/login`}
        text="login instead"
      >
        Already have an account?
      </OptionLink>
    </Stack>
  );
};
