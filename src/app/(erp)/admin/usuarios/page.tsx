'use client';

import React, { useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Icons } from '@/components/ui/Icons';
import type { SystemUser, UserRole } from '@/types';

export default function AdminUsuariosPage() {
  const { users, addUser, toggleUserStatus, deleteUser, showToast } = useAppStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formulario de nuevo usuario
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'JEFE_OPERACIONES' as UserRole,
  });

  const roleLabels: Record<UserRole, string> = {
    SUPER_ADMIN: 'Super Administrador (Gerencia General)',
    JEFE_OPERACIONES: 'Jefe de Operaciones & Logística',
    RECEPCION_HOTEL: 'Recepción & Reservas Hotel',
    FACTURACION_CONTABILIDAD: 'Facturación Electrónica SUNAT',
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRole = roleFilter === 'TODOS' || u.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [users, searchTerm, roleFilter]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      showToast('Error', 'Por favor complete el nombre y correo del usuario', 'error');
      return;
    }

    addUser({
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone || '+51 900 000 000',
      role: newUser.role,
      roleLabel: roleLabels[newUser.role],
      status: 'ACTIVO',
    });

    setIsModalOpen(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'JEFE_OPERACIONES',
    });

    showToast(
      'Usuario Creado Exitosamente',
      `Se han generado las credenciales de acceso para ${newUser.name}.`,
      'success'
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CBE1A]/15 border border-[#6CBE1A]/30 text-[#6CBE1A] text-xs font-mono font-bold mb-2">
            <Icons.Users className="w-3.5 h-3.5" />
            CONTROL DE ACCESO & ROLES (RBAC)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Gestión de Usuarios del Sistema
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Administración de cuentas de colaboradores, perfiles de seguridad y permisos en el ERP.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-2 shadow-lg shadow-[#6CBE1A]/20 self-start sm:self-auto"
        >
          <Icons.UserPlus className="w-4 h-4" />
          <span>Registrar Nuevo Usuario</span>
        </button>
      </div>

      {/* 2. TARJETAS DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400">Total Usuarios</div>
          <div className="text-2xl font-black text-white font-mono mt-1">{users.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">En la base central</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400">Usuarios Activos</div>
          <div className="text-2xl font-black text-[#6CBE1A] font-mono mt-1">
            {users.filter((u) => u.status === 'ACTIVO').length}
          </div>
          <div className="text-[10px] text-emerald-400/80 mt-0.5">Operatividad 100%</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400">Roles Configurados</div>
          <div className="text-2xl font-black text-[#00A8E8] font-mono mt-1">4 Roles</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Saneamiento, Hotel, Finanzas</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400">Autenticación 2FA</div>
          <div className="text-2xl font-black text-[#C8A064] font-mono mt-1">Obligatorio</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Norma ISO/IEC 27001</div>
        </div>
      </div>

      {/* 3. FILTROS Y BÚSQUEDA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Icons.Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o celular..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6CBE1A]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] text-slate-400 font-medium shrink-0">Filtrar Rol:</span>
          {['TODOS', 'SUPER_ADMIN', 'JEFE_OPERACIONES', 'RECEPCION_HOTEL', 'FACTURACION_CONTABILIDAD'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                roleFilter === r
                  ? 'bg-[#6CBE1A] text-slate-950 shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {r === 'TODOS' ? 'Todos' : r.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* 4. TABLA DE USUARIOS */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/40">
                <th className="py-3.5 px-4">Usuario / Colaborador</th>
                <th className="py-3.5 px-4">Rol & Permisos</th>
                <th className="py-3.5 px-4">Contacto</th>
                <th className="py-3.5 px-4">Última Conexión</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredUsers.map((u) => {
                const isSuper = u.role === 'SUPER_ADMIN';
                const isOperaciones = u.role === 'JEFE_OPERACIONES';
                const isHotel = u.role === 'RECEPCION_HOTEL';

                const badgeColor = isSuper
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : isOperaciones
                  ? 'bg-[#6CBE1A]/15 text-[#6CBE1A] border-[#6CBE1A]/30'
                  : isHotel
                  ? 'bg-[#C8A064]/15 text-[#C8A064] border-[#C8A064]/30'
                  : 'bg-[#00A8E8]/15 text-[#00A8E8] border-[#00A8E8]/30';

                return (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white border border-slate-700">
                          {u.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white">{u.name}</div>
                          <div className="text-[11px] text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-xl text-[10px] font-bold border ${badgeColor}`}>
                        {u.roleLabel}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-slate-300">
                      {u.phone}
                    </td>

                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {u.lastLogin}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === 'ACTIVO'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            u.status === 'ACTIVO' ? 'bg-emerald-400' : 'bg-rose-400'
                          }`}
                        />
                        {u.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            toggleUserStatus(u.id);
                            showToast(
                              'Estado de Usuario Modificado',
                              `El usuario ${u.name} ahora está ${u.status === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'}.`,
                              'info'
                            );
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          title="Alternar Activo / Inactivo"
                        >
                          <Icons.RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          disabled={isSuper}
                          onClick={() => {
                            if (isSuper) return;
                            deleteUser(u.id);
                            showToast(
                              'Usuario Eliminado',
                              `El acceso de ${u.name} ha sido revocado.`,
                              'warning'
                            );
                          }}
                          className={`p-1.5 rounded-lg transition ${
                            isSuper
                              ? 'opacity-30 cursor-not-allowed bg-slate-800 text-slate-500'
                              : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400'
                          }`}
                          title={isSuper ? 'No se puede eliminar al Super Administrador' : 'Eliminar usuario'}
                        >
                          <Icons.Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL PARA CREAR NUEVO USUARIO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Icons.UserPlus className="w-4 h-4 text-[#6CBE1A]" />
                <span>Alta de Nuevo Usuario en ERP</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Nombre Completo y Cargo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Lic. Roberto Santillán"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6CBE1A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Correo Electrónico Corporativo</label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@inversionesnelly.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6CBE1A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Teléfono Móvil (WhatsApp)</label>
                <input
                  type="text"
                  placeholder="+51 987 654 321"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#6CBE1A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Rol Asignado & Nivel de Permisos</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#6CBE1A]"
                >
                  <option value="JEFE_OPERACIONES">Jefe de Operaciones & Logística (Sanitarios)</option>
                  <option value="RECEPCION_HOTEL">Recepción & Reservas (Hotel Ejecutivo)</option>
                  <option value="FACTURACION_CONTABILIDAD">Facturación Electrónica SUNAT & Cobranzas</option>
                  <option value="SUPER_ADMIN">Super Administrador (Acceso Total)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black text-xs py-2 px-4 rounded-xl transition shadow-md"
                >
                  Guardar y Emitir Acceso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
