import { useAuth } from "./hooks/useAuth";
import LoginPage from "./components/LoginPage";
import WelcomePage from "./components/WelcomePage";
import "./App.css";

/**
 * App
 * Top-level component that owns routing between
 * the Login page and the Welcome page via auth state.
 */
export default function App() {
  const { user, error, isLoading, login, logout, getRememberedUsername } = useAuth();

  return (
    <div className="app">
      {user ? (
        <WelcomePage username={user.username} onLogout={logout} />
      ) : (
        <LoginPage
          onLogin={login}
          error={error}
          isLoading={isLoading}
          rememberedUsername={getRememberedUsername()}
        />
      )}
    </div>
  );
}
