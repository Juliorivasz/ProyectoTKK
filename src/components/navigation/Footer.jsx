import tkk from "/images/TKK.svg";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#012b39] text-white py-2 mt-auto">
      <div className="flex mx-auto px-1 w-full">
        <div className="flex flex-wrap justify-around w-full items-center">
          <div className="w-full md:w-20 mb-6 md:mb-0">
            <img src={tkk} alt="Company Logo" className="mb-4 w-15 h-15" />{" "}
            {/* Ajusta el tamaño según sea necesario */}
            <div className="flex flex-col space-y-2">
              <span>(261) 314-6566</span>
              <span>Contacto</span>
            </div>
          </div>
          <div className="w-full md:w-2/3 mb-6 md:mb-0 text-center">
            <h3 className="text-lg font-semibold mb-4">Sobre Nosotros</h3>
            <p className="max-w-md mx-auto text-sm leading-relaxed">
              Somos una empresa dedicada a la creacion de comidas deliciosas.
              Encontranos en las redes!
            </p>
          </div>
          <div className="w-full md:w-[7%] text-right">
            <h3 className="text-lg font-semibold mb-4">Siguenos</h3>
            <div className="flex justify-end space-x-4">
              <a
                href="https://www.facebook.com"
                className="w-6 h-6 cursor-pointer hover:text-[#00aaff] transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="https://x.com/home"
                className="w-6 h-6 cursor-pointer hover:text-[#00aaff] transition-colors"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="https://www.instagram.com/?hl=es"
                className="w-6 h-6 cursor-pointer hover:text-[#00aaff] transition-colors"
              >
                <FaSquareInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
