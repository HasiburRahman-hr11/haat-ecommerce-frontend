import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';

const CheckOutShipping = (props) => {

    const { expandedShipping,
        handleShippingToggle,
        shippingInformation,
        setShippingInformation,
        shippingError
    } = props;
    return (
        <>
            <Accordion
                expanded={expandedShipping === 'shippingAddress'} onChange={handleShippingToggle('shippingAddress')}
                className="checkout_collapsable"
            >
                <AccordionSummary
                    className="checkout_toggle_label w-100"
                    htmlFor="shipToDiff"
                    aria-controls="shippingAddress-content"
                >
                    <input
                        type="checkbox"
                        name="shipToDiff"
                        id="shipToDiff"
                        className="custom_checkbox checkout_toggle_checkbox"
                        checked={expandedShipping}
                        onChange={handleShippingToggle('shippingAddress')}
                    />
                    Ship to different address?
                </AccordionSummary>
                <AccordionDetails className="checkout_shipping_details">
                    <div className={expandedShipping ? 'show' : 'hide'}>
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
                                    <label className="auth_label" htmlFor="shippingFirstName">First Name*</label>
                                    <input
                                        type="text"
                                        name="shippingFirstName"
                                        id="shippingFirstName"
                                        className={shippingError.firstName ? 'auth_input isInvalid' : 'auth_input'}
                                        value={shippingInformation.firstName}
                                        onChange={(e) => setShippingInformation({ ...shippingInformation, firstName: e.target.value })}
                                    />
                                    {shippingError.firstName && <p className="auth_error">{shippingError.firstName}</p>}
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
                                    <label className="auth_label" htmlFor="shippingLastName">Last Name*</label>
                                    <input
                                        type="text"
                                        name="shippingLastName"
                                        id="shippingLastName"
                                        className={shippingError.lastName ? 'auth_input isInvalid' : 'auth_input'}
                                        value={shippingInformation.lastName}
                                        onChange={(e) => setShippingInformation({ ...shippingInformation, lastName: e.target.value })}
                                    />
                                    {shippingError.lastName && <p className="auth_error">{shippingError.lastName}</p>}
                                </div>
                            </Grid>
                        </Grid>

                        <div className="checkout_input">
                            <label className="auth_label" htmlFor="shippingCompany">Company Name (Optional)</label>
                            <input
                                type="text"
                                name="shippingCompany"
                                id="shippingCompany"
                                className="auth_input"
                                value={shippingInformation.company}
                                onChange={(e) => setShippingInformation({ ...shippingInformation, company: e.target.value })}
                            />
                        </div>

                        <div className="checkout_input">
                            <label className="auth_label" htmlFor="shippingCountry">Country*</label>
                            <input
                                type="text"
                                name="shippingCountry"
                                id="shippingCountry"
                                className={shippingError.country ? 'auth_input isInvalid' : 'auth_input'}
                                value={shippingInformation.address.country}
                                onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, country: e.target.value } })}
                            />
                            {shippingError.country && <p className="auth_error">{shippingError.country}</p>}
                        </div>


                        <div className="checkout_input">
                            <label className="auth_label" htmlFor="shippingStreet">Street Address*</label>
                            <input
                                type="text"
                                name="shippingStreet"
                                id="shippingStreet"
                                className={shippingError.street ? 'auth_input isInvalid' : 'auth_input'}
                                placeholder="House Number and Street Number"
                                value={shippingInformation.address.street}
                                onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, street: e.target.value } })}
                            />
                            {shippingError.street && <p className="auth_error">{shippingError.street}</p>}

                        </div>
                        <div className="checkout_input">
                            <input
                                type="text"
                                name="shippingApartment"
                                id="shippingApartment"
                                className="auth_input"
                                placeholder="Apartment, Suite, Unite etc..."
                                value={shippingInformation.address.apartment}
                                onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, apartment: e.target.value } })}
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
                                    <label className="auth_label" htmlFor="shippingCity">Town / City*</label>
                                    <input
                                        type="text"
                                        name="shippingCity"
                                        id="shippingCity"
                                        className={shippingError.city ? 'auth_input isInvalid' : 'auth_input'}
                                        value={shippingInformation.address.city}
                                        onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, city: e.target.value } })}
                                    />
                                    {shippingError.city && <p className="auth_error">{shippingError.city}</p>}
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
                                    <label className="auth_label" htmlFor="shippingState">State / County*</label>
                                    <input
                                        type="text"
                                        name="shippingState"
                                        id="shippingState"
                                        className={shippingError.state ? 'auth_input isInvalid' : 'auth_input'}
                                        value={shippingInformation.address.state}
                                        onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, state: e.target.value } })}
                                    />
                                    {shippingError.state && <p className="auth_error">{shippingError.state}</p>}
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
                                    <label className="auth_label" htmlFor="shippingPostcode">Postcode / ZIP*</label>
                                    <input
                                        type="text"
                                        name="shippingPostcode"
                                        id="shippingPostcode"
                                        className={shippingError.zip ? 'auth_input isInvalid' : 'auth_input'}
                                        value={shippingInformation.address.zip}
                                        onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, zip: e.target.value } })}
                                    />
                                    {shippingError.zip && <p className="auth_error">{shippingError.zip}</p>}
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
                                    <label className="auth_label" htmlFor="shippingPhone">Phone*</label>
                                    <input
                                        type="tel"
                                        name="shippingPhone"
                                        id="shippingPhone"
                                        className={shippingError.phone ? 'auth_input isInvalid' : 'auth_input'}
                                        value={shippingInformation.phone}
                                        onChange={(e) => setShippingInformation({ ...shippingInformation, phone: e.target.value })}
                                    />
                                    {shippingError.phone && <p className="auth_error">{shippingError.phone}</p>}
                                </div>
                            </Grid>
                        </Grid>

                        <div className="checkout_input">
                            <label className="auth_label" htmlFor="shippingEmail">Email Address</label>
                            <input
                                type="email"
                                name="shippingEmail"
                                id="shippingEmail"
                                className={shippingError.email ? 'auth_input isInvalid' : 'auth_input'}
                                value={shippingInformation.email}
                                onChange={(e) => setShippingInformation({ ...shippingInformation, email: e.target.value })}
                            />
                            {shippingError.email && <p className="auth_error">{shippingError.email}</p>}
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default CheckOutShipping;