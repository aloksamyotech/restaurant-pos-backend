const getChefAssignmentEmailTemplate = (userName) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
    <h2 style="color: #28a745;">New Order Assigned!</h2>
    <p>Dear <strong>${userName}</strong>,</p>
    <p>You have been assigned a new order.</p>
    <p>Please review the order details and start preparation as soon as possible.</p>
    <p>For any queries, contact the kitchen manager.</p>
    <p style="margin-top: 20px;">Happy Cooking! 🍽️</p>
    <p>Best Regards,<br/> Samyotech Team</p>
  </div>
`;

export default getChefAssignmentEmailTemplate;
