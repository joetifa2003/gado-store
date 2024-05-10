
export type productInfo = {
    id: string,
    price: number,
}

export type OrderData = {
    id: string,
    totalPrice: number,
    status: "pending" | "canceled" | "completed",
    productList: productInfo[],
}

class OrdersDao {
    getAll() {
        return [
            {
                id: "xamc-1kao-liqu",
                totalPrice: 90,
                status: "completed",
                productList: [
                    {
                        id: "UWFqLTViZM7aJEyZ1ETF",
                        price: 40
                    },
                    {
                        id: "BQEbVrvBGX75cTRctuqM",
                        price: 20
                    },
                    {
                        id: "zpwflkNvLQYVhJcHUAZs",
                        price: 30
                    }
                ]
            },
            {
                id: "yund-oqiw-1kao",
                totalPrice: 150,
                status: "completed",
                productList: [
                    {
                        id: "UWFqLTViZM7aJEyZ1ETF",
                        price: 40
                    },
                    {
                        id: "BQEbVrvBGX75cTRctuqM",
                        price: 20
                    },
                    {
                        id: "zpwflkNvLQYVhJcHUAZs",
                        price: 30
                    }
                ]
            }
        ]
    }

    getById(id: string) {
        return this.getAll().find((order) => order.id === id);
    }
}

export const orderDao = new OrdersDao();
