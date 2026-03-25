"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import { OrganismeProvider } from "@/lib/OrganismeContext";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await getSupabase().auth.getSession();
        setAuthenticated(!!session);
        if (session?.user) {
          setUserId(session.user.id);
          setUserEmail(session.user.email || "");
        }
      } catch {
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
