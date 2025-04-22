import { postApiWithToken } from "./api";
import { getUserdata } from "./getuserdata";

export  const checkoutHandler = async (amount) => {
    const userData = await getUserdata()
    const raw = {
        balance: amount,
    }
    const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_PAYMENT_RAZORPAY}`;
    const order = await postApiWithToken(url,raw)
    // console.log("=???????=", order?.data?.data?.order?.amount);
    const options = {
        key:order?.data?.data?.key,
        amount:order?.data?.data?.order?.amount,
        currency: "INR",
        name: "Dynamo Unicorn Chess",
        description: "Dynamo Unicorn Chess of RazorPay",
        image: order?.data?.data?.image,
        order_id: order?.data?.data?.order?.id,
        callback_url: `${import.meta.env.VITE_URL}${import.meta.env.VITE_STATUS_RAZORPAY}/${userData?._id}/${amount}`,
        prefill: {
            name: order?.data?.data?.name,
            email: order?.data?.data?.email,
            contact: order?.data?.data?.mobile,
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#334155"
        }
    };
    const razor = new window.Razorpay(options);
    return razor.open();
}
