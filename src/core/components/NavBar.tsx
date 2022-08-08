import { Link } from "react-router-dom";
import { useCartSummary } from "../store/cart-summary.store";
import { useCart } from "../store/cart.store";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Shop", href: "/shop" },
  { name: "Admin", href: "/login" },
];

export default function NavBar() {
  const openCartSummary = useCartSummary((state) => state.openCartSummary);
  const { totalItems } = useCart();

  return (
    <header className="bg-slate-900 fixed w-full z-20 ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-slate-700 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-10 w-auto"
                src="/images/react-logo.png"
                alt=""
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <div
              className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75 cursor-pointer"
              onClick={openCartSummary}
            >
              Cart ({totalItems()})
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
