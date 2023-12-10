import React, { Component, useState } from "react";
import { Button, Image, Card, Icon, Container } from "semantic-ui-react";
import ProductCardModal from "./ProductCardModal";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
  },
};

function ProductCard() {
  const [image, setImage] = React.useState("/Thumbnail.jpg");
  const [productName, setProductName] = React.useState("Dallara IR18 - Monza");
  const [productDesc, setProductDesc] = React.useState(
    "1:31.0 Quali / 1:31.8 Race",
  );
  const [openModal, setOpenModal] = React.useState(false);
  const [interest, setInterests] = React.useState("176");

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <Card>
        <Image src={image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{productName}</Card.Header>
          <Card.Meta>
            <span className="date">{productDesc}</span>
          </Card.Meta>
          <Card.Description style={{ textAlign: "center" }}>
            <div className="container">
              <Button
                style={{ margin: "5px", width: "120px", fontSize: "smaller" }}
                onClick={handleOpen}
              >
                <Image src="/setsBaseIcon.png" style={{ width: "15px" }} />
                Setsbase
              </Button>
              <Button
                style={{ margin: "5px", width: "120px", fontSize: "smaller" }}
              >
                <Image src="/popometerIcon.png" style={{ width: "15px" }} />
                Popometer
              </Button>
            </div>
          </Card.Description>
        </Card.Content>
        <Card.Content style={{ textAligh: "right" }} extra>
          <Button style={{ margin: "5px", width: "120px", fontSize: "small" }}>
            <Icon name="pencil" /> Notes
          </Button>
          <a style={{ margin: "5px" }}>
            <Icon name="thumbs up" />
            {interest} Interests
          </a>
        </Card.Content>
      </Card>
      <ProductCardModal open={openModal} onClose={handleClose} />
    </div>
  );
}
export default ProductCard;
