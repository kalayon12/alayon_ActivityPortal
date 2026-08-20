import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Placeholder from 'react-bootstrap/Placeholder';
import flameNormal from '../assets/flame-princess-high.png';
import flameHigh from '../assets/Flame_princess.png';

// 👉 Palitan ang mga path na ito ng sarili mong laman ng src/assets folder
// import flameNormal from '../assets/flame-normal.jpg';
// import flameHigh from '../assets/flame-high.jpg';

const IMAGES = {
  default: 'https://c4.wallpaperflare.com/wallpaper/522/68/956/adventure-time-fantasy-girl-red-background-flame-princess-wallpaper-preview.jpg',
  normal: '/src/assets/Flame_princess.png', // palitan gamit ang imported variable pag ready na
  high: '/src/assets/flame-princess-high.png',     // palitan gamit ang imported variable pag ready na
};

function Activity4() {
  const [customerName, setCustomerName] = useState('');
  const [consumption, setConsumption] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);
 
  const getRate = (kwh) => {
    let rate;
    if (kwh <= 100) {
      rate = 10;
    } else if (kwh <= 200) {
      rate = 12;
    } else if (kwh <= 300) {
      rate = 15;
    } else {
      rate = 18;
    }
    return rate;
  };
 
  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
 
    if (customerName.trim().length === 0 || consumption.trim().length === 0) {
      setError('Please fill in both customer name and consumption.');
      return;
    }
 
    if (customerName.trim().length < 2) {
      setError('Customer name must be at least 2 characters long.');
      return;
    }
 
    const kwh = Number(consumption);
 
    if (kwh < 0) {
      setError('Invalid consumption. Please enter a positive number.');
      return;
    }
 
    const rate = getRate(kwh);
    const totalBill = kwh * rate;
    const status = totalBill >= 5000 ? 'high' : 'normal';
 
    setImgLoaded(false);
    setResult({
      name: customerName,
      kwh,
      rate,
      totalBill,
      status,
    });
  };
 
  const handleClear = () => {
    setCustomerName('');
    setConsumption('');
    setResult(null);
    setError('');
  };
 
  const currentImage = result ? IMAGES[result.status] : IMAGES.default;
 
  return (
    <Container fluid className="bill-page-wrapper">
      <Row className="bill-card g-0">
        {/* LEFT: Flame Princess */}
        <Col md={6} className="bill-card-left p-0">
          {!imgLoaded && (
            <Placeholder as="div" animation="wave" className="bill-img-placeholder">
              <Placeholder xs={12} className="bill-img-placeholder-block" />
            </Placeholder>
          )}
          <img
            src={currentImage}
            alt="Flame Princess status"
            onLoad={() => setImgLoaded(true)}
            style={{ display: imgLoaded ? 'block' : 'none' }}
          />
        </Col>
 
        {/* RIGHT: Form */}
        <Col md={6} className="bill-card-right">
          <h3>Electricity Bill Calculator</h3>
          <p className="subtitle">Compute a bill from kWh consumption across tiered rates.</p>
 
          <Form onSubmit={handleCalculate}>
            <FloatingLabel controlId="customerNameInput" label="Customer Name" className="mb-1">
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </FloatingLabel>
            <div className="bill-char-count">Name length: {customerName.length}</div>
 
            <FloatingLabel controlId="consumptionInput" label="Consumption (kWh)" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Enter consumption"
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
              />
            </FloatingLabel>
 
            {error && (
              <Alert variant="danger" className="py-2">
                {error}
              </Alert>
            )}
 
            <Row className="bill-btn-row g-2">
              <Col>
                <Button type="submit" className="bill-btn-primary w-100">
                  Calculate Bill
                </Button>
              </Col>
              <Col>
                <Button
                  type="button"
                  variant="outline-secondary"
                  className="bill-btn-outline w-100"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
 
          {result && (
            <Alert variant="light" className={`bill-result ${result.status}`}>
              <div className="bill-result-row">
                <span>Customer Name</span>
                <span>{result.name}</span>
              </div>
              <div className="bill-result-row">
                <span>Consumption</span>
                <span>{result.kwh} kWh</span>
              </div>
              <div className="bill-result-row">
                <span>Rate Applied</span>
                <span>₱{result.rate} / kWh</span>
              </div>
              <div className="bill-result-row">
                <span>Total Bill</span>
                <span>₱{result.totalBill.toLocaleString()}</span>
              </div>
              <div className={`bill-status ${result.status}`}>
                {result.status === 'high' ? 'High Electricity Usage' : 'Normal Electricity Usage'}
              </div>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
 
export default Activity4;