import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"

import App from "./components/app"
import { FavoritesProvider } from "./context/favorites-context"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FavoritesProvider>
        <ThemeProvider>
          <CSSReset />
          <App />
        </ThemeProvider>
      </FavoritesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
