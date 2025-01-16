import Banner from "../../components/home/banner/Banner";
import ProductsByCategory from "../../components/home/ProductsByCategory";
import Layout from "../../components/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Banner />
      {/* Productos */}
      <ProductsByCategory />
    </Layout>
  )
}
