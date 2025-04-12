import Http from "./Http";

export const getProducts = (config) => Http.get("/products", config);
export const getCategory = (id, config) => Http.get(`/categories/${id}`, config);
export const getCategories = (config) => Http.get("/categories", config ) 
export const getProductsCategories = (id, config) => Http.get(`/categories/${id}/products`, config);
export const getProduct = (id, config) => Http.get(`/products/${id}`, config);
export const getCommentsProduct = (id, config) => Http.get(`/products/${id}/comments`, config)
export const createCommentsProduct = (id, data) => Http.post(`/products/${id}/comments`, data)
export const order = (data) => Http.post(`/order`, data);

export const getSliders = (config) => Http.get("/sliders", config);
export const getBanners = (config) => Http.get("/banners",config);
export const registerCustomer = (data) => Http.post("/customers/register",data);
export const loginCustomer = (data) => Http.post("/customers/login", data);