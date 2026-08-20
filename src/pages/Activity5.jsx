import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Placeholder from 'react-bootstrap/Placeholder';

const IMAGES = {
  default: 'https://c4.wallpaperflare.com/wallpaper/737/864/0/adventure-time-finn-the-human-wallpaper-preview.jpg',
  ontime: 'https://c4.wallpaperflare.com/wallpaper/65/893/249/jake-jake-adventure-time-adventure-time-wallpaper-preview.jpg',
  late: 'https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/9/97/S1e25_Finn_with_five_fingers.png/revision/latest/scale-to-width-down/732?cb=20131128031157',
  verylate: 'https://c4.wallpaperflare.com/wallpaper/724/39/669/adventure-time-cartoon-finn-the-human-wallpaper-preview.jpg',
};

function Activity5() {
  const [employeeName, setEmployeeName] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);

  const checkAttendance = (time) => {
    let status, label, message, variant, imgKey;

    if (time <= 7) {
      status = 'ontime';
      label = 'On Time';
      message = 'Status: On Time – Good job!';
      variant = 'success';
      imgKey = 'ontime';
    } else if (time <= 8) {
      status = 'late';
      label = 'Late';
      message = 'Status: Late – Please be on time tomorrow.';
      variant = 'warning';
      imgKey = 'late';
    } else {
      status = 'verylate';
      label = 'Very Late';
      message = 'Status: Very Late – Report to your supervisor.';
      variant = 'danger';
      imgKey = 'verylate';
    }

    return { status, label, message, variant, imgKey };
  };

  const handleCheck = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (employeeName.trim().length === 0 || timeIn.trim().length === 0) {
      setError('Please fill in both employee name and time in.');
      return;
    }

    // timeIn comes from <input type="time"> as "HH:MM" (24-hour), e.g. "06:30"
    const [hoursStr, minutesStr] = timeIn.split(':');
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      setError('Invalid time. Please select a valid time (e.g. 6:30 AM).');
      return;
    }

    const time = hours + minutes / 60;

    const evaluation = checkAttendance(time);

    setImgLoaded(false);
    setResult({
      name: employeeName,
      time,
      ...evaluation,
    });
  };

  const handleReset = () => {
    setEmployeeName('');
    setTimeIn('');
    setResult(null);
    setError('');
  };

  const currentImage = result ? IMAGES[result.imgKey] : IMAGES.default;

  const formatTime = (decimalHours) => {
    const h = Math.floor(decimalHours);
    const m = Math.round((decimalHours - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  return (
    <Container fluid className="attend-page-wrapper">
      <Row className="attend-card g-0">
        {/* TOP: Finn image */}
        <Col md={12} className="attend-card-top p-0">
          {!imgLoaded && (
            <Placeholder as="div" animation="wave" className="attend-img-placeholder">
              <Placeholder xs={12} className="attend-img-placeholder-block" />
            </Placeholder>
          )}
          <img
            src={currentImage}
            alt="Finn attendance status"
            onLoad={() => setImgLoaded(true)}
            style={{ display: imgLoaded ? 'block' : 'none' }}
          />
        </Col>

        {/* BOTTOM: Form */}
        <Col md={12} className="attend-card-bottom">
          <h3>Employee Attendance Checker</h3>
          <p className="subtitle">Classify a decimal time-in value as On Time, Late, or Very Late.</p>

          <Form onSubmit={handleCheck}>
            <FloatingLabel controlId="employeeNameInput" label="Employee Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter employee name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="timeInInput" label="Time In" className="mb-3">
              <Form.Control
                type="time"
                placeholder="Select time in"
                value={timeIn}
                onChange={(e) => setTimeIn(e.target.value)}
              />
            </FloatingLabel>

            {error && (
              <Alert variant="danger" className="py-2">
                {error}
              </Alert>
            )}

            <Row className="attend-btn-row g-2">
              <Col>
                <Button type="submit" className="attend-btn-primary w-100">
                  Check Attendance
                </Button>
              </Col>
              <Col>
                <Button
                  type="button"
                  variant="outline-secondary"
                  className="attend-btn-outline w-100"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>

          {result && (
            <Alert variant="light" className={`attend-result ${result.status}`}>
              <div className="attend-result-row">
                <span>Employee Name</span>
                <span>{result.name}</span>
              </div>
              <div className="attend-result-row">
                <span>Time In</span>
                <span>{formatTime(result.time)}</span>
              </div>
              <div className="attend-result-row">
                <span>Attendance Status</span>
                <span>{result.label}</span>
              </div>
              <div className={`attend-message ${result.status}`}>{result.message}</div>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Activity5;