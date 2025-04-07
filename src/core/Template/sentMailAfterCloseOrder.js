export const sentMailAfterCloseOrder = (totalPrice) => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007bff;">Your Order Has Been Successfully Closed</h2>
        <p>Dear Valued Customer,</p>
        <p>We are pleased to inform you that your order has been successfully processed and closed.</p>
        
        <h3 style="color: #28a745;">Total Amount: $${totalPrice.toFixed(2)}</h3>
  
        <p>Thank you for choosing our services. If you have any questions or concerns, feel free to reach out to our support team.</p>
        
        <p>Best regards,</p>
        <p><strong>Samyotech Team</strong></p>
        <p><em>Customer Support Team</em></p>
      </div>
    `;
  };
  