import React from 'react';
import '../css/PurchaseCompleted.scss';

const PurchaseCompleted = () => {
  return (
    <div className="purchase-confirmation-page">
      <header className="header">
        <h1>Thank You for Your Purchase!</h1>
      </header>

      <main className="main-content">
        <section className="message-section">
          <p className="confirmation-message">
            Your order has been successfully placed. A confirmation email has been sent to your provided email address.
          </p>
          <p className="order-details">
            You can expect your product to arrive within 3-5 business days. Thank you for choosing us!
          </p>
        </section>

        <section className="navigation-section">
          <button className="home-button" onClick={() => window.location.href = '/'}>
            Back to Home
          </button>
          <button className="shop-more-button" onClick={() => window.location.href = '/shop'}>
            Shop More Products
          </button>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Product Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PurchaseCompleted;
