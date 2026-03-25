"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import { OrganismeProvider } from "@/lib/OrganismeContext";

function OfflineSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/qualiopi", label: "Gestion CFA", icon: "🏢" },
    { href: "/documents", label: "Documents", icon: "📁" },
    { href: "/rapports", label: "Rapports", icon: "📄" },
    { href: "/nda", label: "NDA", icon: "📋" },
    { href: "/parametres", label: "Paramètres", icon: "⚙" },
  ];
  return (
    <>
      <button onClick={() => setOpen(!open)} className="lg:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-md shadow-lg" aria-label="Menu">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>
      {open && <div className="lg:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-40 overflow-y-auto transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shrink-0`}>
        <Link href="/qualiopi" onClick={() => setOpen(false)}>
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-5">
            <h2 className="font-bold text-xl leading-tight">MyQualio</h2>
            <p className="text-sm text-green-200 mt-1">Qualiopi & NDA</p>
          </div>
        </Link>
        <nav className="p-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm mb-1 transition-colors ${pathname === l.href || pathname.startsWith(l.href + "/") ? "bg-primary text-white font-semibold" : "text-dark hover:bg-primary-light hover:text-primary"}`}>
              <span className="text-base">{l.icon}</span>
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [configError, setConfigError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setConfigError(true);
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const { data: { session } } = await getSupabase().auth.getSession();
        setAuthenticated(!!session);
        if (session?.user) {
          setUserId(session.user.id);
          setUserEmail(session.user.email || "");
        }
      } catch {
        setConfigError(true);
        setAuthenticated(false);
      }
      setLoading(false);
    }
    checkAuth();

    const { data: { subscription } } = getSupabase().auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
      if (session?.user) {
        setUserId(session.user.id);
        setUserEmail(session.user.email || "");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    const { error } = await getSupabase().auth.signInWithPassword({ email, password });

    if (error) {
      setLoginError("Identifiants incorrects. Veuillez réessayer.");
      setLoginLoading(false);
    } else {
      setAuthenticated(true);
      router.push("/qualiopi");
    }
  }

  async function handleLogout() {
    await getSupabase().auth.signOut();
    setAuthenticated(false);
    setUserId("");
    setUserEmail("");
    router.push("/");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light-gray">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-text text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  // Mode hors-ligne (sans Supabase) — affiche l'app directement avec la vraie sidebar
  if (configError) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-end gap-3 shrink-0">
            <span className="text-xs bg-orange/10 text-orange px-2 py-1 rounded">Mode hors-ligne</span>
          </div>
          <main className="flex-1 p-6 lg:p-10 overflow-y-auto pb-20">
            {children}
          </main>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">MyQualio</h1>
            <p className="text-green-200 mt-2 text-lg">Votre assistant Qualiopi & NDA</p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-xl font-bold text-primary text-center mb-6">Connexion</h2>

            {loginError && (
              <div className="bg-red-50 text-red-600 border border-red-200 rounded px-4 py-2 mb-4 text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-primary mb-1">Email :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-primary mb-1">Mot de passe :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
                  placeholder="Votre mot de passe"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loginLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>

          <p className="text-center text-green-200/70 text-xs mt-6">Accès réservé - MyQualio v1.0</p>
        </div>
      </div>
    );
  }

  return (
    <OrganismeProvider userId={userId}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-end gap-3 shrink-0">
            <span className="text-xs text-gray-text">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-red hover:bg-red/80 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
            >
              Déconnexion
            </button>
          </div>
          <main className="flex-1 p-6 lg:p-10 overflow-y-auto pb-20">
            {children}
          </main>
        </div>
      </div>
    </OrganismeProvider>
  );
}
