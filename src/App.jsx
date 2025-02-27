import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyles from "./styles/GlobalStyle";
import { StyleSheetManager } from "styled-components";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import Account from "./pages/Account";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import BookingDetails from "./pages/BookingDetails";
import Checkin from "./pages/Checkin";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <StyleSheetManager shouldForwardProp={(prop) => prop !== "variation"}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route
                  path="bookings/:bookingId"
                  element={<BookingDetails />}
                />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="settings" element={<Settings />} />
                <Route path="users" element={<Users />} />
                <Route path="account" element={<Account />} />
              </Route>

              <Route path="login" element={<Login />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </StyleSheetManager>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
