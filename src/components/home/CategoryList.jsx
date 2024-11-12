
export default function CategoryList() {
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     const data = await getCategories();
  //     setCategories(data);
  //   }

  //   fetchProducts();
  // }, []);

  const categories = [
    {
      name: 'hamburguesas',
      thumbnail: 'https://i.pinimg.com/564x/17/2f/cc/172fcc6c37fa371017fcd0532c60339a.jpg'
    },
    {
      name: 'pizzas',
      thumbnail: 'https://img.freepik.com/vector-gratis/slice-pizza-melted-cartoon-icon-vector-ilustracion-iconos-alimentos-objetos-iconos-aislados-vector-plano_138676-10750.jpg?t=st=1731027460~exp=1731031060~hmac=c99c613bb4e6b5fc293d697654fb39fa3a74bea41bd479164b1ae89194e7a0c3&w=740'
    }
  ]

  return (
    <div className="pt-14 px-14">
      <div>
        <h1 className="text-6xl font-bold capitalize">Categorias</h1>
        {/* Todos los productos */}
        <section className="grid grid-cols-8 pt-7 gap-x-4">
        { categories.length > 0 && categories.map((cat) => (
          <div key={cat.name} className="flex flex-col items-center justify-center bg-white rounded-lg p-2 group">
            <h1 className="text-2xl font-bold">{cat.name}</h1>
            <img src={cat.thumbnail} alt="category image" className="h-32 w-auto object-cover scale-95 group-hover:scale-100 duration-500"/>
          </div>
        ))}
        </section>
      </div>
    </div>
  );
}
