import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import faders from './faders.png'

import * as Sentry from '@sentry/browser'
Sentry.init({
  dsn:
    'https://abdf5817a9234f789b48b160f6a5ff1b@o361145.ingest.sentry.io/3783234'
})
import { Login } from './src/login'
import { Register } from './src/register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  useHistory
} from 'react-router-dom'
import {
  ThemeProvider,
  CSSReset,
  Box,
  Spinner,
  Stack,
  Image,
  DarkMode
} from '@chakra-ui/core'

import { freshairTheme } from './src/theme'
const Card = ({ children, ...props }) => (
  <Box
    rounded="lg"
    backgroundColor={freshairTheme.colors.black}
    padding="20px"
    padding="20px"
    mb="20px"
    {...props}
  >
    {children}
  </Box>
)

const App = () => {
  const history = useHistory()
  const { app } = useParams()

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem('token')
      if (token) {
        const fetched = await fetch(`https://identity.freshair.radio/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (
          !fetched.ok &&
          fetched.headers.get('Content-Type') != 'application/json'
        ) {
          Sentry.captureException(fetched)
          localStorage.removeItem('token')
          setLoading(false)

          return
        }
        let json = await fetched.json()
        if (!fetched.ok) {
          Sentry.captureException(json)
          localStorage.removeItem('token')
          setLoading(false)

          return
        }
        setLoading(false)
        if (app && app != 'login' && app != 'register') {
          window.location = `https://${app}.freshair.radio/identify/${token}`
          return
        } else {
          history.replace(`/me`)
          return
        }
      }
      setLoading(false)
    })()
  }, [])
  return (
    <>
      <Image
        src={faders}
        position="fixed"
        zIndex="-1"
        top="0px"
        left="0px"
        width="100vw"
        height="100vh"
        objectFit="cover"
        marginBottom="0px"
      />
      {loading ? (
        <section small="true">
          <Stack mb="50px">
            <Card mt="100px" display="grid">
              <Spinner mx="auto" my="100px" />
            </Card>
          </Stack>
        </section>
      ) : (
        <>
          <Route exact path="/auth/:app?/login">
            <section small="true">
              <Login
                onAuth={(token) =>
                  app && app != 'login' && app != 'register'
                    ? (window.location.href = `https://${app}.freshair.radio/identify/${token}`)
                    : history.push('/me')
                }
              />
            </section>
          </Route>
          <Route path="/auth/:app?/register">
            <section small="true">
              <Register />
            </section>
          </Route>
        </>
      )}
    </>
  )
}
ReactDOM.render(
  <ThemeProvider theme={freshairTheme}>
    <CSSReset />
    <DarkMode>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth/login" />
          </Route>
          <Route path="/auth/:app?">
            <App />
          </Route>
        </Switch>
      </Router>
    </DarkMode>
  </ThemeProvider>,
  document.getElementById('app')
)
