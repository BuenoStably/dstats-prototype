import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DUSDPage from "./pages/dUSD";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col relative w-full">
          <div className="flex-grow mb-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dusd" element={<DUSDPage />} />
            </Routes>
          </div>
          <div className="fixed bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-primary/80 to-transparent pointer-events-none" />
          <footer className="py-8 mb-8 flex justify-center items-center relative">
            <img 
              src="https://app.testnet.dtrinity.org/dlend/dTrinity-White-Logo.png" 
              alt="dTrinity Logo" 
              className="h-9 object-contain"
            />
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;