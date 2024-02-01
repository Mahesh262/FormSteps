import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

function StepForm() {
    const [currentPage, setCurrentPage] = useState(1);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            address: '',
            city: '',
            paymentMethod: ''
        },
        onSubmit: (values) => {
            // Perform submission logic here
            alert("Success");
            console.log(values);
        },
        validate: (values) => {
            const errors = {};
            if (!values.fullName) {
                errors.fullName = 'Required';
            }
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.address) {
                errors.address = 'Required';
            }
            if (!values.city) {
                errors.city = 'Required';
            }
            if (!values.paymentMethod) {
                errors.paymentMethod = 'Required';
            }
            return errors;
        }
    });

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const renderPage = () => {
        switch (currentPage) {
            case 1:
                return (
                    <div>
                        <h3>Personal Details</h3>
                        <Form.Group controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.fullName && formik.errors.fullName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.fullName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.email && formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button onClick={nextPage}>Next</Button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2>Address Details</h2>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.address && formik.errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.city && formik.errors.city}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button onClick={prevPage}>Previous</Button>
                        <Button onClick={nextPage}>Next</Button>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2>Payment Details</h2>
                        <Form.Group controlId="paymentMethod">
                            <Form.Label>Payment Method</Form.Label>
                            <Form.Control
                                type="text"
                                name="paymentMethod"
                                value={formik.values.paymentMethod}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.paymentMethod && formik.errors.paymentMethod}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.paymentMethod}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button onClick={prevPage}>Previous</Button>
                        <Button type="submit">Submit</Button>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <Form onSubmit={formik.handleSubmit}>
            {renderPage()}
        </Form>
    );
}

export default StepForm;
