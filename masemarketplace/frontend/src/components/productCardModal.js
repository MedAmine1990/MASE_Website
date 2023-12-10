import React, { useState, useEffect } from "react";
import { Modal, Button, Icon, Header } from "semantic-ui-react";

const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 7; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const ProductCardModal = ({ open, onClose }) => {
  const [promoCode, setPromoCode] = useState("");
  const [showPromoCode, setShowPromoCode] = useState(false);

  useEffect(() => {
    // Generate and set promo code when the modal opens
    setPromoCode(generateRandomCode());
  }, [open]);

  const redirectToLink = () => {
    // Replace 'YOUR_LINK_HERE' with the actual link you want to redirect to
    window.location.href = "YOUR_LINK_HERE";
  };

  const handleShowPromoCode = () => {
    setShowPromoCode(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      alert("Promo code copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <div className="ProductCardModal">
      <Modal open={open} onClose={onClose} size="tiny">
        <Header content="Setsbase promo code" />
        <Modal.Content textAlign="center">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {showPromoCode ? (
              <>
                <h2>{promoCode}</h2>
                <Button
                  onClick={copyToClipboard}
                  verticalAlign="middle" // Center the text vertically
                >
                  <Icon name="copy" />
                  Copy!
                </Button>
              </>
            ) : (
              <Button
                primary // Set color to primary
                icon="eye"
                labelPosition="right"
                content="Show Promo Code"
                onClick={handleShowPromoCode}
              />
            )}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary // Set color to primary
            disabled={!showPromoCode}
            onClick={redirectToLink}
          >
            <Icon name="linkify" /> Redeem Now
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ProductCardModal;
