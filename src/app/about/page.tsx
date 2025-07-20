import { Header } from '../components/header';
import Footer from '../components/footer';
import About from '../components/about';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20"> 
        <About />
      </main>
      <Footer />
    </>
  );
}