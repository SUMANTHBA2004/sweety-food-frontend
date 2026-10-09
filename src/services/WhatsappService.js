export function sendWhatsAppOrderConfirmation(order) {
  if (!order || !order.customer) {
    return;
  }

  const phone = String(order.customer.phone || "").replace(/\D/g, "");

  if (!phone) {
    alert("Customer phone number is missing.");

    return;
  }

  const items = Array.isArray(order.items) ? order.items : [];

  const itemText = items
    .map((item) => {
      const quantity = Number(item.quantity) || 1;

      return `• ${item.name} × ${quantity}`;
    })
    .join("\n");

  const payment =
    order.paymentMethod === "ONLINE" ? "Online Payment" : "Cash on Delivery";

  const paymentStatus = order.paymentStatus === "PAID" ? "PAID" : "PENDING";

  const address = order.deliveryAddress
    ? `${order.deliveryAddress.address}, ${order.deliveryAddress.city} - ${order.deliveryAddress.pincode}`
    : "Not provided";

  const message = `
🍽️ SWEETLY FOOD

✅ ORDER CONFIRMED

Order ID: ${order.orderId}

Hello ${order.customer.name}! 👋

Your food order has been successfully placed.

🛒 ITEMS
${itemText}

💰 BILL
Subtotal: ₹${Number(order.subtotal).toFixed(2)}
Delivery: ${
    Number(order.deliveryFee) === 0
      ? "FREE"
      : `₹${Number(order.deliveryFee).toFixed(2)}`
  }
Total: ₹${Number(order.totalAmount).toFixed(2)}

💳 PAYMENT
Method: ${payment}
Status: ${paymentStatus}

📍 DELIVERY ADDRESS
${address}

📦 Order Status:
${order.orderStatus}

Thank you for ordering from Sweetly Food ❤️
`.trim();

  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/91${phone}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}
