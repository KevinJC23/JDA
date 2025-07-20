import { Header } from '../components/header';
import Footer from '../components/footer';
import Products from '../components/products';

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="pt-20"> 
        <Products />
      </main>
      <Footer />
    </>
  );
}