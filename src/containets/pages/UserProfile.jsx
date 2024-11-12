'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FiEdit, FiPlus } from 'react-icons/fi'
import Navbar from '../../components/navigation/Navbar.jsx'

export default function UserProfile() {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState(null)
  const [addresses, setAddresses] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [phone, setPhone] = useState('')

  useEffect(() => {
    fetchUserData()
    fetchAddresses()
  }, [])

  async function fetchUserData() {
    try {
      const { data, error } = await supabase
        .from('cliente')
        .select('nombre, apellido, mail, telefono')
        .single()

      if (error) throw error

      setUser({
        name: `${data.nombre} ${data.apellido}`,
        email: data.mail,
        phone: data.telefono,
        avatar: '/placeholder.svg?height=100&width=100' // placeholder avatar
      })
      setPhone(data.telefono)
    } catch (error) {
      console.error('Error fetching user data:', error.message)
    }
  }

  async function fetchAddresses() {
    try {
      const { data, error } = await supabase
        .from('direccion')
        .select('*')
        .eq('cliente_id', user?.id)

      if (error) throw error

      setAddresses(data || [])
    } catch (error) {
      console.error('Error fetching addresses:', error.message)
    }
  }

  async function updateProfile() {
    if (!user) return

    try {
      const { error } = await supabase
        .from('cliente')
        .update({ telefono: phone })
        .eq('mail', user.email)

      if (error) throw error

      setUser({ ...user, phone: phone })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error.message)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-md mx-auto bg-card rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="mb-4 flex items-center">
            <label className="font-bold mr-2">Numero celular:</label>
            {isEditing ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-1 border rounded text-gray-600 flex-grow"
              />
            ) : (
              <span className="text-gray-600 flex-grow">{user.phone || 'No especificado'}</span>
            )}
            <button
              className="ml-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => {
                if (isEditing) {
                  updateProfile()
                } else {
                  setIsEditing(true)
                }
              }}
            >
              <FiEdit className="h-4 w-4" />
            </button>
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-4">Direcciones</h3>
            {addresses.length === 0 ? (
              <button
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => {/* Add address logic here */}}
              >
                <FiPlus className="inline mr-2" />
                Agregar direccion
              </button>
            ) : (
              addresses.map((address, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <p className="font-bold">
                    {address.calle} {address.numero}
                  </p>
                  {address.piso && <p className="text-gray-600">Piso: {address.piso}</p>}
                  {address.departamento && <p className="text-gray-600">Depto: {address.departamento}</p>}
                  {address.codigo_postal && <p className="text-gray-600">CP: {address.codigo_postal}</p>}
                  {address.referencias_adicionales && (
                    <p className="text-gray-600">Ref: {address.referencias_adicionales}</p>
                  )}
                  <button
                    className="mt-2 py-1 px-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => {/* Edit address logic here */}}
                  >
                    Editar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <footer className="bg-nav text-white py-4 px-5">
        <div className="container mx-auto text-center">
          © 2023 Your Company Name. All rights reserved.
        </div>
      </footer>
    </div>
  )
}