'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LayoutDashboard, Users, MapPin, Package, FileSpreadsheet, BarChart3, UserCog, Settings, Network, ReceiptText, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Pelanggan', href: '/admin/customers', icon: Users },
  { label: 'Peta Pelanggan', href: '/admin/map', icon: MapPin },
  { label: 'Paket Internet', href: '/admin/packages', icon: Package },
  { label: 'Billing', href: '/admin/billing', icon: ReceiptText },
  { label: 'MikroTik', href: '/admin/mikrotik', icon: Network },
  { label: 'Import Excel', href: '/admin/import', icon: FileSpreadsheet },
  { label: 'Laporan', href: '/admin/reports', icon: BarChart3 },
  { label: 'Admin', href: '/admin/users', icon: UserCog },
  { label: 'Pengaturan', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname(); const router = useRouter(); const { data: session } = useSession(); const [collapsed,setCollapsed]=useState(false);
  const handleLogout=async()=>{await signOut({redirect:false});router.push('/login');};
  const userName=session?.user?.name||'Super Admin'; const userEmail=session?.user?.email||'admin@karputindo.net'; const role=session?.user?.role||'SUPER_ADMIN'; const initial=userName.charAt(0).toUpperCase();
  return <aside className={cn('relative flex h-full flex-col overflow-hidden border-r border-[#24262d] bg-[#101116] text-white shadow-[8px_0_24px_rgba(0,0,0,0.12)] transition-all duration-300',collapsed?'w-[78px]':'w-[276px]')}>
    <div className={cn('relative z-10 flex shrink-0 items-center border-b border-white/10',collapsed?'h-[88px] justify-center px-2':'h-[122px] justify-center px-4')}>
      {collapsed?<img src="/images/karputindo-icon.png" alt="Karputindo" className="h-12 w-12 rounded-xl object-cover"/>:<div className="flex h-[88px] w-full items-center justify-center rounded-2xl bg-[#f8f9fb] px-3 shadow-sm"><img src="/images/karputindo-logo-sidebar.png" alt="Karputindo Internet Service Provider" className="block h-auto max-h-[78px] w-full object-contain"/></div>}
    </div>
    <nav className="relative z-10 flex-1 overflow-y-auto px-3 pb-3 pt-1"><div className="space-y-1">{menuItems.map(item=>{const active=pathname===item.href||(item.href!=='/admin/dashboard'&&pathname.startsWith(item.href));const content=<Link key={item.href} href={item.href} className={cn('group flex min-h-[48px] items-center gap-4 rounded-[12px] px-5 text-[14px] font-semibold transition-all duration-200',active?'bg-[#e50919] text-white shadow-[0_5px_14px_rgba(229,9,25,0.18)]':'text-[#c9cbd1] hover:bg-white/[0.07] hover:text-white',collapsed&&'justify-center px-0')}><item.icon className={cn('h-[23px] w-[23px] shrink-0',active?'text-white':'text-[#f0f1f3]')}/>{!collapsed&&<span>{item.label}</span>}</Link>;return collapsed?<Tooltip key={item.href} delayDuration={0}><TooltipTrigger asChild>{content}</TooltipTrigger><TooltipContent side="right">{item.label}</TooltipContent></Tooltip>:content;})}</div></nav>
    <div className="relative z-10 shrink-0 px-4 pb-3 pt-2">{!collapsed&&<div className="mb-2 rounded-xl border border-white/10 bg-[#1a1c23] p-3"><div className="flex items-center gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f20d1c,#b80008)] font-bold">{initial}</div><div className="min-w-0"><p className="truncate text-[13px] font-semibold">{userName}</p><p className="mt-0.5 truncate text-[11px] font-semibold text-[#f20d1c]">{role}</p><p className="mt-1 truncate text-[10px] text-gray-400">{userEmail}</p></div></div><button onClick={handleLogout} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#d10a14] bg-black/20 px-3 py-2.5 text-[13px] font-semibold"><LogOut className="h-5 w-5"/>Logout</button></div>}{collapsed&&<Tooltip delayDuration={0}><TooltipTrigger asChild><button onClick={handleLogout} className="flex w-full justify-center py-2.5 text-gray-400"><LogOut className="h-5 w-5"/></button></TooltipTrigger><TooltipContent side="right">Logout</TooltipContent></Tooltip>}<button onClick={()=>setCollapsed(!collapsed)} className={cn('mt-1 flex w-full items-center rounded-lg py-1.5 text-[10px] text-gray-500',collapsed?'justify-center':'justify-end gap-1 px-2')}>{collapsed?<ChevronRight className="h-4 w-4"/>:<><span>Tutup Sidebar</span><ChevronLeft className="h-4 w-4"/></>}</button></div>
  </aside>;
}
