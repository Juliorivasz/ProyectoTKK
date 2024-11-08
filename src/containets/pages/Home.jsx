import Banner from "../../components/home/banner/Banner";
import CategoryList from "../../components/home/CategoryList";
import ProductsByCategory from "../../components/home/ProductsByCategory";
import Layout from "../../components/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Banner />

      {/* Categorias */}
      <CategoryList />

      {/* Productos */}
      <ProductsByCategory category="pizzas"/>
      <ProductsByCategory category="hamburguesas"/>
    </Layout>
  )
}
