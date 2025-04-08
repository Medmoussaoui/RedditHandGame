import React from "react";
import HomeScreen from "./screens/HomeScreen";
import JoinRoomScreen from "./screens/JoinRoom";
import NavigatePublicRooms from "./screens/NavigatePublicRooms";
import { HashRouter, Route, Routes } from "react-router-dom";
import CreateRoomScreen from "./screens/CreateRoomScreen";
import { CreateRoomProvider } from "./contexts/createRoomContext";
import SocketProvider from "./contexts/socketContext";
import PlayingAreaScreen from "./screens/PlayingAreaScreen";
import PlayingAreaProvider from "./contexts/playingAreaContext";

const App: React.FC = () => {
  return (
    <HashRouter>
      <main
        style={{
          fontFamily: "Poppins, sans-serif",
          color: "white",
          backgroundColor: "#13192d",
          height: "100vh",
          margin: "0px",
        }}
      >
        <SocketProvider>
          <Routes>
            {/* <Route path="/" element={<WelcomeScreen />} /> */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/joinRoom" element={<JoinRoomScreen />} />
            <Route path="/publicRooms" element={<NavigatePublicRooms />} />
            <Route
              path="/createRoom"
              element={
                <CreateRoomProvider>
                  <CreateRoomScreen />
                </CreateRoomProvider>
              }
            />
            <Route
              path="/playing"
              element={
                <PlayingAreaProvider>
                  <PlayingAreaScreen />
                </PlayingAreaProvider>
              }
            />
          </Routes>
        </SocketProvider>
      </main>
    </HashRouter>
  );
};

export default App;
