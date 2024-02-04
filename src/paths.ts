const paths = {
  homeView() {
    return "/";
  },
  cartView() {
    return "/cart";
  },
  productsView(categoryId: string) {
    return `/products/${categoryId}`;
  },
  paymentsView() {
    return "/payments";
  },
  searchView(term: string) {
    return `/search?term=${term}`;
  },
};

export default paths;
