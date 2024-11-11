const allEndpoints = {
    admin: {
        request: {
            viewRequest: "admin/view-requests",
            updateRequest: "admin/update-request"
        },
        user: {
            viewUsers: "admin/view-users",
            deactivate: "admin/deactivate-user"
        },
        brand: {
            viewBrands: "/admin/brands",
        }
    },
    user: {
        profile: "/user/:userId/profile",
        personalInfo: "/user/:userId/personal-info",
        wishList: "/user/:userId/wish-list-products",
        following: "/user/:userId/following", 
        followers: "/user/:userId/followers",
        cart: {
            viewCart: "/user/:userId/cart-list",
            addCart: "/user/:userId/add-to-cart",
            removeAllCartItems: "/user/:userId/remove-all", 
            removeCartItem: "/user/:userId/cart/:cartId"
        },
        addAddress: "/user/:userId/add-address",
        order: {
            orderList: "/user/:userId/orders",
            orderDetail: "/user/:userId/orders/:orderId", 
            cancelOrder: "/user/:userId/orders/:orderId/cancel", 
            returnOrder: "/user/:userId/orders/:orderId/return" 
        }
    },
    brand: {
        addInfluencer: "/brand/:brandId/add-influencer",
        viewBasicDetail: "/brand/:brandId/view-basic-detail", 
        viewJoinedInfluencer: "/brand/:brandId/view-influencer",
        viewReviews: "/brand/:brandId/view-reviews",
        viewSales: "/brand/:brandId/sales-report",
        progressReport: "/brand/:brandId/progress", 
        product: {
            viewProducts: "/brand/:brandId/view-products",
            inventory: "/brand/:brandId/inventory-report-overview",
            categoryWiseInventory: "/brand/:brandId/:categoryId/view-report",
            specificProductInventory: "/brand/:brandId/:productId/inventory",
            productSoldToday: "/brand/:brandId/sold-products-report",
            specificProductSoldReport: "/brand/:brandId/:productId/sold-product-report" 
        },
        order: {
            viewOrder: "/brand/:brandId/view-orders",
            updateOrderStatus: "/brand/:brandId/update-order-status/:orderId"
        },
        return: {
            viewReturn: "/brand/:brandId/view-returns",
            updateReturnStatus: "/brand/:brandId/update-return-status/:returnId"
        },
        safetyClaim: {
            viewSafetyClaim: "/brand/:brandId/view-safetyclaims",
            updateSafetyClaimStatus: "/brand/:brandId/update-safety-claim-status/:safetyClaimId"
        },
        payment: {
            viewPayments: "/brand/:brandId/view-payments",
        }
    },
    influencer: {
        productPromote:"/influencer/:influencerId/product-promote",
        profileReachReport:"/influencer/:influencerId/reach-report",
        brandApproached:"/influencer/:influencerId/brand-approch",
        sales:"influencer/:influencerId/sales-report",
        addBrands:"/add-brands",
        addHighLights:"/add-highlights",
        orders:"/orders/influencer-orders/:influencerId",
        paymenst:'/influencer/payments'
    },
    product: {
        addProduct:"/products",
        updateProduct:'/products/:id',
        getProductDetail:"/product/:id",
        deleteProduct:'/product/:id',
        otherCuratorsByProduct:'/product/other-curators/:id'

    }
};
