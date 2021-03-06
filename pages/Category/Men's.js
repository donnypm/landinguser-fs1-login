import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMen } from "../../redux/actions/categoryActions";
import { addCarts } from "../../redux/actions/cartActions";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import ProductDetail from "react-modal";
import Head from "next/head";
import Swal from "sweetalert2";
import { useRouter } from "next/dist/client/router";

ProductDetail.setAppElement();

const Products = () => {
  const dispatch = useDispatch();
  const allProductsData = useSelector((state) => state.Products);
  const { loading, error, products } = allProductsData;

  const [descModalIsOpen, setdescModalIsOpen] = useState(false);

  // LOAD DATA
  useEffect(() => {
    dispatch(getMen());
  }, []);

  // SEARCH TITLE
  const [inputSearch, setInputSearch] = useState("");

  const handleChangeEdit = (e) => {
    let data = { ...userEdit };
    data[e.target.name] = e.target.value;
    setUserEdit(data);
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setInputSearch(e.target.value);
  };

  // Product Detail
  const [productDet, setProductDet] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
    rating: "",
    count: "",
  });

  const handleEdit = (product) => {
    setProductDet({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      rating: product.rating.rate,
      count: product.rating.count,
    });
    console.log("Product = " + product.id);
  };

  // JIKA INGIN ADD TO CART USER HARUS LOGIN DAHULU
  const usersData = useSelector((state) => state.isLogin);
  const { users } = usersData;

  const router = useRouter();

  const handleToLogin = (e) => {
    e.preventDefault();
    router.push("/Login");
  };

  return (
    <section>
      <Head>
        <title>Men's Category</title>
      </Head>

      {/* MODAL PRODUCT DETAIL BILA LIST PRODUCT DI KLIK AKAN MUNCUL DETAIL PRODUCT */}
      <ProductDetail
        isOpen={descModalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "100px",
            left: "100px",
            right: "100px",
            bottom: "20px",
          },
        }}
      >
        <button
          onClick={() => setdescModalIsOpen(false)}
          style={{ float: "right" }}
          className="button-ud"
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "red" }}
          />
        </button>
        <section className="product-detail">
          <div className="left-column">
            <Image
              src={productDet.image}
              alt="A image of product"
              width={400}
              height={450}
            />
          </div>

          <div className="right-column">
            <div className="product-description">
              <h1 style={{ textAlign: "justify" }}>{productDet.title}</h1>
              <span>
                {productDet.rating} | {productDet.count}
              </span>
              <h1>$ {productDet.price}</h1>
              <p style={{ textAlign: "justify" }}>{productDet.description}</p>
            </div>

            <div className="add-to-cart">
              {users ? (
                <button
                  className="cart-btn"
                  onClick={() =>
                    dispatch(
                      addCarts(productDet),
                      Swal.fire(
                        "Berhasil Menambah Keranjang!",
                        "Product " +
                          productDet.title +
                          " Berhasil di Tambahkan!",
                        "success"
                      )
                    )
                  }
                >
                  Add to cart
                </button>
              ) : (
                <button className="cart-btn" onClick={handleToLogin}>
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </section>
      </ProductDetail>

      <section className="product">
        {loading
          ? "Loading..."
          : error
          ? error.message
          : products.map((product) => (
              <div className="card" key={product.id}>
                {/* LIST PRODUCT */}

                <div className="card-image">
                  <img
                    src={product.image}
                    alt="A image of product"
                    width={100}
                    height={140}
                  />
                </div>

                <div className="text">
                  <p>{product.title}</p>
                  <p>$ {product.price}</p>
                  <p>
                    {product.rating.rate} | {product.rating.count}
                  </p>
                </div>
                <div className="atc-card">
                  {users ? (
                    <button
                      className="cart-btn-card"
                      onClick={() =>
                        dispatch(
                          addCarts(product),
                          Swal.fire(
                            "Berhasil Menambah Keranjang!",
                            "Product " +
                              product.title +
                              " Berhasil di Tambahkan!",
                            "success"
                          )
                        )
                      }
                    >
                      Add to cart
                    </button>
                  ) : (
                    <button className="cart-btn-card" onClick={handleToLogin}>
                      Add to cart
                    </button>
                  )}

                  <a
                    onClick={() =>
                      setdescModalIsOpen(true) & handleEdit(product)
                    }
                  >
                    <button className="btn-detail">Detail Product</button>
                  </a>
                </div>
              </div>
            ))}
      </section>
    </section>
  );
};

export default Products;
