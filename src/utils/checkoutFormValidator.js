

const billingErrors = {};
const shippingErrors = {};
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const billingFormValidator = (billingInformation) => {
    if (billingInformation.firstName === '') {
        billingErrors.firstName = 'This field is required'
    } else {
        billingErrors.firstName = ''
    }

    if (billingInformation.lastName === '') {
        billingErrors.lastName = 'This field is required'
    } else {
        billingErrors.lastName = ''
    }
    if (billingInformation.phone === '') {
        billingErrors.phone = 'This field is required'
    } else {
        billingErrors.phone = ''
    }

    if (billingInformation.email && !regex.test(billingInformation.email)) {
        billingErrors.email = 'Invalid email address'
    } else {
        billingErrors.email = ''
    }

    if (billingInformation.address.country === '') {
        billingErrors.country = 'This field is required'
    } else {
        billingErrors.country = ''
    }

    if (billingInformation.address.state === '') {
        billingErrors.state = 'This field is required'
    } else {
        billingErrors.state = ''
    }

    if (billingInformation.address.city === '') {
        billingErrors.city = 'This field is required'
    } else {
        billingErrors.city = ''
    }

    if (billingInformation.address.zip === '') {
        billingErrors.zip = 'This field is required'
    } else {
        billingErrors.zip = ''
    }

    if (billingInformation.address.street === '') {
        billingErrors.street = 'This field is required'
    } else {
        billingErrors.street = ''
    }

    if (!billingErrors.firstName && !billingErrors.lastName && !billingErrors.email && !billingErrors.country && !billingErrors.state && !billingErrors.city && !billingErrors.zip && !billingErrors.street) {
        billingErrors.isValidated = true
    } else {
        billingErrors.isValidated = false
    }

    return billingErrors;
}


export const shippingFormValidator = (shippingInformation) => {
    if (shippingInformation.firstName === '') {
        shippingErrors.firstName = 'This field is required'
    } else {
        shippingErrors.firstName = ''
    }

    if (shippingInformation.lastName === '') {
        shippingErrors.lastName = 'This field is required'
    } else {
        shippingErrors.lastName = ''
    }

    if (shippingInformation.phone === '') {
        shippingErrors.phone = 'This field is required'
    } else {
        shippingErrors.phone = ''
    }

    if (shippingInformation.email && !regex.test(shippingInformation.email)) {
        shippingErrors.email = 'Invalid email address'
    } else {
        shippingErrors.email = ''
    }

    if (shippingInformation.address.country === '') {
        shippingErrors.country = 'This field is required'
    } else {
        shippingErrors.country = ''
    }

    if (shippingInformation.address.state === '') {
        shippingErrors.state = 'This field is required'
    } else {
        shippingErrors.state = ''
    }

    if (shippingInformation.address.city === '') {
        shippingErrors.city = 'This field is required'
    } else {
        shippingErrors.city = ''
    }

    if (shippingInformation.address.zip === '') {
        shippingErrors.zip = 'This field is required'
    } else {
        shippingErrors.zip = ''
    }

    if (shippingInformation.address.street === '') {
        shippingErrors.street = 'This field is required'
    } else {
        shippingErrors.street = ''
    }

    if (!shippingErrors.firstName && !shippingErrors.lastName && !shippingErrors.email && !shippingErrors.country && !shippingErrors.state && !shippingErrors.city && !shippingErrors.zip && !shippingErrors.street) {
        shippingErrors.isValidated = true
    } else {
        shippingErrors.isValidated = false
    }

    return shippingErrors;
}