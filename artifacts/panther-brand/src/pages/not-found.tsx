import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary font-mono text-xs tracking-widest mb-6">404</p>
          <h1 className="font-serif text-5xl font-bold mb-6">Page Not Found</h1>
          <p className="text-muted-foreground mb-10 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button className="btn-gold text-primary-foreground font-medium tracking-wide px-8">
              Return to Home
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
