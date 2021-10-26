import Image from "next/dist/client/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();

  const allCartsData = useSelector((state) => state.Carts);
  const { cart } = allCartsData;

  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };

  const handleToHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleToCart = (e) => {
    e.preventDefault();
    router.push("../../Carts");
  };

  const handleToMen = (e) => {
    e.preventDefault();
    router.push("../Category/Men's");
  };

  const handleToWomen = (e) => {
    e.preventDefault();
    router.push("../Category/Women's");
  };

  const handleTojewelery = (e) => {
    e.preventDefault();
    router.push("../Category/Jewelery");
  };

  const handleToElectronics = (e) => {
    e.preventDefault();
    router.push("../Category/Electronics");
  };

  return (
    <section className="nav">
      <nav className="navbar">
        <a onClick={handleToHome}>
          <Image src="/image/logo.png" width="170px" height="70px" />
        </a>
        <div className="nav-mid">
          <form>
            <input
              type="text"
              placeholder="Search Product Here..."
              className="input-search"
            />
          </form>

          <ul className="category">
            <li className="nav-item">
              <a onClick={handleToMen}>Men's</a>
            </li>
            <li className="nav-item">
              <a onClick={handleToWomen}>Women's</a>
            </li>
            <li className="nav-item">
              <a onClick={handleToElectronics}>Electronic's</a>
            </li>
            <li className="nav-item">
              <a onClick={handleTojewelery}>Jewelery</a>
            </li>
          </ul>
        </div>

        <ul className="nav-links">
          <li className="nav-item" style={{ width: "200px" }}>
            <a onClick={handleToCart}>
              <FontAwesomeIcon icon={faCartPlus} size="2x" />
              <span class="badge badge-warning" id="lblCartCount">
                {getItemsCount()}
              </span>
            </a>

            <div className="mega-menu">
              {cart.length === 0 ? (
                <center>
                  <h1 style={{ marginTop: "100px" }}>Your Cart is Empty!</h1>
                </center>
              ) : (
                <>
                  {cart.map((item) => (
                    <div className="dropdown-list">
                      <div>
                        <Image src={item.image} height="90" width="65" />
                      </div>

                      <div>
                        <p>{item.title}</p>
                        <p>{item.quantity}</p>
                      </div>

                      <p>$ {item.price}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </li>

          <li className="nav-item">
            <a href="#" style={{ fontSize: "24px" }}>
              Log in
            </a>
          </li>
          <li className="nav-item">
            <a href="#" style={{ fontSize: "24px" }}>
              Sign up
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
