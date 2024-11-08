import Banner from "../../components/home/Banner";
import ProductsByCategory from "../../components/home/ProductsByCategory";
import Layout from "../../components/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Banner />

      <ProductsByCategory />
    </Layout>
  )
}
