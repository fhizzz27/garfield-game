import React, { useState } from "react";
import { Container, Card, ListGroup, Modal, Button } from "react-bootstrap";
import "./AirdropPage.css";

const AirdropPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleWithdrawalClick = () => {
    setShowModal(true); // Menampilkan modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Menutup modal
  };

  return (
    <Container className="airdrop-page">
      <div className="header">
        <img src="/images/Garfield_2.png" alt="Tree Icon" className="image-3d mb-3" />
        <h2>Listing date</h2>
        <h3>February, 2025</h3>
      </div>
      <div className="tab-buttons">
        <button className="tab-button">Points</button>
        <button className="tab-button" onClick={handleWithdrawalClick}>
          Withdrawal
        </button>
      </div>
      <div className="box-Airdrop">
        <div className="box-1">
          <img src="/images/GarfieldBOT.png" alt="GRF" className="image-1" />
          <div className="text-box-container">
            <h4>GRF Income</h4>
            <p>Login daily, Earn </p>
          </div>
        </div>
      </div>
      <div className="box-Airdrop">
        <div className="box-2">
          <img src="/images/friendsimage.png" alt="GRF" className="image-1" />
          <div className="text-box-container">
            <h4>Friends</h4>
            <p>The more you bring, The bigger we grow </p>
          </div>
        </div>
      </div>
      <div className="box-Airdrop">
        <div className="box-3">
          <img src="/images/Tonlogo.png" alt="GRF" className="image-1" />
          <div className="text-box-container">
            <h4>Transaction TON</h4>
            <p>Make a Deposite TON, Earn More </p>
          </div>
        </div>
      </div>
      <div className="box-Airdrop">
        <div className="box-4">
          <img src="/images/iconic.png" alt="GRF" className="image-1" />
          <div className="text-box-container">
            <h4>Garfield Subscription</h4>
            <p>Telegram, Youtube , X</p>
          </div>
        </div>
      </div>
      <div className="box-Airdrop">
        <div className="box-5">
          <img src="/images/task3d.png" alt="GRF" className="image-1" />
          <div className="text-box-container">
            <h4>Task</h4>
            <p>Complete a task to earn more points</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Garfield Says</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Cooming soon Lets Farm Together & Earn more</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AirdropPage;
