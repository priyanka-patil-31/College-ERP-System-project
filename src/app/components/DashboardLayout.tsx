import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  DollarSign,
  FileText,
  UserCheck,
  BookOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Students", path: "/students", icon: Users },
  { name: "Attendance", path: "/attendance", icon: ClipboardCheck },
  { name: "Fee Management", path: "/fees", icon: DollarSign },
  { name: "Examinations", path: "/examinations", icon: FileText },
  { name: "Faculty", path: "/faculty", icon: UserCheck },
  { name: "Library", path: "/library", icon: BookOpen },
];

export function DashboardLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — mobile */}
      <aside
        className={`app-sidebar fixed top-0 left-0 h-full text-sidebar-foreground w-64 z-50 transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="brand-mark p-2 rounded-xl">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold">College ERP</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-white shadow-sm"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full border-sidebar-border bg-transparent text-white hover:bg-sidebar-accent" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Sidebar — desktop (collapsible) */}
      <aside
        className="app-sidebar hidden lg:flex fixed top-0 left-0 h-full text-sidebar-foreground z-50 flex-col transition-all duration-300"
        style={{ width: desktopSidebarOpen ? "16rem" : "4rem" }}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border min-h-[72px]">
            {desktopSidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="brand-mark p-2 rounded-xl shrink-0">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold whitespace-nowrap">College ERP</span>
              </div>
            )}
            {!desktopSidebarOpen && (
                <div className="brand-mark p-2 rounded-xl mx-auto">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={!desktopSidebarOpen ? item.name : undefined}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    desktopSidebarOpen ? "" : "justify-center"
                  } ${
                    isActive
                      ? "bg-sidebar-accent text-white shadow-sm"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {desktopSidebarOpen && (
                    <span className="whitespace-nowrap">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User profile */}
          <div className="p-2 border-t border-sidebar-border">
            {desktopSidebarOpen ? (
              <div className="px-1 mb-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-sidebar-border bg-transparent text-white hover:bg-sidebar-accent" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <button
                onClick={logout}
                title="Logout"
                className="w-full flex justify-center p-2 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className="transition-all duration-300"
        style={{ paddingLeft: desktopSidebarOpen ? "16rem" : "4rem" }}
      >
        {/* Header */}
        <header className="workspace-header border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Desktop hamburger — always visible */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex"
              onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-lg font-semibold tracking-tight lg:hidden">College ERP</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="page-enter p-4 lg:p-8 max-w-[1600px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
