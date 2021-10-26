import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJewelery } from "../../redux/actions/categoryActions";
import { addCarts } from "../../redux/actions/cartActions";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import ProductDetail from "react-modal";
import Head from "next/head";

ProductDetail.setAppElement();

const Products = () => {
  const dispatch = useDispatch();
  const allProductsData = useSelector((state) => state.Products);
  const { loading, error, products } = allProductsData;

  const [descModalIsOpen, setdescModalIsOpen] = useState(false);

  // LOAD DATA
  useEffect(() => {
    dispatch(getJewelery());
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

  return (
    <section>
      <Head>
        <title>Jewelery Category</title>
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
              <button
                className="cart-btn"
                onClick={() =>
                  dispatch(
                    addCarts(productDet),
                    alert("Berhasil menambahkan keranjang " + productDet.title)
                  )
                }
              >
                Add to cart
              </button>
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
                  <button
                    className="cart-btn-card"
                    onClick={() =>
                      dispatch(
                        addCarts(product),
                        alert("Berhasil menambahkan keranjang " + product.title)
                      )
                    }
                  >
                    Add to cart
                  </button>

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
