import { useState } from 'react'
import { Button } from '@mui/material'

import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


export default function PanelContable() {
  const [submenuActivo, setSubmenuActivo] = useState(null)
  const navigate = useNavigate();

  const mostrarSubmenu = (submenuId) => {
    setSubmenuActivo(submenuActivo === submenuId ? null : submenuId)
  }

  return (
    <div className="min-h-screen bg-[#cde8e5] p-5">
      <div className="mx-auto max-w-3xl">
        <div className="p-6">
          <header className="mb-6 flex items-center justify-center relative">
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute left-0"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-center text-gray-800">
              Administración contable
            </h1>
          </header>

          <div className="space-y-4">
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => mostrarSubmenu('gastos')}
              >
                Gastos
              </Button>
              
              <Button
                variant="outline"
                onClick={() => mostrarSubmenu('libros')}
              >
                Libros
              </Button>
            </div>

            {submenuActivo === 'gastos' && (
              <div className="flex justify-center gap-4 animate-in slide-in-from-top">
                <Button>
                  <Link to="cargar-gasto">Cargar Gasto</Link>
                </Button>
                <Button>
                  <Link to="gastos">Gastos Ingresados</Link>
                </Button>
              </div>
            )}

            {submenuActivo === 'libros' && (
              <div className="flex justify-center gap-4 animate-in slide-in-from-top">
                <Button>
                  <Link to="libro-diario">Libro Diario</Link>
                </Button>
                <Button>
                  <Link to="libro-mayor">Libro Mayor</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
