/* eslint-disable react/prop-types */

export default function ProductCard({ product }) {
  return (
    <div className="bg-white group rounded-xl border-gray-100 border-2 cursor-pointer">
      <div className="w-full relative">
        <img
          className="h-64 w-full object-cover scale-95 group-hover:scale-100 rounded-t-xl duration-300"
          src={product.thumbnail}
          alt="promo de"
        />
        {/* <div
          className="bg-yellow-400 absolute bottom-6 left-6 px-2 py-1 text-xs uppercase font-bold"
        >
          {product.descuento}% off
        </div> */}
      </div>

      <div className="p-3 flex flex-col justify-between items-center">
        <h1 className="text-lg font-semibold group-hover:text-blue-500 duration-300">
          {product.name}
        </h1>
        <div>
          <h3 className="text-base">${product.price}</h3>
          {/* <h3 className="text-sm line-through">${product.price}</h3> */}
          {/* <h2 className="text-sm font-semibold">
            ${promo.precio - (promo.precio * promo.descuento) / 100}
          </h2> */}
        </div>
      </div>
    </div>
  );
}