import { UserData } from "./user";

export type ProductsData = {
  ownerId: string;
  name: string;
  price: number;
  productImage: string;
};

class ProductsDao {
  getAll(): ProductsData[] {
    const products: ProductsData[] = [
      {
        ownerId: "1",
        name: "Product 1",
        price: 10,
        productImage:
          "https://img.freepik.com/free-photo/stone-podium-rock-pedestal-stage-empty-scene-luxury-product-display-natural-background-product-placement-3d-rendering_56104-2146.jpg?t=st=1714941113~exp=1714944713~hmac=ed7c3432e9e94f54f664e3e90c8cd039d56102c3d61fab971a887ba112810aab&w=1060",
      },
      {
        ownerId: "2",
        name: "Product 2",
        price: 20,
        productImage:
          "https://img.freepik.com/free-vector/round-shape-podium-platform-backdrop-with-golden-frame_1017-44771.jpg?t=st=1714941189~exp=1714944789~hmac=24d0e8ca6ec2d581f491f9e2f8720a5ea8fafbe6abea60ae572974d36fcc9109&w=1060",
      },
      {
        ownerId: "3",
        name: "Product 3",
        price: 30,
        productImage:
          "https://img.freepik.com/free-vector/white-studio-background-with-3d-podium-product-display_1017-37978.jpg?t=st=1714941222~exp=1714944822~hmac=6002ccf959e88403b6dea005773ec800054a772243694b8b73474f8a38d4362f&w=1060",
      },
      {
        ownerId: "4",
        name: "Product 4",
        price: 40,
        productImage:
          "https://img.freepik.com/free-photo/stone-podium-rock-pedestal-stage-empty-scene-luxury-product-display-natural-background-product-placement-3d-rendering_56104-2146.jpg?t=st=1714941113~exp=1714944713~hmac=ed7c3432e9e94f54f664e3e90c8cd039d56102c3d61fab971a887ba112810aab&w=1060",
      },
      {
        ownerId: "5",
        name: "Product 5",
        price: 50,
        productImage:
          "https://img.freepik.com/free-vector/round-shape-podium-platform-backdrop-with-golden-frame_1017-44771.jpg?t=st=1714941189~exp=1714944789~hmac=24d0e8ca6ec2d581f491f9e2f8720a5ea8fafbe6abea60ae572974d36fcc9109&w=1060",
      },
      {
        ownerId: "4",
        name: "Product 6",
        price: 76,
        productImage:
          "https://img.freepik.com/free-photo/stone-podium-rock-pedestal-stage-empty-scene-luxury-product-display-natural-background-product-placement-3d-rendering_56104-2146.jpg?t=st=1714941113~exp=1714944713~hmac=ed7c3432e9e94f54f664e3e90c8cd039d56102c3d61fab971a887ba112810aab&w=1060",
      },
      {
        ownerId: "9",
        name: "Product 99",
        price: 50,
        productImage:
          "https://img.freepik.com/free-vector/round-shape-podium-platform-backdrop-with-golden-frame_1017-44771.jpg?t=st=1714941189~exp=1714944789~hmac=24d0e8ca6ec2d581f491f9e2f8720a5ea8fafbe6abea60ae572974d36fcc9109&w=1060",
      },
    ];

    return products;
  }
}

export const productDao = new ProductsDao();

