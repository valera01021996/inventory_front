import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LocationsDashboard from "./pages/LocationsDashboard";
import ServersList from "./pages/Servers";
import Layout from "./components/Layout";
import RacksList from "./pages/Racks";
import RackDetail from "./pages/RackDetail";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/locations" replace />}
                        />

                        <Route
                            path="/locations"
                            element={<LocationsDashboard />}
                        />
                        <Route
                            path="/servers/:locationId"
                            element={<ServersList />}
                        />
                        <Route path="/racks" element={<RacksList />} />
                        <Route path="/racks/:rackId" element={<RackDetail />} />
                        <Route
                            path="*"
                            element={
                                <div className="flex items-center justify-center h-screen text-xl">
                                    404 Страница не найдена
                                </div>
                            }
                        />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
