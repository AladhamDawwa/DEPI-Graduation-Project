import AppLayout from "_core/components/AppLayout";
import {
  BarChart3,
  BookOpen,
  Gauge,
  LayoutGrid,
  Mail,
  Users,
  UserStar,
} from "lucide-react";

const NAV_ITEMS = [
  { path: "/", icon: Gauge, label: "Dashboard" },
  { path: "/students", icon: Users, label: "Students" },
  { path: "/reports", icon: BarChart3, label: "Reports" },
  { path: "/instructors", icon: UserStar, label: "Instructors" },
  { path: "/courses", icon: BookOpen, label: "Courses" },
  { path: "/departments", icon: LayoutGrid, label: "Departments" },
  { path: "/invitations", icon: Mail, label: "Invitations" },
] as const;

export default function Layout() {
  return (
    <AppLayout
      navItems={NAV_ITEMS}
      headerTitle="Administrator Dashboard"
      headerSubtitle="Welcome back, Admin"
    />
  );
}
