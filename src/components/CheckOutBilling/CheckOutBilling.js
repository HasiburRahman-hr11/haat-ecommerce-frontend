import React from 'react';
import { Grid } from '@mui/material';

const CheckOutBilling = (props) => {
    const {billingInformation , setBillingInformation , billingError} = props;
    return (
        <>
            <h3 className="checkout_billing_title mb-2">Billing Address</h3>
            <Grid
                container
                columnSpacing={{ lg: 3, md: 3 }}
            >
                <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <div className="checkout_input">
                        <label className="auth_label" htmlFor="billingFirstName">First Name*</label>
                        <input
                            type="text"
                            name="billingFirstName"
                            id="billingFirstName"
                            className={billingError.firstName ? 'auth_input isInvalid' : 'auth_input'}
                            required
                            value={billingInformation.firstName}
                            onChange={(e) => setBillingInformation({ ...billingInformation, firstName: e.target.value })}
                        />
                        {billingError.firstName && <p className="auth_error">{billingError.firstName}</p>}
                    </div>
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <div className="checkout_input">
                        <label className="auth_label" htmlFor="billingLastName">Last Name*</label>
                        <input
                            type="text"
                            name="billingLastName"
                            id="billingLastName"
                            className={billingError.lastName ? 'auth_input isInvalid' : 'auth_input'}
                            required
                            value={billingInformation.lastName}
                            onChange={(e) => setBillingInformation({ ...billingInformation, lastName: e.target.value })}
                        />
                        {billingError.lastName && <p className="auth_error">{billingError.lastName}</p>}
                    </div>
                </Grid>
            </Grid>

            <div className="checkout_input">
                <label className="auth_label" htmlFor="billingCompany">Company Name (Optional)</label>
                <input
                    type="text"
                    name="billingCompany"
                    id="billingCompany"
                    className="auth_input"
                    value={billingInformation.company}
                    onChange={(e) => setBillingInformation({ ...billingInformation, company: e.target.value })}
                />
            </div>

            <div className="checkout_input">
                <label className="auth_label" htmlFor="billingCountry">Country*</label>
                <input
                    type="text"
                    name="billingCountry"
                    id="billingCountry"
                    className={billingError.country ? 'auth_input isInvalid' : 'auth_input'}
                    required
                    value={billingInformation.address.country}
                    onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, country: e.target.value } })}
                />
                {billingError.country && <p className="auth_error">{billingError.country}</p>}
            </div>


            <div className="checkout_input">
                <label className="auth_label" htmlFor="billingStreet">Street Address*</label>
                <input
                    type="text"
                    name="billingStreet"
                    id="billingStreet"
                    className={billingError.street ? 'auth_input isInvalid' : 'auth_input'}
                    placeholder="House Number and Street Number"
                    required
                    value={billingInformation.address.street}
                    onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, street: e.target.value } })}
                />
                {billingError.street && <p className="auth_error">{billingError.street}</p>}

            </div>

            <div className="checkout_input">
                <input
                    type="text"
                    name="billingApartment"
                    id="billingApartment"
                    className="auth_input"
                    placeholder="Apartment, Suite, Unite etc..."
                    value={billingInformation.address.apartment}
                    onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, apartment: e.target.value } })}
                />
            </div>

            <Grid
                container
                columnSpacing={{ lg: 3, md: 3 }}
            >
                <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <div className="checkout_input">
                        <label className="auth_label" htmlFor="billingCity">Town / City*</label>
                        <input
                            type="text"
                            name="billingCity"
                            id="billingCity"
                            className={billingError.city ? 'auth_input isInvalid' : 'auth_input'}
                            required
                            value={billingInformation.address.city}
                            onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, city: e.target.value } })}
                        />
                        {billingError.city && <p className="auth_error">{billingError.city}</p>}
                    </div>
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <div className="checkout_input">
                        <label className="auth_label" htmlFor="billingState">State / County*</label>
                        <input
                            type="text"
                            name="billingState"
                            id="billingState"
                            className={billingError.state ? 'auth_input isInvalid' : 'auth_input'}
                            required
                            value={billingInformation.address.state}
                            onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, state: e.target.value } })}
                        />
                        {billingError.state && <p className="auth_error">{billingError.state}</p>}
                    </div>
                </Grid>
            </Grid>


            <Grid
                container
                columnSpacing={{ lg: 3, md: 3 }}
            >
                <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <div className="checkout_input">
                        <label className="auth_label" htmlFor="billingPostcode">Postcode / ZIP*</label>
                        <input
                            type="text"
                            name="billingPostcode"
                            id="billingPostcode"
                            className={billingError.zip ? 'auth_input isInvalid' : 'auth_input'}
                            required
                            value={billingInformation.address.zip}
                            onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, zip: e.target.value } })}
                        />
                        {billingError.zip && <p className="auth_error">{billingError.zip}</p>}
                    </div>
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <div className="checkout_input">
                        <label className="auth_label" htmlFor="billingPhone">Phone*</label>
                        <input
                            type="tel"
                            name="billingPhone"
                            id="billingPhone"
                            className={billingError.phone ? 'auth_input isInvalid' : 'auth_input'}
                            required
                            value={billingInformation.phone}
                            onChange={(e) => setBillingInformation({ ...billingInformation, phone: e.target.value })}
                        />
                        {billingError.phone && <p className="auth_error">{billingError.phone}</p>}
                    </div>
                </Grid>
            </Grid>

            <div className="checkout_input">
                <label className="auth_label" htmlFor="billingEmail">Email Address</label>
                <input
                    type="email"
                    name="billingEmail"
                    id="billingEmail"
                    className={billingError.email ? 'auth_input isInvalid' : 'auth_input'}
                    value={billingInformation.email}
                    onChange={(e) => setBillingInformation({ ...billingInformation, email: e.target.value })}
                />
                {billingError.email && <p className="auth_error">{billingError.email}</p>}
            </div>
        </>
    );
};

export default CheckOutBilling;