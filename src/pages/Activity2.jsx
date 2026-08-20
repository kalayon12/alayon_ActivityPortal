import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Activity2() {
  const [studentName, setStudentName] = useState('');
  const [score, setScore] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const getRemark = (num) => {
    let remark;
    if (num >= 90) {
      remark = 'Excellent';
    } else if (num >= 85) {
      remark = 'Very Good';
    } else if (num >= 80) {
      remark = 'Good';
    } else if (num >= 75) {
      remark = 'Passed';
    } else {
      remark = 'Failed';
    }
    return remark;
  };

  const handleEvaluate = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (studentName.trim().length === 0 || score.trim().length === 0) {
      setError('Please fill in both student name and score.');
      return;
    }

    const numScore = Number(score);

    if (numScore < 0 || numScore > 100) {
      setError('Invalid score. Please enter a value between 0 and 100.');
      return;
    }

    setResult({
      name: studentName,
      score: numScore,
      remark: getRemark(numScore),
    });
  };

  const handleClear = () => {
    setStudentName('');
    setScore('');
    setResult(null);
    setError('');
  };

  return (
    <div className="grade-scene-wrapper">
      <div className="grade-panels-group">
        <div className="grade-form-glass">
          <h5 className="mb-3">Student Grade Evaluation</h5>

          <Form onSubmit={handleEvaluate}>
            <FloatingLabel controlId="studentNameInput" label="Student Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter student name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="scoreInput" label="Score" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Enter score (0-100)"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </FloatingLabel>

            {error && (
              <Alert variant="danger" className="py-2">
                {error}
              </Alert>
            )}

            <Row className="grade-btn-row g-2">
              <Col>
                <Button type="submit" className="grade-btn-primary w-100">
                  Evaluate
                </Button>
              </Col>
              <Col>
                <Button
                  type="button"
                  variant="outline-danger"
                  className="grade-btn-outline w-100"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        {result && (
          <div className="grade-result-glass">
            <div className="label">Student Name</div>
            <div className="value">{result.name}</div>

            <div className="label">Score</div>
            <div className="value">{result.score}</div>

            <div className="label">Remarks</div>
            <div className="value">{result.remark}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activity2;