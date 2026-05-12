import { Badge } from "_core/components/ui/badge";
import { Button } from "_core/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "_core/components/ui/tooltip";
import { useAuthStore } from "_core/store/authStore";
import {
  BarChart3,
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Gauge,
  LayoutGrid,
  LogOut,
  Mail,
  Users,
  UserStar,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

const NAV_ITEMS = [
  { path: "/", icon: Gauge, label: "Dashboard" },
  { path: "/students", icon: Users, label: "Students" },
  { path: "/reports", icon: BarChart3, label: "Reports" },
  { path: "/instructors", icon: UserStar, label: "Instructors" },
  { path: "/courses", icon: BookOpen, label: "Courses" },
  { path: "/departments", icon: LayoutGrid, label: "Departments" },
  { path: "/invitations", icon: Mail, label: "Invitations" },
] as const;

const BRAND_HEIGHT = "h-[65px]";

function NavItem({
  path,
  icon: Icon,
  label,
  active,
  collapsed,
}: {
  path: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={path}
          className={`group relative flex items-center rounded-lg text-sm font-medium transition-all duration-150 ${
            collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
          } ${
            active
              ? "bg-indigo-50 text-indigo-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {active && !collapsed && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-600 rounded-full" />
          )}
          <Icon
            className={`w-5 h-5 shrink-0 transition-transform duration-150 group-hover:scale-110 ${
              active ? "text-indigo-600" : "text-gray-400"
            }`}
          />
          {!collapsed && <span>{label}</span>}
        </Link>
      </TooltipTrigger>
      {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  );
}

function Sidebar({
  items,
  activeCheck,
  onLogout,
  collapsed,
  onToggle,
}: {
  items: typeof NAV_ITEMS;
  activeCheck: (path: string) => boolean;
  onLogout: () => void;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <aside
      className={`${
        collapsed ? "w-[65px]" : "w-60"
      } bg-white border-r border-gray-100 flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden`}
    >
      {/* Brand — same height as header */}
      <div
        className={`${BRAND_HEIGHT} flex items-center border-b border-gray-100 shrink-0 ${
          collapsed ? "justify-center px-3" : "justify-between px-4"
        }`}
      >
        {!collapsed && (
          <div className="flex items-center gap-2.5 min-w-0">
            <img src="/logo.svg" alt="Smart Campus" className="h-8 w-auto max-w-[140px] object-contain" />
          </div>
        )}

        {collapsed && (
          <img src="/icon.svg" alt="Smart Campus" className="w-8 h-8 object-contain" />
        )}

        {!collapsed && (
          <button
            onClick={onToggle}
            className="ml-2 w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {items.map((item) => (
          <NavItem
            key={item.path}
            {...item}
            active={activeCheck(item.path)}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-100 px-2 py-3 shrink-0">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center px-2 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-150 group"
              >
                <LogOut className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-150 group"
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}

function Header({
  collapsed,
  onExpandSidebar,
}: {
  collapsed: boolean;
  onExpandSidebar: () => void;
}) {
  return (
    <header
      className={`${BRAND_HEIGHT} bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {collapsed && (
          <button
            onClick={onExpandSidebar}
            className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
        <div>
          <h2 className="text-[15px] font-semibold text-gray-900 leading-tight">
            Administrator Dashboard
          </h2>
          <p className="text-xs text-gray-400">Welcome back, Admin</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        >
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center p-0 bg-rose-500 text-white text-[10px] leading-none border-2 border-white">
            3
          </Badge>
        </Button>

        <Link
          to="/profile"
          aria-label="Open profile"
          className="flex items-center gap-2.5 pl-3 border-l border-gray-100 hover:opacity-80 transition-opacity"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800 leading-tight">
              Admin
            </p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center ring-2 ring-indigo-100">
            <span className="text-white text-sm font-semibold">A</span>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default function Layout() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        items={NAV_ITEMS}
        activeCheck={isActive}
        onLogout={logout}
        collapsed={collapsed}
        onToggle={() => setCollapsed(true)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          collapsed={collapsed}
          onExpandSidebar={() => setCollapsed(false)}
        />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
