'use client';

import {
  Zap,
  Search,
  Grid2X2,
  Star,
  History,
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Obsidian</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/explorar" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Search className="w-4 h-4" /> Explorar
          </Link>
          <Link href="/colecoes" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Grid2X2 className="w-4 h-4" /> Coleções
          </Link>
          <Link href="/favoritos" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Star className="w-4 h-4" /> Favoritos
          </Link>
          <Link href="/historico" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <History className="w-4 h-4" /> Histórico
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/admin" className="hidden sm:flex">
             <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white gap-2">
                <LayoutDashboard className="w-4 h-4" /> Admin
             </Button>
          </Link>
          <div className="relative group">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary cursor-pointer hover:bg-primary/30 transition-colors">
              JD
            </div>
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-1 z-50">
               <Link href="/favoritos" className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-white hover:bg-white/5 rounded-md">
                  <User className="w-3.5 h-3.5" /> Meu Perfil
               </Link>
               <Link href="/onboarding" className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-white hover:bg-white/5 rounded-md">
                  <User className="w-3.5 h-3.5" /> Preferências
               </Link>
               <div className="h-px bg-white/5 my-1" />
               <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-md">
                  <LogOut className="w-3.5 h-3.5" /> Sair
               </button>
            </div>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-white/10 p-4 space-y-4 animate-in slide-in-from-top-2">
          <Link href="/explorar" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Explorar</Link>
          <Link href="/colecoes" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Coleções</Link>
          <Link href="/favoritos" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Favoritos</Link>
          <Link href="/historico" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Histórico</Link>
          <Link href="/admin" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Painel Admin</Link>
        </div>
      )}
    </header>
  );
}
