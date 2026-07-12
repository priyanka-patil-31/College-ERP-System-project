import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { StudentManagement } from "./pages/StudentManagement";
import { AttendanceTracking } from "./pages/AttendanceTracking";
import { FeeManagement } from "./pages/FeeManagement";
import { ExaminationResults } from "./pages/ExaminationResults";
import { FacultyManagement } from "./pages/FacultyManagement";
import { LibraryManagement } from "./pages/LibraryManagement";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/login", Component: LoginPage },
      {
        path: "/",
        Component: DashboardLayout,
        children: [
          { index: true, Component: Dashboard },
          { path: "students", Component: StudentManagement },
          { path: "attendance", Component: AttendanceTracking },
          { path: "fees", Component: FeeManagement },
          { path: "examinations", Component: ExaminationResults },
          { path: "faculty", Component: FacultyManagement },
          { path: "library", Component: LibraryManagement },
        ],
      },
    ],
  },
]);
