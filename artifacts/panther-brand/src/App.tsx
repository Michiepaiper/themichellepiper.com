import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import HireTalent from "@/pages/hire-talent";
import Candidates from "@/pages/candidates";
import About from "@/pages/about";
import Insights from "@/pages/insights";
import Contact from "@/pages/contact";
import Article from "@/pages/article";
import TalentCommunity from "@/pages/talent-community";
import LeaveAReview from "@/pages/leave-a-review";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hire-talent" component={HireTalent} />
      <Route path="/candidates" component={Candidates} />
      <Route path="/about" component={About} />
      <Route path="/insights" component={Insights} />
      <Route path="/insights/:slug" component={Article} />
      <Route path="/contact" component={Contact} />
      <Route path="/talent-community" component={TalentCommunity} />
      <Route path="/leave-a-review" component={LeaveAReview} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
