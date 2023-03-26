import Root from "./Root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {/* <Route index element={<Home />} />
       <Route path="create" element={<Create />} />
       <Route path="profile" element={<Profile />} />
       <Route path="setting" element={<Setting />} />
       <Route path="logout" element={<Logout />} /> */}
      {/* ... etc. */}
    </Route>
  )
);


function App() {

  return (
      <RouterProvider router={router} />
  );
}

export default App;
