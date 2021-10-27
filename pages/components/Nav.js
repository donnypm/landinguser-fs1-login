import Image from "next/dist/client/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/CartPage.module.scss";
import { searchProducts } from "../../redux/actions/searchProducts";
import { useState, useEffect } from "react";
import { logoutUser } from "../../redux/actions/loginActions";
import Cookies from "js-cookie";

const Nav = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const allCartsData = useSelector((state) => state.Carts);
  const { cart } = allCartsData;

  // const login = useSelector(state => state.isLogin)

  // const {users} = login

  // console.log(users)

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

  const handleToLogin = (e) => {
    e.preventDefault();
    router.push("/Login");
  };

  //LOGIN LOGOUT
  const usersData = useSelector((state) => state.isLogin);
  const { users} = usersData;

  console.log(usersData)

  //SEARCH PRODUCT
  const [search, setSearch] = useState("");

  const logout = () => {
    // e.preventDefault;
    dispatch(logoutUser());
    Cookies.remove('token')
    router.push('/Login')
  };

  useEffect(() => {
    dispatch(searchProducts(search));
  }, [search, dispatch]);

  return (
    <div>
      <nav className="nav-bar">
        <ul className="ul-nav">
          <a onClick={handleToHome}>
            <Image src="/image/logo.png" width="170px" height="70px" />
          </a>

          <div className="nav-mid">
            <form>
              <input
                type="text"
                placeholder="Search Product Here..."
                className="input-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <div className="category">
              <li>
                <a onClick={handleToMen} style={{ marginLeft: "0px" }}>
                  Men's
                </a>
              </li>
              <li>
                <a onClick={handleToWomen}>Women's</a>
              </li>
              <li>
                <a onClick={handleToElectronics}>Electronic's</a>
              </li>
              <li>
                <a onClick={handleTojewelery}>Jewelery</a>
              </li>
            </div>
          </div>

          <div className="nav-right">
            <li>
              <a>
                <FontAwesomeIcon icon={faCartPlus} size="2x" />
                <span className="badge badge-warning" id="lblCartCount">
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
                    <div className="header-navcart">
                      <h1>Cart</h1>
                      <h1>
                        <a onClick={handleToCart} style={{ color: "#FF5A5A" }}>
                          See All
                        </a>
                      </h1>
                    </div>
                    <hr style={{ border: "solid 2px" }} />
                    {cart.map((item) => (
                      <div className="mega-menu-content">
                        <div className={styles.image}>
                          <Image src={item.image} height="90" width="65" />
                        </div>

                        <div style={{ width: "300px" }}>
                          <p style={{ textAlign: "justify" }}>
                            {item.title} <br />
                            {item.quantity} pcs
                          </p>
                        </div>

                        <p>$ {item.price}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </li>

            {users ? (
              <li>
                <a onClick={logout} style={{ fontSize: "24px" }}>
                  LogOut
                </a>
              </li>
            ) : (
              <li>
                <a onClick={handleToLogin} style={{ fontSize: "24px" }}>
                  LogIn
                </a>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
